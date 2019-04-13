<template>
    <div class="dn-toc__layer-tree">
        <v-list
            v-for="item in items"
            :key="item.uid"
            class="pa-0">
            <layer-item
                :bus="bus"
                :item="item"
                :config="config"
                :custom-layer-actions="customLayerActions">
                <layer-tree
                    slot="sub"
                    slot-scope="itemProps"
                    :bus="bus"
                    :config="config"
                    :items="itemProps.children"
                    :custom-layer-actions="customLayerActions"/>
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
        props: ["items", "bus", "config", "customLayerActions"]
    };
</script>
