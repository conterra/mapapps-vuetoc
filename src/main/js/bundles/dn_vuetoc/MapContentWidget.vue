<template>
    <div class="vue-toc">
        <div class="center">
            <v-container grid-list-sm>
                <v-layout row wrap>
                    <v-flex xs12 v-if="showBasemaps">
                        <v-card class="elevation-6">
                            <v-card-title class="primary title">{{i18n.basemaps}}</v-card-title>
                            <v-list>
                                <v-list-tile v-for="basemap in basemaps"
                                             v-bind:key="basemap.id"
                                             @click.native.stop="selectedId = basemap.id">
                                    <v-list-tile-action v-if="basemap.icon">
                                        <v-icon v-if="basemap.id === selectedId" primary medium>{{basemap.icon}}
                                        </v-icon>
                                        <v-icon v-else="basemap.id === selectedId">{{basemap.icon}}</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-action v-else>
                                        <v-icon v-if="basemap.id === selectedId" primary medium>video_label</v-icon>
                                        <v-icon v-else="basemap.id === selectedId">video_label</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content v-if="basemap.id === selectedId">
                                        <v-list-tile-title class="list__tile--active title"
                                                           v-text="basemap.title"></v-list-tile-title>
                                    </v-list-tile-content>
                                    <v-list-tile-content v-else>
                                        <v-list-tile-title v-text="basemap.title"></v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 v-if="showOperationalLayer">
                        <v-card class="elevation-6">
                            <v-card-title class="primary title">{{i18n.layers}}</v-card-title>
                            <v-list>
                                <v-list-group v-for="layer in reverseArray(layers)" v-bind:key="layer.id">
                                    <v-list-tile slot="item"
                                                 @click="">
                                        <v-list-tile-action>
                                            <v-switch
                                                    color="primary"
                                                    v-model=switchArray[layer.switchCount]
                                                    @click.native.stop=""></v-switch>
                                        </v-list-tile-action>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="layer.title"></v-list-tile-title>
                                        </v-list-tile-content>
                                        <v-list-tile-action
                                                v-if="(layer.sublayers && layer.sublayers.items) || (layer.layers && layer.layers.items)">
                                            <v-icon>keyboard_arrow_down</v-icon>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                    <div v-if="layer.sublayers && layer.sublayers.items">
                                        <v-list-tile v-for="subLayer in reverseArray(layer.sublayers.items)"
                                                     v-bind:key="subLayer.id"
                                                     @click.native.stop="">
                                            <v-list-tile-action>
                                                <v-switch
                                                        color="primary"
                                                        v-model=switchArray[subLayer.switchCount]></v-switch>
                                            </v-list-tile-action>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-text="subLayer.title"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </div>
                                    <div v-if="layer.layers && layer.layers.items">
                                        <v-list-tile v-for="subLayer in reverseArray(layer.layers.items)"
                                                     v-bind:key="subLayer.id"
                                                     @click.native.stop="">
                                            <v-list-tile-action>
                                                <v-switch
                                                        color="primary"
                                                        v-model=switchArray[subLayer.switchCount]></v-switch>
                                            </v-list-tile-action>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-text="subLayer.title"></v-list-tile-title>
                                            </v-list-tile-content>
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
                            <v-btn block
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
                switchArray: [],
                basemaps: [],
                selectedId: "",
                showBasemaps: true,
                showOperationalLayer: true,
                i18n: {
                    type: Object,
                    default: function () {
                        return {
                            basemaps: "Basemaps",
                            layers: "Operational Layer"
                        }
                    }
                }
            };
        },
        watch: {
            switchArray: function (val, oldVal) {
                let layers = this.$data.layers;
                for (let id in val) {
                    let visible = val[id];
                    let oldVisible = this.oldSwitchArray && this.oldSwitchArray[id];
                    if (visible !== oldVisible && this.oldSwitchArray) {
                        layers.forEach((layer) => {
                                if (layer.switchCount === parseInt(id)) {
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
                                        if (sublayer.switchCount === parseInt(id)) {
                                            sublayer.visible = visible;
                                            if (visible) {
                                                sublayer.parent.visible = true;
                                            }
                                        }
                                    });
                                } else if (layer.layers && layer.layers.items) {
                                    layer.layers.forEach((sublayer) => {
                                        if (sublayer.switchCount === parseInt(id)) {
                                            sublayer.visible = visible;
                                            if (visible) {
                                                sublayer.parent.visible = true;
                                            }
                                        }
                                    });
                                }
                            }
                        );
                    }
                }
                this.oldSwitchArray = val.slice(0);
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
            }
        }
    };
</script>