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
        let isMobile = this.isMobile = envs.some((env) => env.name === "Mobile" || env.name === "Android");
        let mapWidgetModel = this._mapWidgetModel;
        let basemapModel = this._basemapModel;
        let tool = this._tool;
        let properties = this._properties;
        this._layerWatchers = [];

        const defaultSelectedId = this._basemapModel.selectedId;
        const vm = this.vm = new Vue(MapContentWidget);
        vm.i18n = this._i18n.get().ui;
        vm.showBasemaps = properties.showBasemaps;
        vm.showOperationalLayer = properties.showOperationalLayer;
        vm.showLegend = properties.showLegend;
        vm.showLoadingStatus = properties.showLoadingStatus;
        vm.showOperationalLayerHeaderMenu = properties.showOperationalLayerHeaderMenu;
        vm.showLayerMenu = properties.showLayerMenu;
        vm.showResetButton = properties.showResetButton;
        vm.showCloseButton = properties.showCloseButton;
        vm.visibleIconClass = properties.visibleIconClass;
        vm.invisibleIconClass = properties.invisibleIconClass;
        vm.isMobile = isMobile;

        // listen to view model methods
        vm.$on('close', () => tool.set("active", false));
        vm.$on('reset', () => {
            this._resetLayerVisibility();
            vm.selectedId = defaultSelectedId;
        });
        vm.$on('enableAllLayer', (value) => {
            this._enableAllLayer(value);
        });
        vm.$on('openAllLayer', (value) => {
            this._openAllLayer(value);
        });

        Binding.for(vm, basemapModel)
            .sync("selectedId")
            .sync("basemaps")
            .enable()
            .syncToLeftNow();

        if (mapWidgetModel.view) {
            this._createLayerListViewModel(vm);
            this._waitForLayers(vm);
            this._watchForStationary(mapWidgetModel.view, vm);
            vm.customLayerActions = this._layerActionResolver.getLayerActions();
        } else {
            mapWidgetModel.watch("view", ({ value }) => {
                this._createLayerListViewModel(vm);
                this._waitForLayers(vm);
                this._watchForStationary(value, vm);
                vm.customLayerActions = this._layerActionResolver.getLayerActions();
            });
        }

        let map = mapWidgetModel.get("map");
        map.allLayers.on("change", (event) => {
            this._createLayerListViewModel(vm);
            this._waitForLayers(vm);
        });

        // listen to custom action registrations
        this.watchHandles = [];
        this.watchHandles.push(this._layerActionResolver.on("layer-action-added", () => {
            vm.customLayerActions = this._layerActionResolver.getLayerActions();
        }));
        this.watchHandles.push(this._layerActionResolver.on("layer-action-removed", () => {
            vm.customLayerActions = this._layerActionResolver.getLayerActions();
        }));
    }

    createInstance() {
        return VueDijit(this.vm);
    }

    _createLayerListViewModel(vm) {
        let view = this._mapWidgetModel.get("view");
        let layerListViewModel = new LayerListViewModel({
            view: view
        });
        this._layerWatchers.forEach((watcher) => {
            watcher.remove();
        });
        this._layerWatchers = [];
        layerListViewModel.listItemCreatedFunction = (event) => {
            let item = event.item;
            item.initialVisible = !!item.visible;
            if (event.item.layer.open !== undefined) {
                item.open = event.item.layer.open;
            } else {
                item.open = false;
            }
            item.menuVisibility = false;
            this._layerWatchers.push(item.watch("updating", () => {
                vm.rerenderProgressBars();
            }));
            this._layerWatchers.push(item.watch("visible", () => {
                vm.rerenderListActions();
            }));
        };
        if (layerListViewModel.state === "ready") {
            vm.rerenderListActions();
        } else {
            let watch = layerListViewModel.watch("state", (state) => {
                watch.remove();
                vm.rerenderListActions();
            });
        }

        if (this.binding) {
            this.binding.unbind();
        }
        this.binding = Binding.for(vm, layerListViewModel)
            .syncAll("operationalItems")
            .enable()
            .syncToLeftNow();
    }

    _createLegendArray(vm) {
        let map = this._mapWidgetModel.get("map");
        let layers = map.get("layers");
        let flattenLayers = layers.flatten((item) => item.layers || item.sublayers);
        flattenLayers.forEach((layer) => {
            if (layer.url) {
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
            }
        });
    }

    _createMenuArray(vm) {
        let menuArray = [];
        let operationalItems = vm.operationalItems;
        let items = operationalItems.flatten((item) => item.children);
        items.forEach((item) => {
            menuArray.push({
                uid: item.uid,
                visible: false
            });
        });
        vm.menuArray = menuArray;
    }

    _waitForLayers(vm) {
        let map = this._mapWidgetModel.get("map");
        let layers = map.get("layers");
        let promises = [];
        layers.forEach((layer) => {
            let promise = new Promise((resolve, reject) => {
                if (layer.loaded === false) {
                    layer.when((layer) => {
                        resolve();
                    }, (error) => {
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
            promises.push(promise);
        });
        Promise.all(promises).then(() => {
            if (this._properties.showLegend) {
                this._createLegendArray(vm);
            }
            this._createMenuArray(vm);
            vm.rerenderListActions();
        });
    }

    _watchForStationary(view, vm) {
        if (this._stationaryWatch) {
            this._stationaryWatch.remove();
        }
        this._stationaryWatch = view.watch("stationary", (response) => {
            if (response) {
                vm.rerenderProgressBars();
            }
        });
    }

    _resetLayerVisibility() {
        let operationalItems = this.vm.operationalItems;
        let items = operationalItems.flatten((item) => item.children);
        items.forEach((item) => {
            item.set("visible", item.initialVisible);
        });
        this.vm.rerenderListActions();
    }

    _enableAllLayer(value) {
        let operationalItems = this.vm.operationalItems;
        let items = operationalItems.flatten((item) => item.children);
        items.forEach((item) => {
            item.set("visible", value);
        });
        this.vm.rerenderListActions();
    }

    _openAllLayer(value) {
        let operationalItems = this.vm.operationalItems;
        let items = operationalItems.flatten((item) => item.children);
        items.forEach((item) => {
            item.set("open", value);
        });
        this.vm.rerenderListActions();
    }

    deactivate() {
        this.watchHandles.forEach(handle => {
            handle.remove();
        })
    }
}
