<template>
    <div class="ct-flex-container ct-flex-container--column fullHeight vue-toc">
        <div class="ct-flex-item overflowAuto">
            <v-container
                grid-list-sm
                class="pa-1">
                <base-layer-node
                    v-if="config.showBasemaps"
                    :i18n="i18n"
                    :basemaps="basemaps"
                    class="vue-toc__basemaps"/>
                <operational-layer-node
                    v-if="config.showOperationalLayer"
                    :bus="bus"
                    :i18n="i18n"
                    :operational-items="operationalItems"
                    :config="config"
                    :custom-layer-actions="customLayerActions"
                    class="vue-toc__layers"/>
            </v-container>
        </div>
        <div class="ct-flex-item ct-flex-item--no-grow ct-flex-item--no-shrink">
            <v-container
                grid-list-md
                class="pa-1">
                <v-layout
                    row
                    wrap>
                    <v-flex v-if="config.showCloseButton">
                        <v-card class="elevation-6">
                            <v-btn
                                v-if="config.isMobile"
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
                    <v-flex v-if="config.showResetButton">
                        <v-card class="elevation-6">
                            <v-btn
                                block
                                color="primary"
                                class="btn btn--block btn--raised theme--light"
                                @click.native="reset()">
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
    import BaseLayerNode from "./BaseLayerNode.vue";
    import OperationalLayerNode from './OperationalLayerNode.vue';

    export default {
        components: {
            "base-layer-node": BaseLayerNode,
            "operational-layer-node": OperationalLayerNode
        },
        mixins: [Bindable],
        props: {
            config: Object,
            selectedId: String,
            legendArray: {
                type: Array,
                default: () => []
            },
            bus: Object,
            i18n: Object
        },
        data: function () {
            return {
                basemaps: [],
                operationalItems: [],
                customLayerActions: []
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
