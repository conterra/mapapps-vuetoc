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
import Legend from "esri/widgets/Legend";
import EsriDijit from "esri-widgets/EsriDijit";

export default class LegendFactory {

    createLegendWidget(layer) {
        let mapWidgetModel = this._mapWidgetModel;
        let view = mapWidgetModel.get("view");
        let legendWidget = new Legend({
            class: "ct-legend",
            view: view,
            layerInfos: [{
                layer: layer
            }],
            style: "classic"
        });
        let widget = new EsriDijit(legendWidget);
        let i18n = this._i18n.get().ui;
        let w = this._windowManager.createWindow({
            title: i18n.legend + " - " + layer.title,
            dockable: false,
            closable: true,
            minimizeOnClose: false,
            maximizable: true,
            destroyContent: false,
            marginBox: {
                w: 300,
                h: 500
            },
            content: widget.domNode,
            windowClass: "vuetocLegend"
        });
        w.show();
    }
};

