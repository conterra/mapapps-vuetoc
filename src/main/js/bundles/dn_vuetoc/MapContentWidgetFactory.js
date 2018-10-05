/*
 * Copyright (C) 2018 con terra GmbH (info@conterra.de)
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
import apprt_request from "apprt-request";
import ct_when from "ct/_when";

export default class MapContentWidgetFactory {

    activate() {
        let envs = this._componentContext.getBundleContext().getCurrentExecutionEnvironment();
        let isMobile = this.isMobile = envs.some((env) => {
            return env.name === "Mobile"
        });
        this.saveDefaultValues = true;
        this._layerWatchers = [];
        this._initComponent({
            mapWidgetModel: this._mapWidgetModel,
            basemapModel: this._basemapModel,
            tool: this._tool,
            properties: this._properties,
            isMobile: isMobile
        });
    }

    _initComponent({basemapModel, mapWidgetModel, tool, properties, isMobile}) {
        const vm = this.vm = new Vue(MapContentWidget);
        vm.i18n = this._i18n.get().ui;
        vm.basemaps = basemapModel.basemaps;
        vm.selectedId = basemapModel.selectedId;
        let map = mapWidgetModel.get("map");

        vm.showBasemaps = properties.showBasemaps;
        vm.showOperationalLayer = properties.showOperationalLayer;
        vm.showLegend = properties.showLegend;
        vm.isMobile = isMobile;

        // listen to view model methods
        vm.$on('close', () => tool.set("active", false));
        vm.$on('reset', () => {
            vm.layerArray = JSON.parse(JSON.stringify(this.defaultLayerArray));
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

        Binding
            .create()
            .bindTo(vm, basemapModel)
            .syncAll("selectedId", "layerArray", "legendArray")
            .enable();

        this.initialize();
        map.allLayers.on("change", (event) => {
            this.initialize();
        });
    }

    initialize() {
        this.waitForLayers();
        let vm = this.vm;
        let map = this._mapWidgetModel.get("map");
        let layers = map.get("layers");

        let layerArray = this.createLayerArray(layers);
        this.createLegendArray(layers, vm);

        if (this.saveDefaultValues) {
            // save default values to allow reset of map content
            this.defaultLayerArray = JSON.parse(JSON.stringify(layerArray));
            this.defaultSelectedId = this._basemapModel.selectedId;
            this.saveDefaultValues = false;
        }

        vm.layers = layers.toArray();
        vm.layerArray = layerArray;
    }

    waitForLayers() {
        let map = this._mapWidgetModel.get("map");
        let layers = map.get("layers");
        layers.forEach((layer) => {
            if (layer.loaded === false) {
                layer.when((layer) => {
                    this.initialize();
                }, (error) => {
                    this.initialize();
                });
            }
        });
    }

    createInstance() {
        return VueDijit(this.vm);
    }

    createLayerArray(layers) {
        let flattenLayers = layers.flatten((item) => {
            return item.layers || item.sublayers;
        });
        let layerArray = flattenLayers.map((item) => {
            return {
                visible: item.visible === undefined ? false : item.visible,
                opacity: item.opacity ? item.opacity : 1,
                menuVisibility: false
            };
        });
        this._layerWatchers.forEach((watcher) => {
            watcher.remove();
        });
        this._layerWatchers = [];
        flattenLayers.forEach((layer, i) => {
            this._layerWatchers.push(layer.watch("visible", () => {
                this.vm.layers = layers.toArray();
                this.vm.layerArray = this.createLayerArray(layers);
            }));
            this._layerWatchers.push(layer.watch("opacity", () => {
                this.vm.layers = layers.toArray();
                //this.vm.layerArray = this.createLayerArray(layers);
            }));
            layer.layerCount = i;
        });
        return layerArray.toArray();
    }

    createLegendArray(layers, vm) {
        layers.forEach((layer) => {
            let legendUrl = layer.url + "/legend?f=pjson&dynamicLayers=[1]";
            ct_when(apprt_request(legendUrl, {
                handleAs: "json"
            }), (results) => {
                if (results && results.layers) {
                    results.layers.forEach((results) => {
                        vm.legendArray.push({
                            url: layer.url + "/" + results.layerId,
                            title: results.layerName,
                            imageUrl: results.legend && results.legend[0].url
                        })
                    });
                }
            }, (e) => {
            }, this);
        });
    }
}
