<template>
    <div class="ct-flex-container ct-flex-container--column fullHeight">
        <div class="ct-flex-item overflowAuto">
            <v-container grid-list-sm>
                <baselayer-widget class="vue-toc__basemaps"
                                  :i18n="i18n"
                                  v-if="showBasemaps"/>
                <operationallayer-widget class="vue-toc__layers"
                                         :i18n="i18n"
                                         :visibleIconClass="visibleIconClass"
                                         :invisibleIconClass="invisibleIconClass"
                                         :customLayerTools="customLayerTools"
                                         v-if="showOperationalLayer"/>
            </v-container>
        </div>
        <div class="ct-flex-item ct-flex-item--no-grow ct-flex-item--no-shrink">
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex xs6>
                        <v-card class="elevation-6">
                            <v-btn v-if="isMobile" block
                                   color="primary"
                                   @click.native="close"
                                   class="btn btn--block btn--raised theme--light">
                                <v-icon left>arrow_back</v-icon>
                                {{i18n.backToMap}}
                            </v-btn>
                            <v-btn v-else block
                                   color="primary"
                                   @click.native="close"
                                   class="btn btn--block btn--raised theme--light">
                                <v-icon left>arrow_back</v-icon>
                                {{i18n.close}}
                            </v-btn>
                        </v-card>
                    </v-flex>
                    <v-flex xs6>
                        <v-card class="elevation-6">
                            <v-btn block
                                   color="primary"
                                   @click.native="reset"
                                   class="btn btn--block btn--raised theme--light">
                                <v-icon left>settings_backup_restore</v-icon>
                                {{i18n.reset}}
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
        mixins: [Bindable],
        components: {
            "baselayer-widget": BaseLayerWidget,
            "operationallayer-widget": OperationalLayerWidget
        },
        data: function () {
            return {
                customLayerTools: [],
                renderComponent: true,
                renderProgressBars: true,
                operationalItems: null,
                legendArray: [],
                menuArray: [],
                basemaps: [],
                selectedId: "",
                showBasemaps: true,
                showOperationalLayer: true,
                showLegend: true,
                showLoadingStatus: true,
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
            rerender: function () {
                this.renderComponent = false;
                this.$nextTick(() => {
                    this.renderComponent = true;
                });
            },
            rerenderProgressBars: function () {
                this.renderProgressBars = false;
                this.$nextTick(() => {
                    this.renderProgressBars = true;
                });
            },
            reverseArray: function (items) {
                return items.slice().reverse();
            },
            getMenuValue: function (item) {
                return this.menuArray.find((obj) => {
                    return obj.uid === item.uid;
                });
            },
            close: function () {
                this.$emit('close', {});
            },
            reset: function () {
                this.$emit('reset', {});
            },
            enableAllLayers: function (value) {
                this.$emit('enableAllLayers', value);
            },
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
