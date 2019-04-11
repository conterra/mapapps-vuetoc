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
import Layer from "esri/layers/Layer";
import LayerViewModel from "./LayerViewModel";
import Binding from "apprt-binding/Binding"

const propertyKeys = ["id", "title", "extent", "opacity", "copyright", "description", "visible"];

export default class LayerViewModelFactory {

    static create(layer) {
        if (!(layer instanceof Layer)) {
            throw Error("LayerViewModelFactory: First parameter must be a layer!");
        }
        const model = LayerViewModel();
        propertyKeys.forEach(key => {
            model[key] = layer[key];
        })
        model.dispose = watchPropertyChanges(layer, model);
        return model;
    }
}

const watchPropertyChanges = (layer, model) => {
    let binding = Binding.for(model, layer);
    binding.syncAll(...propertyKeys)
    binding.enable();
    return () => binding.unbind();
}
