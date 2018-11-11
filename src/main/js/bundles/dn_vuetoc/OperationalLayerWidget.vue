<template>
    <v-card class="elevation-6" v-if="$root.renderComponent">
        <v-toolbar class="primary title mb-1" dense>
            <v-toolbar-title>{{i18n.layers}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom left max-width="300" offset-y="10" transition="slide-y-transition">
                <v-btn icon slot="activator">
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                    <v-list-tile @click="$root.enableAllLayers(true)">
                        <v-list-tile-action>
                            <v-icon primary>{{visibleIconClass}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>{{i18n.activateAllLayer}}
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="$root.enableAllLayers(false)">
                        <v-list-tile-action>
                            <v-icon primary>{{invisibleIconClass}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>{{i18n.deactivateAllLayer}}
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <div v-if="$root.operationalItems">
            <v-list v-for="item in $root.reverseArray($root.operationalItems.toArray())"
                    :key="item.uid" class="pa-0">
                <v-progress-linear v-if="$root.showLoadingStatus" :active="item.updating" :indeterminate="item.updating"
                                   :height="1" class="ma-0"></v-progress-linear>
                <v-list-group v-if="item.children.length"
                              no-action v-model=item.open>
                    <v-list-tile slot="activator" :key="item.uid" :disabled="!item.visibleAtCurrentScale">
                        <v-list-tile-action @click.prevent.stop>
                            <v-btn icon @click="item.visible = !item.visible; $root.rerender()">
                                <v-icon v-if="!item.visibleAtCurrentScale">{{invisibleIconClass}}</v-icon>
                                <v-icon v-else-if="item.visible">{{visibleIconClass}}</v-icon>
                                <v-icon v-else="item.visible">{{invisibleIconClass}}</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-content
                            @click.prevent.stop
                            @click="item.visible = !item.visible; $root.rerender()">
                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action @click.prevent.stop>
                            <v-menu bottom left max-width="300" offset-y="10" transition="slide-y-transition"
                                    :close-on-content-click="false" :close-on-click="true">
                                <v-btn icon slot="activator">
                                    <v-icon>more_vert</v-icon>
                                </v-btn>
                                <layer-menu :i18n="i18n" :item="item"/>
                            </v-menu>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile
                        v-for="children in $root.reverseArray(item.children.toArray())"
                        :disabled="!children.visibleAtCurrentScale"
                        :key="children.uid"
                        @click.prevent.stop>
                        <v-list-tile-action @click.prevent.stop>
                            <v-btn icon @click="children.visible = !children.visible; $root.rerender()">
                                <v-icon v-if="!children.visibleAtCurrentScale">{{invisibleIconClass}}</v-icon>
                                <v-icon v-else-if="children.visible">{{visibleIconClass}}</v-icon>
                                <v-icon v-else="children.visible">{{invisibleIconClass}}</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-action
                            v-if="$root.showLegend && $root.getLegend(children.layer.url, children.layer.id)"
                            @click="children.visible = !children.visible; $root.rerender()">
                            <img :src="$root.getLegend(children.layer.url, children.layer.id)"/>
                        </v-list-tile-action>
                        <v-list-tile-content
                            @click="children.visible = !children.visible; $root.rerender()">
                            <v-list-tile-title v-text="children.title"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action @click.prevent.stop>
                            <v-menu bottom left max-width="300" offset-y="10" transition="slide-y-transition"
                                    :close-on-content-click="false" :close-on-click="true">
                                <v-btn icon slot="activator">
                                    <v-icon>more_vert</v-icon>
                                </v-btn>
                                <layer-menu :i18n="i18n" :item="children"/>
                            </v-menu>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-group>
                <v-list-group v-else no-action append-icon="">
                    <v-list-tile slot="activator"
                                 :disabled="!item.visibleAtCurrentScale">
                        <v-list-tile-action @click.prevent.stop>
                            <v-btn icon @click="item.visible = !item.visible; $root.rerender()">
                                <v-icon v-if="!item.visibleAtCurrentScale">{{invisibleIconClass}}</v-icon>
                                <v-icon v-else-if="item.visible">{{visibleIconClass}}</v-icon>
                                <v-icon v-else="item.visible">{{invisibleIconClass}}</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-content
                            @click.prevent.stop
                            @click="item.visible = !item.visible; $root.rerender()">
                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action @click.prevent.stop>
                            <v-menu bottom left max-width="300" offset-y="10" transition="slide-y-transition"
                                    :close-on-content-click="false" :close-on-click="true">
                                <v-btn icon slot="activator">
                                    <v-icon>more_vert</v-icon>
                                </v-btn>
                                <layer-menu :i18n="i18n" :item="item"/>
                            </v-menu>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-group>
            </v-list>
        </div>
    </v-card>
</template>
<script>
    import LayerMenu from "./LayerMenu.vue";

    export default {
        components: {
            "layer-menu": LayerMenu
        },
        props: [
            "i18n",
            "visibleIconClass",
            "invisibleIconClass"
        ]
    }
</script>
