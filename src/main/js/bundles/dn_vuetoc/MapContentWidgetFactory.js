/*
 * Copyright (C) 2017 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import MapContentWidget from "./MapContentWidget.vue";
import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import Binding from "apprt-binding/Binding";
import Promise from "apprt-core/Promise";
import apprt_request from "apprt-request";
import ct_when from "ct/_when";

class MapContentWidgetFactory {

    activate() {
        let envs = this._componentContext.getBundleContext().getCurrentExecutionEnvironment();
        let isMobile = this.isMobile = envs.some((env) => {
            return env.name === "Mobile"
        });
        this._initComponent({
            mapWidgetModel: this._mapWidgetModel,
            basemapModel: this._basemapModel,
            tool: this._tool,
            properties: this._properties,
            isMobile: isMobile
        });
    }

    _initComponent({basemapModel, mapWidgetModel, tool, properties, isMobile}) {
        const vm = this.mapContentComponent = new Vue(MapContentWidget);
        vm.i18n = this._i18n.get().ui;
        vm.basemaps = basemapModel.basemaps;
        vm.selectedId = basemapModel.selectedId;
        let map = mapWidgetModel.get("map");
        let layers = map.get("layers");
        this.waitForLayers(layers).then(() => {
            let layerArray = MapContentWidgetFactory.createLayerArray(layers);
            this.createLegendArray(layers, vm);

            // save default values to allow reset of map content
            this.defaultLayerArray = JSON.parse(JSON.stringify(layerArray));
            this.defaultSelectedId = basemapModel.selectedId;

            vm.layerArray = layerArray;
            vm.showBasemaps = properties.showBasemaps;
            vm.showOperationalLayer = properties.showOperationalLayer;
            vm.showLegend = properties.showLegend;
            vm.isMobile = isMobile;

            // listen to view model methods
            vm.$on('close', () => tool.set("active", false));
            vm.$on('reset', () => {
                vm.layerArray = this.defaultLayerArray;
                vm.selectedId = this.defaultSelectedId;
            });
            vm.$on('zoomToExtent', (layer) => {
                let extent = layer.fullExtent || layer.layer.fullExtent;
                let view = mapWidgetModel.get('view');
                view.goTo({target: extent}, {
                    "animate": true,
                    "duration": 1000,
                    "easing": "ease-in-out"
                });
            });

            let flattenLayers = layers.flatten((item) => {
                return item.layers || item.sublayers;
            });
            flattenLayers.forEach((layer) => {
                layer.watch("visible", () => {
                    vm.layerArray = MapContentWidgetFactory.createLayerArray(layers)
                });
                layer.menu = false;
            });
            vm.layers = layers.items;

            Binding
                .create()
                .bindTo(vm, basemapModel)
                .syncAll("selectedId", "layerArray", "legendArray")
                .enable();
        }.bind(this)
    )
        ;
    }

    waitForLayers(layers) {
        let promises = [];
        layers.forEach((layer) => {
            promises.push(new Promise(resolve => {
                layer.watch("loaded", () => {
                    resolve(this);
                });
            }));
        });
        return Promise.all(promises);
    }

    createInstance() {
        return VueDijit(this.mapContentComponent);
    }

    static createLayerArray(layers) {
        let flattenLayers = layers.flatten((item) => {
            return item.layers || item.sublayers;
        });
        let layerArray = flattenLayers.map((item) => {
            return {
                visible: item.visible,
                menuVisibility: false
            };
        });
        flattenLayers.forEach((layer, i) => {
            layer.layerCount = i;
        });
        return layerArray.items;
    }

    createLegendArray(layers, vm) {
        layers.forEach((layer) => {
            let legendUrl = layer.url + "/legend?f=pjson&dynamicLayers=[1]";
            ct_when(apprt_request(legendUrl, {
                handleAs: "json"
            }), (results) => {
                results.layers.forEach((results) => {
                    vm.legendArray.push({
                        url: layer.url + "/" + results.layerId,
                        title: results.layerName,
                        imageUrl: results.legend[0].url
                    })
                });
            }, (e) => {
            }, this);
        });
    }
}

module.exports = MapContentWidgetFactory;