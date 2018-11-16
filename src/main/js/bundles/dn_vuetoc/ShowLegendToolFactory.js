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
export default function ZoomToExtentToolFactory() {
    return {
        getComponent() {
            let i18n = this._i18n.get().ui;
            let source = this;
            return {
                name: "show-legend",
                template: `
                <v-list-tile v-if="item.layer && item.layer.legendEnabled" @click="showLegendWidget(item)">
                    <v-list-tile-action>
                        <v-icon primary>search</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>{{i18n.showLegend}}</v-list-tile-title>
                </v-list-tile>`,

                props: {
                    item: Object,
                    i18n: {
                        type: Object,
                        default: function () {
                            return i18n;
                        }
                    },
                    source: source
                },
                methods: {
                    showLegendWidget(item) {
                        source.legendFactory.createLegendWidget(item.layer);
                    }
                }
            }
        }
    }
}
