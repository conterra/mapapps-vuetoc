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
        this._initComponent({
            mapWidgetModel: this._mapWidgetModel,
            basemapModel: this._basemapModel,
            tool: this._tool,
            properties: this._properties
        });
    }

    _initComponent({basemapModel, mapWidgetModel, tool, properties}) {
        const vm = this.mapContentComponent = new Vue(MapContentWidget);
        vm.i18n = this._i18n.get().ui;
        vm.basemaps = basemapModel.basemaps;
        vm.selectedId = basemapModel.selectedId;
        let map = mapWidgetModel.get("map");
        let layers = map.get("layers");
        this.waitForLayers(layers).then(function () {
            let switchArray = this.createSwitchesArray(layers);
            let menuArray = this.createMenuArray(switchArray.length);
            this.createLegendArray(layers, vm);

            // save default values to allow reset of map content
            this.defaultSwitchArray = switchArray.slice(0);
            this.defaultSelectedId = basemapModel.selectedId;

            vm.switchArray = switchArray;
            vm.menuArray = menuArray;
            vm.showBasemaps = properties.showBasemaps;
            vm.showOperationalLayer = properties.showOperationalLayer;
            vm.showLegend = properties.showLegend;

            // listen to view model methods
            vm.$on('close', () => tool.set("active", false));
            vm.$on('reset', () => {
                vm.switchArray = this.defaultSwitchArray;
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

            let that = this;
            layers.forEach(function (layer) {
                if (layer.sublayers && layer.sublayers.items) {
                    layer.sublayers.forEach(function (sublayer) {
                        sublayer.watch("visible", (event) => {
                            vm.switchArray = that.createSwitchesArray(layers)
                        });
                    });
                } else if (layer.layers && layer.layers.items) {
                    layer.layers.forEach(function (sublayer) {
                        sublayer.watch("visible", (event) => {
                            vm.switchArray = that.createSwitchesArray(layers)
                        });
                    });
                }
                layer.watch("visible", (event) => {
                    vm.switchArray = that.createSwitchesArray(layers)
                });
                layer.menu = false;
            });
            vm.layers = layers.items;

            Binding
                .create()
                .bindTo(vm, basemapModel)
                .syncAll("selectedId", "switchArray", "legendArray", "menuArray")
                .enable();
        }.bind(this));
    }

    waitForLayers(layers) {
        let promises = [];
        layers.forEach(function (layer) {
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

    createSwitchesArray(layers) {
        let switchCount = 0;
        let switches = [];
        layers.forEach(function (layer) {
            switches[switchCount] = layer.visible;
            layer.switchCount = switchCount;
            switchCount++;
            if (layer.sublayers && layer.sublayers.items) {
                layer.sublayers.forEach(function (sublayer) {
                    switches[switchCount] = sublayer.visible;
                    sublayer.switchCount = switchCount;
                    switchCount++;
                });
            } else if (layer.layers && layer.layers.items) {
                layer.layers.forEach(function (sublayer) {
                    switches[switchCount] = sublayer.visible;
                    sublayer.switchCount = switchCount;
                    switchCount++;
                });
            }
        });
        return switches;
    }

    createMenuArray(count) {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push({visible: false});
        }
        return result;
    }

    createLegendArray(layers, vm) {
        layers.forEach(function (layer) {
            let legendUrl = layer.url + "/legend?f=pjson&dynamicLayers=[1]";
            ct_when(apprt_request(legendUrl, {
                handleAs: "json"
            }), function (results) {
                results.layers.forEach((results) => {
                    vm.legendArray.push({
                        url: layer.url + "/" + results.layerId,
                        title: results.layerName,
                        imageUrl: results.legend[0].url
                    })
                });
            }, function (e) {
            }, this);
        });
    }
}

module.exports = MapContentWidgetFactory;