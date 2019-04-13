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

    static fromLayerCollection(layerCollection, initialModel = {}) {
        const model = initialModel || {};
        model.collection = layerCollection
            .map(layer => LayerViewModelFactory.fromLayer({layer}))
            .reverse()
            .toArray();
        model.setForAll = (key, value) => {
            model.collection.forEach(modelItem => modelItem.setForAll(key, value));
        }
        model.remove = item => {
            const idx = model.collection.findIndex(modelItem => modelItem.id === item.id);
            layerCollection.removeAt(layerCollection.length - 1 - idx);
        }
        model.reorder = (item, newIdx) => {
            const idx = model.collection.findIndex(model => model.id === item.id);
            const length = layerCollection.length;
            const layer = layerCollection.getItemAt(length - 1 - idx);
            layerCollection.reorder(layer, length - 1 - newIdx);
        }
        model.dispose = watchCollectionChanges(layerCollection, model.collection);
        return model;
    }
}

const watchCollectionChanges = (layerCollection, modelCollection) => {
    const watchHandle = layerCollection.on("change", ({added, moved, removed}) => {
        added.forEach((layer, idx) => {
            const length = layerCollection.length - 1;
            const newIdx = length - layerCollection.indexOf(layer) - (added.length - 1 - idx);
            modelCollection.splice(newIdx, 0, LayerViewModelFactory.fromLayer({layer}));
        });
        removed.forEach(layer => {
            const idx = modelCollection.findIndex(model => model.id === layer.id);
            modelCollection[idx].dispose();
            modelCollection.splice(idx, 1);
        });
        moved.forEach(layer => {
            const length = layerCollection.length - 1;
            const newIdx = length - layerCollection.indexOf(layer);
            const oldIdx = modelCollection.findIndex(model => model.id === layer.id);
            modelCollection.splice(newIdx, 0, modelCollection.splice(oldIdx, 1)[0]);
        });
    });
    return () => watchHandle.remove();
}
