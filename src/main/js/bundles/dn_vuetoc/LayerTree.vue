<template>
    <div class="vue-toc__layer-tree">
        <v-list v-for="item in items"
                :key="item.uid" class="pa-0">
            <v-progress-linear v-if="$root.showLoadingStatus && $root.renderProgressBars" :active="item.updating"
                               :indeterminate="item.updating" :height="2" class="ma-0"></v-progress-linear>
            <v-list-group v-if="item.children.length" no-action v-model="item.open">
                <v-list-tile slot="activator" :key="item.uid" :disabled="!item.visibleAtCurrentScale">
                    <v-list-tile-action @click.prevent.stop>
                        <v-btn icon @click="item.visible = !item.visible; $root.rerender()">
                            <v-icon v-if="item.visible">{{visibleIconClass}}</v-icon>
                            <v-icon v-else>{{invisibleIconClass}}</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-content @click.prevent.stop
                                         @click="item.visible = !item.visible; $root.rerender()">
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action v-if="$root.showLayerMenu" @click.prevent.stop>
                        <v-menu bottom left max-width="300" offset-y="10" transition="slide-y-transition"
                                :close-on-content-click="false" :close-on-click="true"
                                v-model="item.menuVisibility">
                            <v-btn icon slot="activator">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                            <layer-menu :i18n="i18n" :item="item"/>
                        </v-menu>
                    </v-list-tile-action>
                </v-list-tile>
                <layer-tree :i18n="i18n" :visibleIconClass="visibleIconClass"
                            :invisibleIconClass="invisibleIconClass" :items="item.children.items">
                </layer-tree>
            </v-list-group>
            <v-list-group v-else no-action append-icon="">
                <v-list-tile slot="activator" :disabled="!item.visibleAtCurrentScale">
                    <v-list-tile-action @click.prevent.stop>
                        <v-btn icon @click="item.visible = !item.visible; $root.rerender()">
                            <v-icon v-if="item.visible">{{visibleIconClass}}</v-icon>
                            <v-icon v-else>{{invisibleIconClass}}</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action
                        v-if="$root.showLegend && $root.getLegend(item.layer.url)"
                        @click="item.visible = !item.visible; $root.rerender()">
                        <img :src="$root.getLegend(item.layer.url)"/>
                    </v-list-tile-action>
                    <v-list-tile-content @click.prevent.stop
                                         @click="item.visible = !item.visible; $root.rerender()">
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action v-if="$root.showLayerMenu" @click.prevent.stop>
                        <v-menu bottom left max-width="300" offset-y="10" transition="slide-y-transition"
                                :close-on-content-click="false" :close-on-click="true"
                                v-model="item.menuVisibility">
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
</template>
<script>
    import LayerMenu from "./LayerMenu.vue";

    export default {
        name: "layer-tree",
        components: {
            "layer-menu": LayerMenu
        },
        props: [
            "i18n",
            "items",
            "visibleIconClass",
            "invisibleIconClass"
        ]
    }
</script>
