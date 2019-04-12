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
import Binding from "apprt-binding/Binding"
import Bindable from "apprt-vue/mixins/Bindable";
import Vue from "apprt-vue/Vue";

const propertyKeys = ["id", "title", "loaded", "extent", "opacity", "copyright", "description", "visible"];

export default class LayerViewModelFactory {

    static fromLayer({layer, parent} = {}) {
        const model = initModel(parent);
        model.children = parseChildren(layer, model);
        model.dispose = watchPropertyChanges(layer, model);
        return model;
    }
}

const initModel = (parent) => {
    const model = new Vue(LayerViewModel);
    if (parent) model.parent = parent;
    return model;
}

const parseChildren = (layer, model) => {
    const sublayers = layer.layers || layer.sublayers;
    if(!sublayers) return [];
    return sublayers.map(sublayer => {
        return LayerViewModelFactory.fromLayer({
            layer: sublayer,
            parent: model
        })
    }).toArray();
}

const watchPropertyChanges = (layer, model) => {
    let binding = Binding.for(model, layer);
    binding.syncAll(...propertyKeys)
    binding.syncToLeftNow();
    binding.enable();
    return () => binding.unbind();
}

const LayerViewModel = {
    mixins: [Bindable],
    props:{
        id: undefined,
        title: undefined,
        open: undefined,
        updating: undefined,
        loaded: undefined,
        parent: undefined,
        children: undefined,
        extent: undefined,
        opacity: undefined,
        copyright: undefined,
        description: undefined,
        visible: undefined,
        visibleInContext: undefined,
        visibleInContextCause: undefined
    }
}