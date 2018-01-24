<template>
    <v-card class="elevation-6">
        <v-toolbar class="primary title" dense>
            <v-toolbar-title>{{i18n.layers}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom left max-width="400" transition="slide-y-transition">
                <v-btn icon slot="activator" @click="$root.closeAllMenus">
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                    <v-list-tile @click="$root.setLayerVisibility(true)">
                        <v-list-tile-action>
                            <v-icon primary>visibility</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>{{i18n.activateAllLayer}}
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="$root.setLayerVisibility(false)">
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
            <v-list-group v-for="layer in $root.reverseArray($root.layers)" v-bind:key="layer.id"
                          v-bind:value=$root.layerArray[layer.layerCount].visible>
                <v-list-tile slot="item" @click="">
                    <v-list-tile-action @click.prevent.stop>
                        <v-switch
                                color="primary"
                                v-model=$root.layerArray[layer.layerCount].visible></v-switch>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="layer.title"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action @click.prevent.stop>
                        <v-menu bottom left max-width="400" transition="slide-y-transition"
                                :close-on-content-click="false" :close-on-click="true"
                                v-model="$root.layerArray[layer.layerCount].menuVisibility">
                            <v-btn icon slot="activator" @click="$root.closeAllMenus">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                            <layer-menu v-bind:i18n="i18n" v-bind:layer="layer"/>
                        </v-menu>
                    </v-list-tile-action>
                    <v-list-tile-action
                            v-if="(layer.sublayers && layer.sublayers.items) || (layer.layers && layer.layers.items)">
                        <v-icon>keyboard_arrow_down</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
                <div v-if="(layer.sublayers && layer.sublayers.items) || (layer.layers && layer.layers.items)">
                    <v-list-tile
                            v-for="subLayer in $root.reverseArray((layer.sublayers && layer.sublayers.items) || (layer.layers && layer.layers.items))"
                            v-bind:key="subLayer.id"
                            @click.prevent.stop>
                        <v-list-tile-action @click.prevent.stop>
                            <v-switch
                                    color="primary"
                                    v-model=$root.layerArray[subLayer.layerCount].visible></v-switch>
                        </v-list-tile-action>
                        <v-list-tile-action v-if="showLegend && layer.legendEnabled"
                                            @click="$root.layerArray[subLayer.layerCount].visible = !$root.layerArray[subLayer.layerCount].visible">
                            <img v-bind:src="$root.getLegend(subLayer.url, subLayer.id)"/>
                        </v-list-tile-action>
                        <v-list-tile-content
                                @click="$root.layerArray[subLayer.layerCount].visible = !$root.layerArray[subLayer.layerCount].visible">
                            <v-list-tile-title v-text="subLayer.title"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action @click.prevent.stop>
                            <v-menu bottom left max-width="400" transition="slide-y-transition"
                                    :close-on-content-click="false" :close-on-click="true"
                                    v-model="$root.layerArray[subLayer.layerCount].menuVisibility">
                                <v-btn icon slot="activator" @click="$root.closeAllMenus">
                                    <v-icon>more_vert</v-icon>
                                </v-btn>
                                <layer-menu v-bind:i18n="i18n" v-bind:layer="subLayer"/>
                            </v-menu>
                        </v-list-tile-action>
                    </v-list-tile>
                </div>
            </v-list-group>
        </v-list>
    </v-card>
</template>

<script>
    import LayerMenu from "./LayerMenu.vue";

    export default {
        components: {
            "layer-menu": LayerMenu
        },
        props: [
            "i18n"
        ]
    }
</script>