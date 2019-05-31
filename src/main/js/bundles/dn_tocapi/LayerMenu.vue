<template>
    <v-card
        class="dn-toc__layer-menu"
    >
        <v-toolbar
            dense
            card
        >
            <v-toolbar-title>{{ item.title }}</v-toolbar-title>
            <v-spacer />
            <v-btn
                icon
                @click="$emit('close-menu')"
            >
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list>
            <layer-menu-item
                v-for="(action, index) in actionComponents"
                :key="action.name"
                :item="item"
                :bus="bus"
                :action="action"
                :last-action="index >= actionComponents.length - 1"
                @close-menu="$emit('close-menu')"
            />
        </v-list>
    </v-card>
</template>

<script>
    import LayerMenuItem from "./LayerMenuItem.vue";

    export default {
        components: {
            "layer-menu-item": LayerMenuItem
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
            actionComponents: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        }
    };
</script>
