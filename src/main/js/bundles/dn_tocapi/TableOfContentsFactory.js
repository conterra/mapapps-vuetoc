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
import TableOfContents from "./TableOfContents.vue";
import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import Binding from "apprt-binding/Binding";
import LayerListViewModel from "esri/widgets/LayerList/LayerListViewModel";
import {whenOnce} from "esri/core/watchUtils";

export default class TableOfContentsFactory {

    activate() {
        let envs = this._componentContext.getBundleContext().getCurrentExecutionEnvironment();
        let isMobile = this.isMobile = envs.some((env) => env.name === "Mobile" || env.name === "Android");
        let mapWidgetModel = this._mapWidgetModel;
        let basemapModel = this._basemapModel;
        let tool = this._tool;
        let properties = this._properties;

        const defaultSelectedId = this._basemapModel.selectedId;
        const vm = this.vm = new Vue(TableOfContents);
        vm.i18n = this._i18n.get().ui;
        let bus = new Vue();
        let layerVisibilityService = this._layerVisibilityService;
        if (layerVisibilityService) {
            bus.layerVisibilityService = layerVisibilityService;
        }
        vm.bus = bus;
        vm.config = {
            showBasemaps: properties.showBasemaps,
            showOperationalLayer: properties.showOperationalLayer,
            showLoadingStatus: properties.showLoadingStatus,
            showOperationalLayerHeaderMenu: properties.showOperationalLayerHeaderMenu,
            showLayerMenu: properties.showLayerMenu,
            showResetButton: properties.showResetButton,
            showCloseButton: properties.showCloseButton,
            visibleIconClass: properties.visibleIconClass,
            invisibleIconClass: properties.invisibleIconClass,
            isMobile: isMobile
        };
        vm.operationalItems = {
            items: []
        };

        // listen to view model methods
        vm.$on('close', () => tool.set("active", false));
        vm.$on('reset', () => {
            this._basemapModel.selectedId = defaultSelectedId;
        });

        Binding.for(vm, basemapModel)
            .sync("selectedId")
            .sync("basemaps")
            .enable()
            .syncToLeftNow();

        if (mapWidgetModel.view) {
            this.onViewAvailable(mapWidgetModel.view, vm);
        } else {
            mapWidgetModel.watch("view", (view) => {
                if (view.value) {
                    this.onViewAvailable(view, vm);
                }
            });
        }
    }

    onViewAvailable(view, vm) {
        whenOnce(view.value, "ready", (value) => {
            if (!value) {
                return;
            }
            this._createLayerListViewModel(vm);
            vm.customLayerActions = this._layerActionResolver.getLayerActions();
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
            item.initialOpacity = item.layer.opacity;
            item.open = this._properties.expandInitially;
        };

        if (this.binding) {
            this.binding.unbind();
        }
        this.binding = Binding.for(vm, layerListViewModel)
            .syncAll("operationalItems")
            .enable()
            .syncToLeftNow();
    }

    deactivate() {
        this.watchHandles.forEach(handle => {
            handle.remove();
        });
        this.watchLayersHandle.remove();
    }
}
