<template>
    <div class="vue-toc__layer-tree">
        <v-list
            v-for="item in items"
            :key="item.uid"
            class="pa-0">
            <layer-node
                v-if="item.children.length"
                :item="item"
                :i18n="i18n"
                :config="config">
                <layer-details
                    slot="header"
                    :item="item"
                    :i18n="i18n"
                    :config="config"
                    :custom-layer-actions="customLayerActions"
                />
                <layer-tree
                    slot="tree"
                    :i18n="i18n"
                    :config="config"
                    :items="item.children.items"
                    :custom-layer-actions="customLayerActions"
                />
            </layer-node>
            <layer-leaf
                v-else
                :item="item"
                :i18n="i18n"
                :config="config">
                <layer-details
                    :item="item"
                    :i18n="i18n"
                    :config="config"
                    :custom-layer-actions="customLayerActions"
                />
            </layer-leaf>
        </v-list>
    </div>
</template>
<script>
    import LayerDetails from "./LayerDetails.vue";
    import LayerNode from "./LayerNode.vue";
    import LayerLeaf from './LayerLeaf.vue';

    export default {
        name: "layer-tree",
        components: {
            "layer-node": LayerNode,
            "layer-leaf": LayerLeaf,
            "layer-details": LayerDetails
        },
        props: [
            "i18n",
            "customLayerActions",
            "items",
            "config"
        ]
    };
</script>
