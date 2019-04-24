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
import ButtonAction from "./ButtonAction.vue";

export default function LegendActionFactory() {
    return {
        createAction() {
            let i18n = this._i18n.get().ui;
            return {
                name: "description",
                extends: ButtonAction,
                props: {
                    titleLabel: {
                        type: String,
                        default: i18n.description
                    },
                    icon: {
                        type: String,
                        default: "info"
                    }
                },
                beforeDestroy: function () {
                    this.eventBus.$emit("close-description");
                },
                methods: {
                    onClick() {
                        this.eventBus.$emit("show-description", this.item);
                        this.eventBus.$emit('close-menu');
                    }
                },
                watch: {
                    "item.description"(){
                        this.displayAction = !!this.item.description;
                    }
                }
            }
        },
        getEventHandlers() {
            let i18n = this._i18n.get().ui;
            let envs = this._componentContext.getBundleContext().getCurrentExecutionEnvironment();
            let isMobile = this.isMobile = envs.some((env) => env.name === "Mobile" || env.name === "Android");
            let windowManager = this._windowManager;
            let widgetSize = this._properties.widgetSize;
            let descriptionWindow;
            return {
                "close-description": () => {
                    if(descriptionWindow){
                        descriptionWindow.close();
                        descriptionWindow = undefined;
                    }
                },
                "show-description": item => {
                    if (isMobile) {
                        widgetSize = {
                            w: "100%",
                            h: "100%"
                        };
                    }
                    descriptionWindow = windowManager.createWindow({
                        title: i18n.description + " - " + item.title,
                        dockable: false,
                        closable: true,
                        minimizeOnClose: false,
                        maximizable: true,
                        destroyContent: false,
                        marginBox: widgetSize,
                        content: item.description,
                        windowClass: "vueTocDescriptionWindow"
                    });
                    descriptionWindow.show();
                }
            }
        }
    }
}
