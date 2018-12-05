<template>
    <v-list-tile
        v-if="displayActionForItem(item)"
        :disabled="disableActionForItem(item)"
        @click="onClick(item)">
        <v-list-tile-action>
            <v-icon primary>{{ icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{ titleLabel }}</v-list-tile-title>
    </v-list-tile>
</template>
<script>
    export default {
        props: {
            item: Object,
            titleLabel: {
                type: String,
                default: "Action Title"
            },
            icon: {
                type: String,
                default: "settings"
            }
        },
        methods: {
            onClick(item) {
            },
            displayActionForItem(item) {
                return true;
            },
            disableActionForItem(item) {
                return false;
            }
        }
    };
</script>
