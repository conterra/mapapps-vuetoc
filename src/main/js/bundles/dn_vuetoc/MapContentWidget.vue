<template>
    <div class="vue-toc">
        <div class="center">
            <v-container grid-list-sm>
                <v-layout row wrap>
                    <v-flex class="vue-toc__basemaps" xs12 v-if="showBasemaps">
                        <v-card class="elevation-6">
                            <v-toolbar class="primary title" dense>
                                <v-toolbar-title>{{i18n.basemaps}}</v-toolbar-title>
                            </v-toolbar>
                            <v-list>
                                <v-list-tile v-for="basemap in basemaps"
                                             v-bind:key="basemap.id"
                                             @click.prevent.stop="selectedId = basemap.id"
                                             v-bind:class="{'primary--text': basemap.id === selectedId}">
                                    <v-list-tile-action v-if="basemap.icon">
                                        <v-icon v-if="basemap.id === selectedId" primary medium>{{basemap.icon}}
                                        </v-icon>
                                        <v-icon v-else="basemap.id === selectedId">{{basemap.icon}}
                                        </v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-action v-else>
                                        <v-icon v-if="basemap.id === selectedId" primary medium>video_label</v-icon>
                                        <v-icon v-else="basemap.id === selectedId">video_label</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content v-if="basemap.id === selectedId">
                                        <v-list-tile-title class="title"
                                                           v-text="basemap.title"></v-list-tile-title>
                                    </v-list-tile-content>
                                    <v-list-tile-content v-else>
                                        <v-list-tile-title v-text="basemap.title"></v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-card>
                    </v-flex>
                    <v-flex class="vue-toc__layers" xs12 v-if="showOperationalLayer">
                        <v-card class="elevation-6">
                            <v-toolbar class="primary title" dense>
                                <v-toolbar-title>{{i18n.layers}}</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-menu bottom left max-width="400" transition="slide-y-transition">
                                    <v-btn icon slot="activator" @click="closeAllMenus">
                                        <v-icon>more_vert</v-icon>
                                    </v-btn>
                                    <v-list>
                                        <v-list-tile @click="setLayerVisibility(true)">
                                            <v-list-tile-action>
                                                <v-icon primary>visibility</v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-title>{{i18n.activateAllLayer}}
                                            </v-list-tile-title>
                                        </v-list-tile>
                                        <v-list-tile @click="setLayerVisibility(false)">
                                            <v-list-tile-action>
                                                <v-icon primary>visibility_off</v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-title>{{i18n.deactivateAllLayer}}
                                            </v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </v-toolbar>
                            <v-list>
                                <v-list-group v-for="layer in reverseArray(layers)" v-bind:key="layer.id"
                                              v-bind:value=layerArray[layer.layerCount].visible>
                                    <v-list-tile slot="item" @click="">
                                        <v-list-tile-action @click.prevent.stop>
                                            <v-switch
                                                    color="primary"
                                                    v-model=layerArray[layer.layerCount].visible></v-switch>
                                        </v-list-tile-action>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="layer.title"></v-list-tile-title>
                                        </v-list-tile-content>
                                        <v-list-tile-action @click.prevent.stop>
                                            <v-menu bottom left max-width="400" transition="slide-y-transition"
                                                    :close-on-content-click="false" :close-on-click="true"
                                                    v-model="layerArray[layer.layerCount].menuVisibility">
                                                <v-btn icon slot="activator" @click="closeAllMenus">
                                                    <v-icon>more_vert</v-icon>
                                                </v-btn>
                                                <v-card>
                                                    <v-toolbar dense>
                                                        <v-toolbar-title>{{layer.title}}</v-toolbar-title>
                                                        <v-spacer></v-spacer>
                                                        <v-btn icon
                                                               @click="layerArray[layer.layerCount].menuVisibility=false">
                                                            <v-icon>close</v-icon>
                                                        </v-btn>
                                                    </v-toolbar>
                                                    <v-card-title v-if="layer.description">
                                                        <div>
                                                            <span class="regular">{{layer.description}}</span>
                                                        </div>
                                                    </v-card-title>
                                                    <v-divider></v-divider>
                                                    <v-list>
                                                        <v-list-tile @click="zoomToExtent(layer)">
                                                            <v-list-tile-action>
                                                                <v-icon primary>search</v-icon>
                                                            </v-list-tile-action>
                                                            <v-list-tile-title>{{i18n.zoomToExtent}}</v-list-tile-title>
                                                        </v-list-tile>
                                                    </v-list>
                                                    <v-divider></v-divider>
                                                    <v-card-text>{{i18n.opacity}}
                                                        <v-slider v-model="layerArray[layer.layerCount].opacity" prepend-icon="opacity"
                                                                  thumb-label v-bind:min="0" v-bind:max="1"
                                                                  v-bind:step="0.01"></v-slider>
                                                    </v-card-text>
                                                    <v-divider></v-divider>
                                                    <v-card-title v-if="layer.copyright">
                                                        <div>
                                                            <div class="mb-1 grey--text caption">{{i18n.copyright}}
                                                            </div>
                                                            <span class="grey--text caption">{{layer.copyright}}</span>
                                                        </div>
                                                    </v-card-title>
                                                </v-card>
                                            </v-menu>
                                        </v-list-tile-action>
                                        <v-list-tile-action
                                                v-if="(layer.sublayers && layer.sublayers.items) || (layer.layers && layer.layers.items)">
                                            <v-icon>keyboard_arrow_down</v-icon>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                    <div v-if="(layer.sublayers && layer.sublayers.items) || (layer.layers && layer.layers.items)">
                                        <v-list-tile
                                                v-for="subLayer in reverseArray((layer.sublayers && layer.sublayers.items) || (layer.layers && layer.layers.items))"
                                                v-bind:key="subLayer.id"
                                                @click.prevent.stop>
                                            <v-list-tile-action @click.prevent.stop>
                                                <v-switch
                                                        color="primary"
                                                        v-model=layerArray[subLayer.layerCount].visible></v-switch>
                                            </v-list-tile-action>
                                            <v-list-tile-action v-if="showLegend && layer.legendEnabled"
                                                                @click="layerArray[subLayer.layerCount].visible = !layerArray[subLayer.layerCount].visible">
                                                <img v-bind:src="getLegend(subLayer.url, subLayer.id)"/>
                                            </v-list-tile-action>
                                            <v-list-tile-content
                                                    @click="layerArray[subLayer.layerCount].visible = !layerArray[subLayer.layerCount].visible">
                                                <v-list-tile-title v-text="subLayer.title"></v-list-tile-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action @click.prevent.stop>
                                                <v-menu bottom left max-width="400" transition="slide-y-transition"
                                                        :close-on-content-click="false" :close-on-click="true"
                                                        v-model="layerArray[subLayer.layerCount].menuVisibility">
                                                    <v-btn icon slot="activator" @click="closeAllMenus">
                                                        <v-icon>more_vert</v-icon>
                                                    </v-btn>
                                                    <v-card>
                                                        <v-toolbar dense>
                                                            <v-toolbar-title>{{subLayer.title}}</v-toolbar-title>
                                                            <v-spacer></v-spacer>
                                                            <v-btn icon
                                                                   @click="layerArray[subLayer.layerCount].menuVisibility=false">
                                                                <v-icon>close</v-icon>
                                                            </v-btn>
                                                        </v-toolbar>
                                                        <v-card-title v-if="subLayer.description">
                                                            <div>
                                                                <span class="regular">{{subLayer.description}}</span>
                                                            </div>
                                                        </v-card-title>
                                                        <v-divider></v-divider>
                                                        <v-list>
                                                            <v-list-tile @click="zoomToExtent(layer)">
                                                                <v-list-tile-action>
                                                                    <v-icon primary>search</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-title>{{i18n.zoomToExtent}}
                                                                </v-list-tile-title>
                                                            </v-list-tile>
                                                        </v-list>
                                                        <v-divider></v-divider>
                                                        <v-card-title v-if="subLayer.copyright">
                                                            <div>
                                                                <div class="mb-1 grey--text caption">{{i18n.copyright}}
                                                                </div>
                                                                <span class="grey--text caption">{{subLayer.copyright}}</span>
                                                            </div>
                                                        </v-card-title>
                                                    </v-card>
                                                </v-menu>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                    </div>
                                </v-list-group>
                            </v-list>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <div class="bottom">
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

    export default {
        mixins: [Bindable],
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
                        let oldVisible = this.oldLayerArray && this.oldLayerArray[id].visible;
                        let oldOpacity = this.oldLayerArray && this.oldLayerArray[id].opacity;
                        if (visible !== oldVisible && this.oldLayerArray) {
                            layers.forEach((layer) => {
                                    if (layer.layerCount === parseInt(id)) {
                                        layer.visible = visible;
                                        layer.opacity = opacity;
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
                                                sublayer.opacity = opacity;
                                                if (visible) {
                                                    sublayer.parent.visible = true;
                                                }
                                            }
                                        });
                                    } else if (layer.layers && layer.layers.items) {
                                        layer.layers.forEach((sublayer) => {
                                            if (sublayer.layerCount === parseInt(id)) {
                                                sublayer.visible = visible;
                                                sublayer.opacity = opacity;
                                                if (visible) {
                                                    sublayer.parent.visible = true;
                                                }
                                            }
                                        });
                                    }
                                }
                            );
                        } else if (opacity !== oldOpacity && this.oldLayerArray) {
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