
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
import ButtonAction from "./ButtonAction.vue";

export default function ZoomToExtentAction() {
    return {
        getComponent() {
            let i18n = this._i18n.get().ui;
            return {
                name: "zoom-to-extent",
                extends: ButtonAction,
                data: function () {
                    return {
                        icon: "search",
                        titleLabel: i18n.zoomToExtent
                    }
                },
                methods: {
                    displayActionForItem(item) {
                        return item.layer && item.layer.fullExtent;
                    },
                    onClick(item) {
                        const layer = item.layer;
                        let extent = layer.fullExtent;
                        if (!extent) {
                            return;
                        }
                        item.view.goTo({ target: extent }, {
                            "animate": true,
                            "duration": 1000,
                            "easing": "ease-in-out"
                        });
                        this.$emit('close-menu');
                    }
                }
            }
        }
    }
}
