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

export default {
    mixins: [Bindable],
    props:{
        id: {
            type: String
        },
        title: {
            type: String
        },
        type: {
            type: String
        },
        open: {
            type: Boolean,
            default: false
        },
        updating: {
            type: Boolean,
            default: false
        },
        parent: {
            type: Object
        },
        children: {
            type: Object
        },
        extent: {
            type: Object
        },
        minScale: {
            type: Number,
            default: 0
        },
        maxScale: {
            type: Number,
            default: 0
        },
        opacity: {
            type: Number,
            default: 1
        },
        initialOpacity: {
            type: Number,
            default: 1
        },
        copyright: {
            type: String
        },
        description: {
            type: String
        },
        initialVisible: {
            type: Boolean
        },
        visible: {
            type: Boolean,
            default: true
        },
        visibleInContext: {
            type: Boolean,
            default: true
        },
        visibleInContextCause: {
            type: String
        }
    }
}