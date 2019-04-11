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
import LayerViewModelFactory from "./LayerViewModelFactory";

export default class LayerViewCollectionModelFactory {

    static create(layerCollection) {
        if (!layerCollection) {
            throw Error("LayerViewCollectionModelFactory: First parameter must be collection of layers!");
        }
        const model = {
            collection: layerCollection.map(layer => LayerViewModelFactory.create(layer)).toArray()
        };
        model.dispose = watchCollectionChanges(layerCollection, model.collection);
        return model;
    }
}

const watchCollectionChanges = (layerCollection, model) => {
    const watchHandle = layerCollection.on("change", ({added, moved, removed}) => {
        added.forEach(layer => {
            const idx = layerCollection.indexOf(layer);
            model.splice(idx, 0, LayerViewModelFactory.create(layer));
        });
        removed.forEach(layer => {
            const idx = model.findIndex(model => model.id === layer.id);
            model[idx].dispose();
            model.splice(idx, 1);
        });
        moved.forEach(layer => {
            const newIdx = layerCollection.indexOf(layer);
            const oldIdx = model.findIndex(model => model.id === layer.id);
            model.splice(newIdx, 0, model.splice(oldIdx, 1)[0]);
        });
    });
    return () => watchHandle.remove();
}
