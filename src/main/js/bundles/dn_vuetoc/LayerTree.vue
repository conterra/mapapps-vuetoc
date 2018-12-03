<template>
    <div class="vue-toc__layer-tree">
        <v-list
            v-for="item in items"
            :key="item.uid"
            class="pa-0">
            <node-layer
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
            </node-layer>
            <leaf-layer
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
            </leaf-layer>
        </v-list>
    </div>
</template>
<script>
    import LayerDetails from "./LayerDetails.vue";
    import NodeLayer from "./NodeLayer.vue";
    import LeafLayer from './LeafLayer.vue';

    export default {
        name: "layer-tree",
        components: {
            "node-layer": NodeLayer,
            "leaf-layer": LeafLayer,
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
