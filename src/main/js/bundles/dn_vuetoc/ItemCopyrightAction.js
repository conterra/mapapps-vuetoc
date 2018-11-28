
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
export default function ItemCopyrightAction() {
    return {
        getComponent() {
            let copyright = this._i18n.get().ui.copyright;
            return {
                name: "item-copyright",
                template: `
                    <v-card-title v-if="item.layer.copyright">
                        <div class="mb-1 grey--text caption">{{ copyrightLabel }}</div>
                        <div class="grey--text caption">{{ item.layer.copyright }}</div>
                    </v-card-title>
                `,
                props: ["item"],
                data: function(){
                    return {
                        copyrightLabel: copyright
                    }
                },
                methods: {
                    displayActionForItem(item) {
                        return !!item.layer && !!item.layer.description;
                    }
                }
            }
        }
    }
}
