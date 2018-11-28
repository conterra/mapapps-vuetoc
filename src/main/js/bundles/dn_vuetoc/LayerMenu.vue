<template>
    <v-card
        v-if="item && item.layer"
        class="vue-toc__layer-menu">
        <v-toolbar dense>
            <v-toolbar-title>{{ item.title }}</v-toolbar-title>
            <v-spacer/>
            <v-btn
                icon
                @click="$emit('close-menu')">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-title v-if="item.layer.description">
            <div class="regular">{{ item.layer.description }}</div>
        </v-card-title>
        <v-divider/>
        <v-list>
            <div
                v-for="(action, idx) in customLayerActions"
                :key="action.name">
                <component
                    :is="action"
                    :item="item"
                    @close-menu="$emit('close-menu')"/>
                <v-divider v-if="idx < customLayerActions.length - 1"/>
            </div>
        </v-list>
        <v-divider/>
        <v-card-title v-if="item.layer.copyright">
            <div class="mb-1 grey--text caption">{{ i18n.copyright }}</div>
            <div class="grey--text caption">{{ item.layer.copyright }}</div>
        </v-card-title>
    </v-card>
</template>

<script>
    export default {
        props: ["i18n", "customLayerActions", "item"]
    };
</script>
