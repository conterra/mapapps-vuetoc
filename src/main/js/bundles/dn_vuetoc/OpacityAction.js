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
import SliderAction from "./SliderAction.vue";

export default function OpacityAction() {
    return {
        getComponent() {
            let i18n = this._i18n.get().ui;
            return {
                name: "opacity",
                extends: SliderAction,
                data: function () {
                    return {
                        icon: "opacity",
                        fromLabel: i18n.invisible,
                        toLabel: i18n.visible,
                        titleLabel: i18n.opacity,
                        opacityWatchHandle: undefined
                    }
                },
                beforeMount: function () {
                    this.opacityWatchHandle = this.item.layer.watch("opacity", value => {
                        this.sliderValue = value;
                    });
                },
                beforeDestroy: function () {
                    this.opacityWatchHandle.remove();
                },
                methods: {
                    displayToolForItem(item) {
                        return item.layer && item.layer.opacity !== undefined;
                    },
                    onChange(value) {
                        this.item.layer.opacity = value;
                    }
                }
            }
        }
    }
}
