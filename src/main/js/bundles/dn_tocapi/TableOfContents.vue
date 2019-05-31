<template>
    <div class="ct-flex-container ct-flex-container--column fullHeight dn-toc">
        <div class="ct-flex-item dn-toc__scroll-container">
            <v-container
                grid-list-sm
                class="pa-1"
            >
                <base-layer-node
                    v-if="config.showBasemaps"
                    :i18n="i18n"
                    :basemaps="basemaps"
                    class="dn-toc__basemaps"
                />
                <ground-layer-node
                    v-if="config.showGroundOpacity && hasGround"
                    :i18n="i18n"
                    :ground-opacity.sync="groundOpacity"
                    class="dn-toc__ground"
                />
                <operational-layer-node
                    v-if="config.showOperationalLayer"
                    :bus="bus"
                    :i18n="i18n"
                    :operational-items="operationalItems"
                    :config="config"
                    :action-components="actionComponents"
                    class="dn-toc__layers"
                />
            </v-container>
        </div>
        <div class="ct-flex-item ct-flex-item--no-grow ct-flex-item--no-shrink">
            <v-container
                grid-list-md
                class="pa-1"
            >
                <v-layout
                    row
                    wrap
                >
                    <v-flex v-if="config.showCloseButton">
                        <v-card class="elevation-6">
                            <v-btn
                                v-if="config.isMobile"
                                block
                                color="primary"
                                class="btn btn--block btn--raised theme--light"
                                @click.native="$emit('close')"
                            >
                                <v-icon left>
                                    arrow_back
                                </v-icon>
                                {{ i18n.backToMap }}
                            </v-btn>
                            <v-btn
                                v-else
                                block
                                color="primary"
                                class="btn btn--block btn--raised theme--light"
                                @click.native="$emit('close')"
                            >
                                <v-icon left>
                                    arrow_back
                                </v-icon>
                                {{ i18n.close }}
                            </v-btn>
                        </v-card>
                    </v-flex>
                    <v-flex v-if="config.showResetButton">
                        <v-card class="elevation-6">
                            <v-btn
                                block
                                color="primary"
                                class="btn btn--block btn--raised theme--light"
                                @click.native="reset()"
                            >
                                <v-icon left>
                                    settings_backup_restore
                                </v-icon>
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
    import BaseLayerNode from "./BaseLayerNode.vue";
    import GroundLayerNode from "./GroundLayerNode.vue";
    import OperationalLayerNode from './OperationalLayerNode.vue';

    export default {
        components: {
            "base-layer-node": BaseLayerNode,
            "ground-layer-node": GroundLayerNode,
            "operational-layer-node": OperationalLayerNode
        },
        mixins: [Bindable],
        props: {
            config: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            selectedId: {
                type: String,
                default: ""
            },
            hasGround: {
                type: Boolean,
                default: false
            },
            groundOpacity: {
                type: Number,
                default: 1
            },
            legendArray: {
                type: Array,
                default: () => []
            },
            bus: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            i18n: {
                type: Object,
                default: function () {
                    return {
                        basemaps: "Basemaps",
                        ground: "Ground",
                        layers: "Operational Layer",
                        operationalLayerOptions: "Options",
                        showAllLayer: "Activate all layer",
                        hideAllLayer: "Deactivate all layer",
                        openAllLayer: "Open all layer",
                        closeAllLayer: "Close all layer",
                        close: "Close",
                        backToMap: "Back to map",
                        reset: "Reset",
                        visible: "visible",
                        invisible: "invisible"
                    };
                }
            }
        },
        data: function () {
            return {
                basemaps: [],
                operationalItems: [],
                actionComponents: []
            }
        },
        methods: {
            reset: function () {
                this.bus.$emit('reset');
                this.$emit('reset');
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
