<template>
    <div class="vue-toc__layer-tree">
        <v-list
            v-for="item in items"
            :key="item.uid"
            class="pa-0">
            <layer-item
                :i18n="i18n"
                :item="item"
                :config="config"
                :custom-layer-actions="customLayerActions">
                <layer-tree
                    slot="sub"
                    slot-scope="itemProps"
                    :i18n="i18n"
                    :config="config"
                    :custom-layer-actions="customLayerActions"
                    :items="itemProps.children"/>
            </layer-item>
        </v-list>
    </div>
</template>
<script>
    import LayerItem from "./LayerItem.vue";

    export default {
        name: "layer-tree",
        components: {
            "layer-item": LayerItem
        },
        props: [
            "i18n",
            "customLayerActions",
            "items",
            "config"
        ]
    };
</script>
