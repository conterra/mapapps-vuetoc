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
import SliderAction from "./SliderAction.vue";

export default function OpacityActionFactory() {
    return {
        getAction() {
            let i18n = this._i18n.get().ui;
            return {
                name: "opacity",
                extends: SliderAction,
                props: {
                    fromLabel: {
                        type: String,
                        default: i18n.invisible
                    },
                    toLabel: {
                        type: String,
                        default: i18n.visible
                    },
                    titleLabel: {
                        type: String,
                        default: i18n.opacity
                    },
                    icon: {
                        type: String,
                        default: "opacity"
                    }
                },
                data: function () {
                    return {
                        watchHandle: []
                    }
                },
                beforeMount: function () {
                    let item = this.item;
                    this.sliderValue = item.opacity;
                    this.watchHandle = item.watch("opacity", value => {
                        this.sliderValue = value;
                    });
                    this.eventBus.$on("reset", this.onReset);
                },
                beforeDestroy: function () {
                    this.watchHandle.remove();
                    this.eventBus.$off("reset", this.onReset);
                },
                methods: {
                    onChange(value) {
                        this.item.opacity = value;
                    },
                    onReset(){
                        this.item.opacity = this.item.initialOpacity;
                    }
                },
                watch: {
                    "item.opacity"(){
                        const item = this.item;
                        this.displayAction = item.opacity !== undefined && item.type !== "group";
                    }
                }
            }
        }
    }
}
