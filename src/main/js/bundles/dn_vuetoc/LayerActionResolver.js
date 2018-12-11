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

const _layerActionFactories = Symbol("layerActions");

export default class LayerActionResolver extends Evented {
    constructor() {
        super();
        this[_layerActionFactories] = new Map();
    }

    getLayerActions() {
        let factories = Array.from(this[_layerActionFactories].values());
        factories.sort((a, b) => {
            if (a._properties["priority"] < b._properties["priority"])
                return 1;
            if (a._properties["priority"] > b._properties["priority"])
                return -1;
            return 0;
        });
        return factories.map(factory => factory.getComponent());
    }

    addLayerActionFactory(factory) {
        if (!factory.getComponent) {
            console.warn("LayerActionResolver: Factory must provide a 'getComponent' function!");
            return;
        }
        let name = factory.getComponent().name;
        this[_layerActionFactories].set(name, factory);
        this.emit("layer-action-added", {
            name, factory
        });
    }

    removeLayerActionFactory(factory) {
        let name = factory.getComponent().name;
        this[_layerActionFactories].delete(name);
        this.emit("layer-action-removed", {
            name, factory
        });
    }
}
