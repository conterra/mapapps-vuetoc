
<template>
    <v-card class="elevation-6">
        <v-toolbar
            class="primary title mb-1 dn-toc_layer-tree-title"
            dense>
            <v-toolbar-title>{{ i18n.layers }}</v-toolbar-title>
            <v-spacer/>
            <v-menu
                v-if="config.showOperationalLayerHeaderMenu"
                bottom
                left
                max-width="300"
                nudge-top="5"
                nudge-right="7"
                transition="slide-y-transition"
                content-class="dn-toc__item-menu">
                <v-btn
                    slot="activator"
                    icon>
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <v-card>
                    <v-toolbar
                        dense
                        card>
                        <v-toolbar-title>{{ i18n.operationalLayerOptions }}</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon>
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-list>
                        <v-divider/>
                        <v-list-tile @click="operationalItems.setForAll('visible', true)">
                            <v-list-tile-action>
                                <v-icon primary>visibility</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-title>{{ i18n.showAllLayer }}</v-list-tile-title>
                        </v-list-tile>
                        <v-divider/>
                        <v-list-tile @click="operationalItems.setForAll('visible', false)">
                            <v-list-tile-action>
                                <v-icon primary>visibility_off</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-title>{{ i18n.hideAllLayer }}</v-list-tile-title>
                        </v-list-tile>
                        <v-divider/>
                        <v-list-tile @click="operationalItems.setForAll('open', true)">
                            <v-list-tile-action>
                                <v-icon primary>unfold_more</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-title>{{ i18n.openAllLayer }}</v-list-tile-title>
                        </v-list-tile>
                        <v-divider/>
                        <v-list-tile @click="operationalItems.setForAll('open', false)">
                            <v-list-tile-action>
                                <v-icon primary>unfold_less</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-title>{{ i18n.closeAllLayer }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-menu>
        </v-toolbar>
        <div v-if="operationalItems">
            <layer-tree
                :bus="bus"
                :config="config"
                :action-components="actionComponents"
                :items="operationalItems.collection"/>
        </div>
    </v-card>
</template>
<script>
    import LayerTree from "./LayerTree.vue";

    export default {
        components: {
            "layer-tree": LayerTree
        },
        props: ["i18n", "bus", "config", "operationalItems", "actionComponents"]
    }
</script>
