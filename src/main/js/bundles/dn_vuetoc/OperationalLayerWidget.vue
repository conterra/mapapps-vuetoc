<template>
    <v-card class="elevation-6">
        <v-toolbar class="primary title mb-1" dense>
            <v-toolbar-title>{{i18n.layers}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu v-if="showOperationalLayerHeaderMenu"
                    bottom
                    left
                    max-width="300"
                    nudge-top="-10"
                    offset-y
                    transition="slide-y-transition">
                <v-btn icon
                       slot="activator">
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                    <v-list-tile @click="$root.$emit('enableAllLayer', true)">
                        <v-list-tile-action>
                            <v-icon primary>visibility</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>{{i18n.showAllLayer}}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="$root.$emit('enableAllLayer', false)">
                        <v-list-tile-action>
                            <v-icon primary>visibility_off</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>{{i18n.hideAllLayer}}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="$root.$emit('openAllLayer', true)">
                        <v-list-tile-action>
                            <v-icon primary>unfold_more</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>{{i18n.openAllLayer}}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="$root.$emit('openAllLayer', false)">
                        <v-list-tile-action>
                            <v-icon primary>unfold_less</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>{{i18n.closeAllLayer}}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <div v-if="operationalItems">
            <layer-tree :i18n="i18n"
                        :visibleIconClass="visibleIconClass"
                        :invisibleIconClass="invisibleIconClass"
                        :customLayerTools="customLayerTools"
                        :items="operationalItems.items">
            </layer-tree>
        </div>
    </v-card>
</template>
<script>
    import LayerTree from "./LayerTree.vue";

    export default {
        components: {
            "layer-tree": LayerTree
        },
        props: [
            "i18n",
            "operationalItems",
            "customLayerTools",
            "visibleIconClass",
            "invisibleIconClass",
            "showOperationalLayerHeaderMenu"
        ]
    }
</script>
