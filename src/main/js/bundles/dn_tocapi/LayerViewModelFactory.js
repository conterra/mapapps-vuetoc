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
import {whenTrueOnce} from "esri/core/watchUtils";
import Vue from "apprt-vue/Vue";

const propertyKeys = ["id", "title", "loaded", "extent", "minScale", "maxScale", "opacity", "copyright", "description", "visible"];

export default class LayerViewModelFactory {

    static fromLayer({layer, parent} = {}) {
        const model = initModel(parent);
        const propWatcher = watchPropertyChanges(layer, model);
        model.children = parseChildren(layer, model);
        const childWatcher = watchChildChanges(layer, model);
        model.dispose = () => {
            propWatcher.unbind();
            childWatcher.remove();
        }
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
    return sublayers
        .map(sublayer => {
            return LayerViewModelFactory.fromLayer({
                layer: sublayer,
                parent: model
            })
        })
        .reverse()
        .toArray();
}

const watchPropertyChanges = (layer, model) => {
    let binding = Binding.for(model, layer);
    binding.syncAll(...propertyKeys)
    binding.syncToLeftNow();
    binding.enable();
    return binding;
}

const watchChildChanges = (layer, model) => {
    const children = layer.layers || layer.sublayers;
    if(!children) {
        whenTrueOnce(layer, "loaded", () => {
            model.children = parseChildren(layer, model);
        })
        return () => {};
    };
    return children.on("after-add", ({item}) => {
        const idx = children.length - 1 - children.indexOf(item);
        model.children.splice(idx, 0, LayerViewModelFactory.fromLayer({layer: item}));
    });
}

const LayerViewModel = {
    mixins: [Bindable],
    props:{
        id: {
            type: String
        },
        title: {
            type: String
        },
        open: {
            type: Boolean,
            default: false
        },
        updating: {
            type: Boolean,
            default: false
        },
        loaded: {
            type: Boolean,
            default: false
        },
        parent: {
            type: Object
        },
        children: {
            type: Object
        },
        extent: {
            type: Object
        },
        minScale: {
            type: Boolean,
            default: 0
        },
        maxScale: {
            type: Number,
            default: 0
        },
        opacity: {
            type: Number,
            default: 1
        },
        copyright: {
            type: String
        },
        description: {
            type: String
        },
        visible: {
            type: Boolean,
            default: true
        },
        visibleInContext: {
            type: Boolean,
            default: true
        },
        visibleInContextCause: {
            type: String
        }
    }
}