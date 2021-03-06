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
import LayerViewCollectionModelFactory from "./LayerViewCollectionModelFactory";
import Binding from "apprt-binding/Binding"

const handles = Symbol("handles");

export default class TocModelSynchronizer {

    activate() {
        this[handles] = [];
    }

    createInstance() {
        const layers = this._map.layers;
        const model = LayerViewCollectionModelFactory.fromLayerCollection(layers);
        this._registerViewWatcher(model);
        return model;
    }

    _registerViewWatcher(model) {
        if (!model) return;
        const mapWidgetModel = this._mapWidgetModel;
        if (mapWidgetModel.view) {
            this._watchLayerViewsUpdating(mapWidgetModel.view, model);
            mapWidgetModel.view.allLayerViews.forEach(layerView => {
                const layerModel = getLayerModelById(model.collection, layerView.layer.id);
                this._bindViewLoadingState(layerView, layerModel);
            });
        }
        this[handles].push(mapWidgetModel.watch("view", ({value: view}) => {
            if (view) {
                this._watchLayerViewsUpdating(view, model);
            }
        }));
    }

    _watchLayerViewsUpdating(view, model) {
        this[handles].push(view.on("layerview-create", ({layerView}) => {
            const layerModel = getLayerModelById(model.collection, layerView.layer.id);
            this._bindViewLoadingState(layerView, layerModel);
        }));
    }

    _bindViewLoadingState(layerView, layerModel) {
        if (!layerModel) return;
        this[handles].push(Binding
            .for(layerView, layerModel)
            .syncToRight("updating", "updating")
            .syncToRightNow()
            .enable());
    }

    deactivate() {
        if (!this[handles]) return;
        this[handles].forEach(handle => {
            const remove = handle.remove || handle.unbind;
            remove();
        });
        this[handles] = undefined;
    }
}

const getLayerModelById = (collection, id) => {
    if (!collection) return;
    for (let i = 0; i < collection.length; i++) {
        if (collection[i].id === id) {
            return collection[i]
        }
        const matchingChild = getLayerModelById(collection.children);
        if (matchingChild) return matchingChild;
    }
};
