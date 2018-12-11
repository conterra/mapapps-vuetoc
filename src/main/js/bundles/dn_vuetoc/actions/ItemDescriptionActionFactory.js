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
import ItemDescriptionAction from "./ItemDescriptionAction.vue";

export default function LegendActionFactory() {
    return {
        getComponent() {
            let envs = this._componentContext.getBundleContext().getCurrentExecutionEnvironment();
            let isMobile = this.isMobile = envs.some((env) => env.name === "Mobile" || env.name === "Android");
            let i18n = this._i18n.get().ui;
            let windowManager = this._windowManager;
            let widgetSize = this._properties.widgetSize;
            ItemDescriptionAction.props.windowManager = {
                type: Object,
                default: () => windowManager
            };
            ItemDescriptionAction.props.widgetSize = {
                type: Object,
                default: () => widgetSize
            };
            ItemDescriptionAction.props.isMobile = {
                type: Boolean,
                default: isMobile
            };
            ItemDescriptionAction.props.descriptionTitleLabel = {
                type: String,
                default: i18n.description
            };
            ItemDescriptionAction.props.titleLabel = {
                type: String,
                default: i18n.description
            };
            return ItemDescriptionAction;
        }
    }
}
