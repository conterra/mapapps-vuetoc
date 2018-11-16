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

const _layerTools = Symbol("layerTools");

export default class LayerToolResolver extends Evented {
    constructor() {
        super();
        this[_layerTools] = new Map();
    }

    getLayerTools() {
        return Array.from(this[_layerTools].values());
    }

    addLayerToolFactory(factory) {
        if (!factory.getComponent) {
            console.warn("LayerToolResolver: Factory must provide a 'getComponent' function!");
            return;
        }
        let component = factory.getComponent();
        let name = component.name;
        this[_layerTools].set(name, component);
        this.emit("layer-tool-added", {
            name, component
        });
    }

    removeLayerToolFactory(component) {
        this[_layerTools].remove(name);
        this.emit("layer-tool-removed", {
            name, component
        });
    }
}
