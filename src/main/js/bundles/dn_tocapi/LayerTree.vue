<template>
    <div class="dn-toc__layer-tree">
        <v-list
            v-for="item in items"
            :key="item.uid"
            class="pa-0"
        >
            <layer-item
                :bus="bus"
                :item="item"
                :config="config"
                :action-components="actionComponents"
            >
                <layer-tree
                    slot="sub"
                    slot-scope="itemProps"
                    :bus="bus"
                    :config="config"
                    :items="itemProps.children"
                    :action-components="actionComponents"
                />
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
        props: {
            items: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            bus: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            config: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            actionComponents: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        }
    };
</script>
