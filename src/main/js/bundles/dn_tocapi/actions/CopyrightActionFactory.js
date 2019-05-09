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
import CopyrightAction from "./CopyrightAction.vue";

export default function ItemCopyrightActionFactory() {
    return {
        createAction() {
            let i18n = this._i18n.get().ui;
            return {
                extends: CopyrightAction,
                props: {
                    copyrightLabel: {
                        type: String,
                        default: i18n.copyright
                    }
                },
                watch: {
                    "item.copyright"() {
                        let item = this.item;
                        this.displayAction = !!item.copyright && item.copyright.toLowerCase() !== 'none';
                    }
                },
                beforeMount: function () {
                    let item = this.item;
                    this.displayAction = !!item.copyright && item.copyright.toLowerCase() !== 'none';
                }
            }
        }
    }
}
