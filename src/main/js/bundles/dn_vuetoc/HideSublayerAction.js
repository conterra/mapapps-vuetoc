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

export default function HideSublayerAction() {
    return {
        getComponent() {
            let i18n = this._i18n.get().ui;
            return {
                name: "hide-sublayer",
                extends: ButtonAction,
                data: function () {
                    return {
                        icon: "visibility_off",
                        titleLabel: i18n.hideAllSublayer
                    }
                },
                methods: {
                    displayActionForItem(item) {
                        return item.children && item.children.length;
                    },
                    onClick(item) {
                        if (item.children) {
                            let allChildren = item.children.flatten((item) => item.children);
                            allChildren.forEach((child) => {
                                child.visible = false;
                            })
                        }
                        this.$emit('close-menu');
                    }
                }
            }
        }
    }
}
