<template>
    <div class="ct-flex-container ct-flex-container--column fullHeight">
        <div class="ct-flex-item overflowAuto">
            <v-container grid-list-sm>
                <baselayer-widget class="vue-toc__basemaps" v-bind:i18n="i18n" v-if="showBasemaps"/>
                <operationallayer-widget class="vue-toc__layers" v-bind:i18n="i18n" v-if="showOperationalLayer"/>
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
                layers: [],
                layerArray: [],
                legendArray: [],
                basemaps: [],
                selectedId: "",
                showBasemaps: true,
                showOperationalLayer: true,
                showLegend: true,
                i18n: {
                    type: Object,
                    default: function () {
                        return {
                            basemaps: "Basemaps",
                            layers: "Operational Layer",
                            close: "Close",
                            backToMap: "Back to map",
                            reset: "Reset",
                            zoomToExtent: "Zoom to extent",
                            description: "Description:",
                            copyright: "Copyright:",
                            activateAllLayer: "Activate all layer",
                            deactivateAllLayer: "Deactivate all layer",
                            opacity: "Opacity"
                        }
                    }
                }
            };
        },
        watch: {
            layerArray: {
                handler(val, oldVal) {
                    let layers = this.$data.layers;
                    for (let id in val) {
                        let visible = val[id].visible;
                        let opacity = val[id].opacity;
                        let oldVisible, oldOpacity;
                        if (this.oldLayerArray && this.oldLayerArray[id]) {
                            oldVisible = this.oldLayerArray[id].visible;
                            oldOpacity = this.oldLayerArray[id].opacity;
                            if (visible !== oldVisible) {
                                layers.forEach((layer) => {
                                        if (layer.layerCount === parseInt(id)) {
                                            layer.visible = visible;
                                            /*if (layer.sublayers && layer.sublayers.items) {
                                                layer.sublayers.forEach(function (sublayer) {
                                                    sublayer.visible = true;
                                                });
                                            } else if (layer.layers && layer.layers.items) {
                                                layer.layers.forEach(function (sublayer) {
                                                    sublayer.visible = true;
                                                });
                                            }*/
                                        }
                                        if (layer.sublayers && layer.sublayers.items) {
                                            layer.sublayers.forEach((sublayer) => {
                                                if (sublayer.layerCount === parseInt(id)) {
                                                    sublayer.visible = visible;
                                                    if (visible && sublayer.parent) {
                                                        sublayer.parent.visible = true;
                                                    }
                                                }
                                            });
                                        } else if (layer.layers && layer.layers.items) {
                                            layer.layers.forEach((sublayer) => {
                                                if (sublayer.layerCount === parseInt(id)) {
                                                    sublayer.visible = visible;
                                                    if (visible && sublayer.parent) {
                                                        sublayer.parent.visible = true;
                                                    }
                                                }
                                            });
                                        }
                                    }
                                );
                            }
                            if (opacity !== oldOpacity) {
                                layers.forEach((layer) => {
                                        if (layer.layerCount === parseInt(id)) {
                                            layer.opacity = opacity;
                                        }
                                        if (layer.sublayers && layer.sublayers.items) {
                                            layer.sublayers.forEach((sublayer) => {
                                                if (sublayer.layerCount === parseInt(id)) {
                                                    sublayer.opacity = opacity;
                                                }
                                            });
                                        } else if (layer.layers && layer.layers.items) {
                                            layer.layers.forEach((sublayer) => {
                                                if (sublayer.layerCount === parseInt(id)) {
                                                    sublayer.opacity = opacity;
                                                }
                                            });
                                        }
                                    }
                                );
                            }
                        }
                    }
                    this.oldLayerArray = JSON.parse(JSON.stringify(val));
                },
                deep: true
            }
        },
        methods: {
            reverseArray: function (items) {
                return items.slice().reverse();
            },
            close: function () {
                this.$emit('close', {});
            },
            reset: function () {
                this.$emit('reset', {});
            },
            zoomToExtent: function (layer) {
                this.$emit('zoomToExtent', layer);
            },
            getLegend: function (url) {
                let imageUrl = "";
                this.legendArray.forEach((legend) => {
                    if (url === legend.url) {
                        imageUrl = (' ' + legend.imageUrl).slice(1) || "";
                    }
                });
                return imageUrl;
            },
            closeAllMenus: function () {
                this.layerArray.forEach((layer) => {
                    layer.menuVisibility = false;
                })
            },
            setLayerVisibility: function (status) {
                this.layerArray.forEach((layer) => {
                    layer.visible = status;
                })
            }
        }
    };
</script>
