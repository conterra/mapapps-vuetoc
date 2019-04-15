<template>
    <v-card
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
            <layer-menu-item
                v-for="(action, index) in actionComponents"
                :item="item"
                :bus="bus"
                :key="action.name"
                :action="action"
                :last-action="index >= actionComponents.length - 1"
                @close-menu="$emit('close-menu')"/>
        </v-list>
    </v-card>
</template>

<script>
    import LayerMenuItem from "./LayerMenuItem.vue";

    export default {
        components: {
            "layer-menu-item": LayerMenuItem
        },
        props: ["item", "bus", "actionComponents"]
    };
</script>
