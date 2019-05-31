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

import Bindable from "apprt-vue/mixins/Bindable";

/**
 * @class
 * The LayerViewModel of the Layer.
 * It provides access to state information of the Layer.
 * Note: Every Layer has it's own LayerViewModel.
 */
const LayerViewModel = {
    mixins: [Bindable],
    props:{

        /**
         * The unique id of the layer, should not be changed.
         * @memberOf LayerViewModel#
         * @type String
         */
        id: {
            type: String
        },
        /**
         * The title of the layer.
         * @memberOf LayerViewModel#
         * @type String
         */
        title: {
            type: String
        },
        /**
         * The type of the layer.
         * @memberOf LayerViewModel#
         * @type String
         * @see [type] (https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-Layer.html#type)
         */
        type: {
            type: String
        },
        /**
         * The state of the tree item in the UI for the layer.
         * @memberOf LayerViewModel#
         * @type Boolean
         */
        open: {
            type: Boolean,
            default: false
        },
        /**
         * The loading state of the layer.
         * @memberOf LayerViewModel#
         * @type Boolean
         */
        updating: {
            type: Boolean,
            default: false
        },
        /**
         * The LayerViewModel of the parent of this layer (if available).
         * @memberOf LayerViewModel#
         * @type LayerViewModel
         */
        parent: {
            type: Object
        },
        /**
         * An array of LayerViewModels of the children of this layer (if available).
         * @memberOf LayerViewModel#
         * @type Array
         */
        children: {
            type: Array
        },
        /**
         * The extent of the layer.
         * @memberOf LayerViewModel#
         * @type Boolean
         */
        fullExtent: {
            type: Object
        },
        /**
         * The minimal scale of the layer.
         * @memberOf LayerViewModel#
         * @type Number
         */
        minScale: {
            type: Number,
            default: 0
        },
        /**
         * The maximal scale of the layer.
         * @memberOf LayerViewModel#
         * @type Number
         */
        maxScale: {
            type: Number,
            default: 0
        },
        /**
         * The opacity of the layer.
         * @memberOf LayerViewModel#
         * @type Number
         */
        opacity: {
            type: Number,
            default: 1
        },
        /**
         * The initial opacity of the layer.
         * @memberOf LayerViewModel#
         * @type Number
         */
        initialOpacity: {
            type: Number,
            default: 1
        },
        /**
         * The copyright text of the layer.
         * @memberOf LayerViewModel#
         * @type String
         */
        copyright: {
            type: String
        },
        /**
         * The description text of the layer.
         * @memberOf LayerViewModel#
         * @type String
         */
        description: {
            type: String
        },
        /**
         * The visiblility state of the layer.
         * @memberOf LayerViewModel#
         * @type Boolean
         */
        visible: {
            type: Boolean,
            default: true
        },
        /**
         * The initial visiblility state of the layer.
         * @memberOf LayerViewModel#
         * @type Boolean
         */
        initialVisible: {
            type: Boolean
        },
        /**
         * The visiblility of the layer in the current view.
         * @memberOf LayerViewModel#
         * @type Boolean
         */
        visibleInContext: {
            type: Boolean,
            default: true
        },
        /**
         * The cause for the invisiblility of the layer.
         * @memberOf LayerViewModel#
         * @type Boolean
         */
        visibleInContextCause: {
            type: String
        }
    }
}

export default LayerViewModel;
