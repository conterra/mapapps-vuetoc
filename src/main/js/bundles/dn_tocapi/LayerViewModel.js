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
import Extent from "esri/geometry/Extent";

const LayerViewModel = declare({

    /**
     * The id of the layer.
     *
     * @memberOf LayerViewModel#
     * @type String
     */
    id: {
        type: String
    },

    /**
     * The title of the layer.
     *
     * @memberOf LayerViewModel#
     * @type String
     */
    title: {
        type: String
    },

    /**
     * The parent layer of the layer.
     *
     * @memberOf LayerViewModel#
     * @type LayerViewModel
     */
    parent: {
        type: LayerViewModel
    },

    /**
     * The child-layers of the layer.
     *
     * @memberOf LayerViewModel#
     * @type LayerViewModel
     */
    children: {
        type: Array
    },

    /**
     * The extent of the layer.
     *
     * @memberOf LayerViewModel#
     * @type Extent
     */
    extent: {
        type: Extent
    },

    /**
     * The opacity of the layer.
     *
     * @memberOf LayerViewModel#
     * @type Number
     */
    opacity: {
        type: Number
    },

    /**
     * The copyright text of the layer.
     *
     * @memberOf LayerViewModel#
     * @type String
     */
    copyright: {
        type: String
    },

    /**
     * The description text of the layer.
     *
     * @memberOf LayerViewModel#
     * @type String
     */
    description: {
        type: String
    },

    /**
     * Indicates if the layer is visible in the view.
     *
     * @memberOf LayerViewModel#
     * @type Boolean
     */
    visible: {
        type: Boolean
    },

    /**
     * Indicates whether the layer is visible in the view in the current context (e.g. scale, extent, srs).
     *
     * @memberOf LayerViewModel#
     * @type Boolean
     */
    visibleInContext: {
        type: Boolean
    },

    /**
     * Represents the cause if the layer is not visible in the current context.
     *
     * @memberOf LayerViewModel#
     * @type String
     */
    visibleInContextCause: {
        type: String
    }
});

export default  LayerViewModel;
