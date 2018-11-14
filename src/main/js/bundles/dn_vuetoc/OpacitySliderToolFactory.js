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
export default function OpacitySliderToolFactory() {
    return {
        getComponent() {
            let i18n = this._i18n.get().ui;
            return {
                name: "opacity-slider",
                template: `
                    <v-list-group no-action>
                        <v-list-tile slot="activator">
                            <v-list-tile-action>
                                <v-icon primary>opacity</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-title>{{i18n.opacity}}</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile class="vue-toc__opacity">
                            {{i18n.invisible}}
                            <v-slider v-model="opacity"
                                hide-details :max="1" step="0.01"
                                @input="onSliderChange">
                            </v-slider>
                            {{i18n.visible}}
                        </v-list-tile>
                    </v-list-group>`,
                props: {
                    item: Object,
                    i18n: {
                        type: Object,
                        default: function () {
                            return i18n
                        }
                    }
                },
                data: function () {
                    let opacity = this.item.layer.opacity;
                    if (opacity === undefined) {
                        opacity = 1;
                    }
                    return { opacity };
                },
                beforeMount: function () {
                    this.item.layer.watch("opacity", value => {
                        this.opacity = value;
                    });
                },
                methods: {
                    onSliderChange(value) {
                        this.item.layer.opacity = value;
                    }
                }
            }
        }
    }
}