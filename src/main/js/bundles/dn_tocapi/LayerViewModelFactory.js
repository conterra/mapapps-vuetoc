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
import LayerViewModel from "./LayerViewModel";
import {whenTrueOnce} from "esri/core/watchUtils";
import Vue from "apprt-vue/Vue";

const propertyKeys = [
    "id",
    "title",
    "loaded",
    "minScale",
    "maxScale",
    "opacity",
    "copyright",
    "description",
    "visible"
];

export default class LayerViewModelFactory {

    static fromLayer({layer, parent} = {}) {
        const model = initModel(layer, parent);
        const propWatcher = watchPropertyChanges(layer, model);
        model.children = parseChildren(layer, model);
        const childWatcher = watchChildChanges(layer, model);
        model.setForAll = (key, value) => setForAll(key, value, model);
        model.dispose = () => {
            propWatcher.unbind();
            childWatcher.remove();
            model.children.forEach(child => child.dispose());
        };
        return model;
    }
}

const initModel = (layer, parent) => {
    const model = new Vue(LayerViewModel);
    if (parent) model.parent = parent;
    model.type = layer.type;
    model.initialOpacity = layer.opacity;
    model.initialVisible = layer.visible;
    whenTrueOnce(layer, "loaded", () => {
        model.initialOpacity = model.initialOpacity === undefined ? layer.opacity : model.initialOpacity;
        model.initialVisible = model.initialVisible === undefined ? layer.visible : model.initialVisible;
    });
    return model;
};

const parseChildren = (layer, model) => {
    const sublayers = layer.layers || layer.sublayers;
    if (!sublayers) return [];
    return sublayers
        .map(sublayer => LayerViewModelFactory.fromLayer({
            layer: sublayer,
            parent: model
        }))
        .reverse()
        .toArray();
};

const watchPropertyChanges = (layer, model) => {
    let binding = Binding.for(model, layer);
    binding.syncAll(...propertyKeys)
    binding.syncToLeft("fullExtent", "fullExtent", fullExtent => fullExtent && fullExtent.toJSON());
    binding.syncToLeftNow();
    binding.enable();
    return binding;
};

const watchChildChanges = (layer, model) => {
    const children = layer.layers || layer.sublayers;
    if (!children) {
        whenTrueOnce(layer, "loaded", () => {
            model.children = parseChildren(layer, model);
        });
        return {remove: () => {}};
    }
    return children.on("after-add", ({item}) => {
        const idx = children.length - 1 - children.indexOf(item);
        model.children.splice(idx, 0, LayerViewModelFactory.fromLayer({layer: item}));
    });
};

const setForAll = (key, value, model) => {
    model[key] = value;
    const children = model.children;
    if (children && children.length) {
        for (let i = 0; i < children.length; i++) {
            setForAll(key, value, children[i]);
        }
    }
};
