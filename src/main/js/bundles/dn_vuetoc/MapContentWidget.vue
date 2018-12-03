<template>
    <div class="ct-flex-container ct-flex-container--column fullHeight">
        <div class="ct-flex-item overflowAuto">
            <v-container grid-list-sm>
                <baselayer-widget
                    v-if="showBasemaps"
                    :i18n="i18n"
                    :basemaps="basemaps"
                    class="vue-toc__basemaps"/>
                <operationallayer-widget
                    v-if="showOperationalLayer"
                    :i18n="i18n"
                    :operational-items="operationalItems"
                    :visible-icon-class="visibleIconClass"
                    :invisible-icon-class="invisibleIconClass"
                    :custom-layer-actions="customLayerActions"
                    :show-operational-layer-header-menu="showOperationalLayerHeaderMenu"
                    class="vue-toc__layers"/>
            </v-container>
        </div>
        <div class="ct-flex-item ct-flex-item--no-grow ct-flex-item--no-shrink">
            <v-container grid-list-md>
                <v-layout
                    row
                    wrap>
                    <v-flex v-if="showCloseButton">
                        <v-card class="elevation-6">
                            <v-btn
                                v-if="isMobile"
                                block
                                color="primary"
                                class="btn btn--block btn--raised theme--light"
                                @click.native="$emit('close')">
                                <v-icon left>arrow_back</v-icon>
                                {{ i18n.backToMap }}
                            </v-btn>
                            <v-btn
                                v-else
                                block
                                color="primary"
                                class="btn btn--block btn--raised theme--light"
                                @click.native="$emit('close')">
                                <v-icon left>arrow_back</v-icon>
                                {{ i18n.close }}
                            </v-btn>
                        </v-card>
                    </v-flex>
                    <v-flex v-if="showResetButton">
                        <v-card class="elevation-6">
                            <v-btn
                                block
                                color="primary"
                                class="btn btn--block btn--raised theme--light"
                                @click.native="$emit('reset')">
                                <v-icon left>settings_backup_restore</v-icon>
                                {{ i18n.reset }}
                            </v-btn>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>
<script>
    import Bindable from "apprt-vue/mixins/Bindable";
    import BaseLayerWidget from "./BaseLayerWidget.vue";
    import OperationalLayerWidget from "./OperationalLayerWidget.vue";

    export default {
        components: {
            "baselayer-widget": BaseLayerWidget,
            "operationallayer-widget": OperationalLayerWidget
        },
        mixins: [Bindable],
        data: function () {
            return {
                customLayerActions: [],
                operationalItems: null,
                legendArray: [],
                basemaps: [],
                selectedId: "",
                showBasemaps: true,
                showOperationalLayer: true,
                showLegend: true,
                showLoadingStatus: true,
                showOperationalLayerHeaderMenu: true,
                showLayerMenu: true,
                showResetButton: true,
                showCloseButton: true,
                visibleIconClass: "visibility",
                invisibleIconClass: "visibility_off",
                i18n: {
                    type: Object,
                    default: function () {
                        return {
                            basemaps: "Basemaps",
                            layers: "Operational Layer",
                            close: "Close",
                            backToMap: "Back to map",
                            reset: "Reset",
                            description: "Description:",
                            copyright: "Copyright:",
                            activateAllLayer: "Activate all layer",
                            deactivateAllLayer: "Deactivate all layer"
                        }
                    }
                }
            };
        },
        methods: {
            getLegend: function (url) {
                let imageUrl = "";
                this.legendArray.forEach((legend) => {
                    if (url === legend.url) {
                        imageUrl = (' ' + legend.imageUrl).slice(1) || "";
                    }
                });
                return imageUrl;
            }
        }
    };
</script>
