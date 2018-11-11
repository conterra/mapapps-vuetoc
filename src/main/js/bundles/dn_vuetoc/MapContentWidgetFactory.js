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
import LayerListViewModel from "esri/widgets/LayerList/LayerListViewModel";

export default class MapContentWidgetFactory {

    activate() {
        let envs = this._componentContext.getBundleContext().getCurrentExecutionEnvironment();
        let isMobile = this.isMobile = envs.some((env) => {
            return env.name === "Mobile"
        });
        let mapWidgetModel = this._mapWidgetModel;
        let basemapModel = this._basemapModel;
        let tool = this._tool;
        let properties = this._properties;


        const defaultSelectedId = this._basemapModel.selectedId;
        const vm = this.vm = new Vue(MapContentWidget);
        vm.i18n = this._i18n.get().ui;
        vm.basemaps = basemapModel.basemaps;
        vm.selectedId = basemapModel.selectedId;
        vm.showBasemaps = properties.showBasemaps;
        vm.showOperationalLayer = properties.showOperationalLayer;
        vm.showLegend = properties.showLegend;
        vm.isMobile = isMobile;

        // listen to view model methods
        vm.$on('close', () => tool.set("active", false));
        vm.$on('reset', () => {
            this._resetLayerVisibility();
            vm.selectedId = defaultSelectedId;
        });
        vm.$on('zoomToExtent', (item) => {
            let layer = item.layer;
            let extent = layer.fullExtent || layer.layer.fullExtent;
            let view = mapWidgetModel.get('view');
            view.goTo({target: extent}, {
                "animate": true,
                "duration": 1000,
                "easing": "ease-in-out"
            });
        });
        vm.$on('enableAllLayers', (value) => {
            this._enableAllLayers(value);
        });

        Binding
            .create()
            .bindTo(vm, basemapModel)
            .syncAll("selectedId", "operationalItems", "opacityArray", "legendArray")
            .enable();

        mapWidgetModel.watch("view", () => {
            this._createLayerListViewModel(vm);
            this._waitForLayers(vm);
        });

        let map = mapWidgetModel.get("map");
        map.allLayers.on("change", (event) => {
            this._createLayerListViewModel(vm);
            this._waitForLayers(vm);
        });
    }

    createInstance() {
        return VueDijit(this.vm);
    }

    _createLayerListViewModel(vm) {
        let view = this._mapWidgetModel.get("view");
        let layerListViewModel = new LayerListViewModel({
            view: view
        });
        layerListViewModel.listItemCreatedFunction = (event) => {
            let item = event.item;
            item.initialVisible = !!item.visible;
            item.menuVisibility = false;
        };
        if (layerListViewModel.state === "ready") {
            vm.operationalItems = layerListViewModel.operationalItems;
            vm.rerender();
        } else {
            let watch = layerListViewModel.watch("state", (state) => {
                watch.remove();
                vm.operationalItems = layerListViewModel.operationalItems;
                vm.rerender();
            });
        }
    }

    _createOpacityArray(vm) {
        let opacityArray = [];
        let operationalItems = vm.operationalItems;
        let items = operationalItems.flatten((item) => {
            return item.children;
        });
        items.forEach((item) => {
            item.set("visible", item.initialVisible);
            opacityArray.push({
                uid: item.uid,
                opacity: item.layer.opacity || 1
            });
        });
        vm.opacityArray = opacityArray;
    }

    _createLegendArray(vm) {
        let map = this._mapWidgetModel.get("map");
        let layers = map.get("layers");
        layers.forEach((layer) => {
            let legendUrl = layer.url + "/legend?f=pjson&dynamicLayers=[1]";
            apprt_request(legendUrl, {
                handleAs: "json"
            }).then((results) => {
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
                // push nothing
            });
        });
    }

    _waitForLayers(vm) {
        let map = this._mapWidgetModel.get("map");
        let layers = map.get("layers");
        layers.forEach((layer) => {
            if (layer.loaded === false) {
                layer.when((layer) => {
                    this._createOpacityArray(vm);
                    this._createLegendArray(vm);
                }, (error) => {
                    this._createOpacityArray(vm);
                    this._createLegendArray(vm);
                });
            }
        });
    }

    _resetLayerVisibility() {
        let operationalItems = this.vm.operationalItems;
        let items = operationalItems.flatten((item) => {
            return item.children;
        });
        items.forEach((item) => {
            item.set("visible", item.initialVisible);
        });
        this.vm.rerender();
    }

    _enableAllLayers(value) {
        let operationalItems = this.vm.operationalItems;
        let items = operationalItems.flatten((item) => {
            return item.children;
        });
        items.forEach((item) => {
            item.set("visible", value);
        });
        this.vm.rerender();
    }
}
