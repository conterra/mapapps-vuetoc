<template>
    <div>
        <v-progress-linear
            v-if="config.showLoadingStatus"
            :active="!!item.updating"
            :height="2"
            indeterminate
            class="ma-0"
        />
        <v-list-group
            v-if="item.children.length"
            v-model="item.open"
            sub-group
            prepend-icon="chevron_right"
            active-class=""
            no-action
        >
            <layer-details
                slot="activator"
                :bus="bus"
                :item="item"
                :config="config"
                :action-components="actionComponents"
            />
            <slot
                :children="item.children"
                name="sub"
            />
        </v-list-group>
        <layer-details
            v-else
            :item="item"
            :bus="bus"
            :config="config"
            :action-components="actionComponents"
            class="dn-toc__layer-tree-item--no-childs"
        />
    </div>
</template>
<script>
    import LayerDetails from "./LayerDetails.vue";

    export default {
        components: {
            "layer-details": LayerDetails
        },
        props: {
            item: {
                type: Object,
                default: function () {
                    return {};
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
    }
</script>
