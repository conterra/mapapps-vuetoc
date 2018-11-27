<template>
    <div class="vue-toc__layer-tree">
        <v-list
            v-for="item in items"
            :key="item.uid"
            class="pa-0">
            <v-progress-linear
                v-if="$root.showLoadingStatus && $root.renderProgressBars"
                :active="item.updating"
                :indeterminate="item.updating"
                :height="2"
                class="ma-0"
            />
            <v-list-group
                v-if="item.children.length"
                v-model="item.open"
                no-action>
                <layer-item
                    slot="activator"
                    :item="item"
                    :custom-layer-actions="customLayerActions"
                    :i18n="i18n"
                    :visible-icon-class="visibleIconClass"
                    :invisible-icon-class="invisibleIconClass"
                />
                <layer-tree
                    :i18n="i18n"
                    :custom-layer-actions="customLayerActions"
                    :visible-icon-class="visibleIconClass"
                    :invisible-icon-class="invisibleIconClass"
                    :items="item.children.items"
                />
            </v-list-group>
            <layer-item
                v-else
                :item="item"
                :custom-layer-actions="customLayerActions"
                :i18n="i18n"
                :visible-icon-class="visibleIconClass"
                :invisible-icon-class="invisibleIconClass"
            />
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
            "visibleIconClass",
            "invisibleIconClass"
        ]
    };
</script>
