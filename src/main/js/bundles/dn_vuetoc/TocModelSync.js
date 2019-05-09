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
import AsyncTask from "apprt-core/AsyncTask";

const DEFAULT_DELAY = 200;
const watchHandle = Symbol("watchHandle");
const _model = Symbol("model");

export default class LayerVisibilitySynchronizer {

    activate() {
        this.i18n = this._i18n.get().ui;
        const DELAY = this._properties.delay || DEFAULT_DELAY;
        this.deferredCheckEffectiveLayers = AsyncTask(this.checkEffectiveLayers.bind(this)).delay.bind(this, DELAY);
    }

    sync(model) {
        if (!model || !model.collection) return;
        this[_model] = model;
        this[watchHandle] = this._mapWidgetModel.watch("scale", () => this.deferredCheckEffectiveLayers());
    }

    checkEffectiveLayers(collection) {
        collection = collection || this[_model].collection;
        for (let i = 0; i < collection.length; i++) {
            let layerModel = collection[i];
            this.checkLayerEffectivity(layerModel);
            const children = layerModel.children;
            children && children.length && this.checkEffectiveLayers(children);
        }
    }

    async checkLayerEffectivity(layerModel) {
        const {scale} = this._mapWidgetModel;
        layerModel.visibleInContext = await isVisibleAtScale(layerModel, scale);
        layerModel.visibleInContextCause = layerModel.visibleInContext ? "" : this.i18n.scaleErrorMsg;
    }

    deactivate() {
        this[watchHandle] && this[watchHandle].remove();
        this[watchHandle] = undefined;
    }
}

const isVisibleAtScale = async function (layerModel, scale) {
    let minScale = layerModel.minScale || 0;
    let maxScale = layerModel.maxScale || 0;
    if (!scale || (minScale === 0 && maxScale === 0)) return true
    return scale >= maxScale && (minScale !== 0 ? scale <= minScale : true);
};
