<template>
    <v-card
        v-if="item && item.layer"
        class="dn-toc__layer-menu">
        <v-toolbar
            dense
            card>
            <v-toolbar-title>{{ item.title }}</v-toolbar-title>
            <v-spacer/>
            <v-btn
                icon
                @click="$emit('close-menu')">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list>
            <layer-menu-item v-for="(action, index) in customLayerActions"
                             :key="action.name"
                             :action="action"
                             :lastAction="index >= customLayerActions.length - 1"
                             :item="item"/>
        </v-list>
    </v-card>
</template>

<script>
    import LayerMenuItem from "./LayerMenuItem.vue";

    export default {
        components: {
            "layer-menu-item": LayerMenuItem
        },
        props: ["i18n", "customLayerActions", "item"]
    };
</script>
