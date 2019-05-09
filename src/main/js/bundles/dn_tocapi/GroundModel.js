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
import {declare} from "apprt-core/Mutable";

const groundHandler = Symbol("groundHandler");
const opacityHandles = Symbol("opacityHandler");

export default declare({

    hasGround: false,
    groundOpacity: null,

    activate() {
        const mapWidgetModel = this._mapWidgetModel;
        this.hasGround = mapWidgetModel.viewmode === "3D";
        const map = this._map;
        let ground = map.ground;
        this.groundOpacity = ground.opacity;

        this.registerWatcher();
    },

    deactivate() {
        this.opacityHandles.forEach(handle => {
            handle.remove();
        });
        this.groundHandler.remove();
    },

    registerWatcher() {
        this[opacityHandles] = [];
        const mapWidgetModel = this._mapWidgetModel;
        this[groundHandler] = mapWidgetModel.watch("viewmode", ({value: viewmode}) => {
            this.hasGround = viewmode === "3D";
        });
        const map = this._map;
        let ground = map.ground;
        this.watchForOpacity(ground);
    },

    watchForOpacity(ground) {
        this[opacityHandles].push(ground.watch("opacity", ({value: opacity}) => {
            this.opacity = opacity;
        }));
        this[opacityHandles].push(this.watch("groundOpacity", ({value: opacity}) => {
            ground.opacity = opacity;
        }));
    }

});
