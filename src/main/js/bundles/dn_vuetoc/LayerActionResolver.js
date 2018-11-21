
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
import {Evented} from "apprt-core/Events";

const _layerActions = Symbol("layerActions");

export default class LayerActionResolver extends Evented {
    constructor() {
        super();
        this[_layerActions] = new Map();
    }

    getLayerActions() {
        return Array.from(this[_layerActions].values());
    }

    addLayerActionFactory(factory) {
        if (!factory.getComponent) {
            console.warn("LayerActionResolver: Factory must provide a 'getComponent' function!");
            return;
        }
        let action = factory.getComponent();
        let name = action.name;
        this[_layerActions].set(name, action);
        this.emit("layer-action-added", {
            name, action
        });
    }

    removeLayerActionFactory(factory) {
        let action = factory.getComponent();
        let name = action.name;
        this[_layerActions].delete(name);
        this.emit("layer-action-removed", {
            name, action
        });
    }
}
