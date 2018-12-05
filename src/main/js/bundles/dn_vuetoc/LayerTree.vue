<template>
    <div class="vue-toc__layer-tree">
        <v-list
            v-for="item in items"
            :key="item.uid"
            class="pa-0">
            <layer-node
                v-if="item.children.length"
                :item="item"
                :i18n="i18n">
                <layer-details
                    slot="header"
                    :item="item"
                    :custom-layer-actions="customLayerActions"
                    :i18n="i18n"
                    :visible-icon-class="visibleIconClass"
                    :invisible-icon-class="invisibleIconClass"
                />
                <layer-tree
                    slot="tree"
                    :i18n="i18n"
                    :custom-layer-actions="customLayerActions"
                    :visible-icon-class="visibleIconClass"
                    :invisible-icon-class="invisibleIconClass"
                    :items="item.children.items"
                />
            </layer-node>
            <layer-leaf
                v-else
                :item="item"
                :i18n="i18n">
                <layer-details
                    :item="item"
                    :custom-layer-actions="customLayerActions"
                    :i18n="i18n"
                    :visible-icon-class="visibleIconClass"
                    :invisible-icon-class="invisibleIconClass"
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
            "visibleIconClass",
            "invisibleIconClass"
        ]
    };
</script>
