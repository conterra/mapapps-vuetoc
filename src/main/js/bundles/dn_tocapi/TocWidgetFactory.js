/*
 * Copyright (C) 2019 con terra GmbH (info@conterra.de)
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

export default class TableOfContentsFactory {

    activate() {
        let envs = this._componentContext.getBundleContext().getCurrentExecutionEnvironment();
        this._isMobile = envs.some((env) => env.name === "Mobile" || env.name === "Android");
        this.i18n = this._i18n.get().ui;
    }

    createInstance() {
        const vm = this._createVueModel();
        this._syncModel(vm);
        this._setModelProps(vm);
        this._registerModelEventWatchers(vm);
        return VueDijit(vm);
    }

    _createVueModel() {
        return new Vue(TableOfContents);
    }

    _syncModel(vm) {
        vm.operationalItems = this._tocModelFactory.createInstance();
        this._tocModelSync.sync(vm.operationalItems);
        Binding.for(vm, this._basemapModel)
            .sync("selectedId")
            .sync("basemaps")
            .enable()
            .syncToLeftNow();
    }

    _setModelProps(vm) {
        let bus = new Vue();
        vm.bus = bus;
        vm.i18n = this.i18n;
        const resolver = this._actionResolver;
        resolver.setEventBus(bus);
        resolver.on("layer-action-added", () => vm.actionComponents = resolver.getLayerActions());
        resolver.on("layer-action-removed", () => vm.actionComponents = resolver.getLayerActions());
        vm.actionComponents = resolver.getLayerActions();

        let properties = this._properties;
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
            isMobile: this._isMobile
        };
        if (properties.expandInitially) {
            setValueRecursive(vm.operationalItems.collection, "open", true);
        }
    }

    _registerModelEventWatchers(vm) {
        let tool = this._tool;
        const defaultSelectedId = this._basemapModel.selectedId;
        vm.$on('close', () => tool.set("active", false));
        vm.$on('reset', () => {
            vm.bus.$emit("reset");
            this._basemapModel.selectedId = defaultSelectedId;
        });
    }

    deactivate() {
        this.watchHandles.forEach(handle => {
            handle.remove();
        });
        this.watchLayersHandle.remove();
    }
}

const setValueRecursive = (layers, key, value) => {
    for (let i = 0; i < layers.length; i++) {
        layers[i][key] = value;
        layers[i].children && setValueRecursive(key, value, layers[i].children);
    }
};
