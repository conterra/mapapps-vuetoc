<template>
    <v-list-tile
        v-if="displayAction"
        :disabled="disableAction"
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
        data: function () {
            return {
                displayAction: this.displayActionForItem(this.item),
                disableAction: this.disableActionForItem(this.item)
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
