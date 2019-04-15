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
import Extent from "esri/geometry/Extent";
import when from "apprt-core/when";

const defaultExtent = '{"spatialReference":{"wkid":4326},"xmin":-180,"ymin":-90,"xmax":180,"ymax":90}';
const isDefaultExtent = extent => JSON.stringify(extent) === defaultExtent

export default function ZoomToExtentActionFactory() {
    return {
        getAction() {
            let i18n = this._i18n.get().ui;
            return {
                name: "zoom-to-extent",
                extends: ButtonAction,
                props: {
                    titleLabel: {
                        type: String,
                        default: i18n.zoomToExtent
                    },
                    icon: {
                        type: String,
                        default: "search"
                    }
                },
                methods: {
                    displayActionForItem(item) {
                        let displayAction = !!item.fullExtent && !isDefaultExtent(item.fullExtent);
                        this.$emit("display-changed", displayAction);
                        return displayAction;
                    },
                    onClick(item) {
                        let extent = item.fullExtent;
                        if (!extent) {
                            return;
                        }
                        this.eventBus.$emit("zoom-to-extent", extent);
                        this.$emit('close-menu');
                    }
                }
            }
        },
        getEventHandlers() {
            const mapWidgetModel = this._mapWidgetModel;
            const coordinateTransformer = this._coordinateTransformer;
            return {
                "zoom-to-extent": extent => {
                    let view = mapWidgetModel.view;
                    if(!view) return;
                    const targetWkid = view.spatialReference.wkid;
                    when(coordinateTransformer.transform(Extent.fromJSON(extent), targetWkid))
                        .then(targetExtent => {
                            view.goTo({target: targetExtent}, {
                                "animate": true,
                                "duration": 1000,
                                "easing": "ease-in-out"
                            });
                    });
                }
            }
        }
    }
}
