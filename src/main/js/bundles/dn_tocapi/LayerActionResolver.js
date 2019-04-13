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
import {Evented} from "apprt-core/Events";

const actionFactories = Symbol("actionFactories");
const actionHandlers = Symbol("actionHandlers");
const resetHandlers = Symbol("resetHandlers");
const eventBus = Symbol("eventBus");

export default class LayerActionResolver extends Evented {
    constructor() {
        super();
        this[actionFactories] = new Map();
        this[actionHandlers] = new Map();
        this[resetHandlers] = new Map();
    }

    getLayerActions() {
        let factories = Array.from(this[actionFactories].values());
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
            console.warn("LayerActionResolver: Factory must provide a 'getComponent' function!", factory);
            return;
        }
        let name = factory.getComponent().name;
        this[actionFactories].set(name, factory);

        if(!factory.getEventHandlers){
            this.emit("layer-action-added", {
                name, factory
            });
            return;
        }
        let factoryActionHandlers = factory.getEventHandlers();
        Object.entries(factoryActionHandlers).forEach(handler => {
            let eventName = handler[0];
            let eventHandler = handler[1];
            if(eventName === "reset"){
                this._registerResetHandler("name", eventHandler);
                return;
            }
            this._registerEventHandler(eventName, eventHandler);
        });

        this.emit("layer-action-added", {
            name, factory
        });
    }

    removeLayerActionFactory(factory) {
        let name = factory.getComponent().name;
        this[actionFactories].delete(name);

        if(!factory.getEventHandlers){
            this.emit("layer-action-removed", {
                name, factory
            });
            return;
        }
        let factoryActionHandlers = factory.getEventHandlers();
        Object.entries(factoryActionHandlers).forEach(handler => {
            this._unregisterEventHandler(name);
        });

        this.emit("layer-action-removed", {
            name, factory
        });
    }

    _registerResetHandler(actionName, handler){
        this[resetHandlers].set(actionName, handler);
        if(this[eventBus]) this[eventBus].$on("reset", handler);
    }

    _unregisterResetHandler(actionName, handler){
        this[resetHandlers].delete(actionName, handler);
        if(this[eventBus]) this[eventBus].$off("reset", handler);
    }

    _registerEventHandler(name, handler){
        if(this[actionHandlers].get(name)){
            console.warn(`LayerActionResolver: Event name ${name} already in reserved!`);
            return;
        }
        this[actionHandlers].set(name, handler);
        if(this[eventBus]) this[eventBus].$on(name, handler);
    }

    _unregisterEventHandler(name){
        this[actionHandlers].delete(name);
        if(this[eventBus]) this[eventBus].$off(name);
    }

    setEventBus(bus){
        this[eventBus] = bus;
        this[actionHandlers].forEach((handler, name) => {
            bus.$on(name, handler);
        });
        this[resetHandlers].forEach((handler) => {
            bus.$on("reset", handler);
        });
    }
}
