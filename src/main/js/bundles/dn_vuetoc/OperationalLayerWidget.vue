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
                            <v-icon primary>visibility</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>{{i18n.activateAllLayer}}
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="$root.enableAllLayers(false)">
                        <v-list-tile-action>
                            <v-icon primary>visibility_off</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>{{i18n.deactivateAllLayer}}
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <div v-if="$root.operationalItems">
            <layer-tree :i18n="i18n" :visibleIconClass="visibleIconClass"
                        :invisibleIconClass="invisibleIconClass" :items="$root.operationalItems.items">
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
            "visibleIconClass",
            "invisibleIconClass"
        ]
    }
</script>
