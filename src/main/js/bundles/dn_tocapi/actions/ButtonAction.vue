<template>
    <v-list-tile
        :disabled="disableAction"
        @click="onClick()">
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
            eventBus: Object,
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
                displayAction: true,
                disableAction: this.disableActionForItem(this.item)
            }
        },
        methods: {
            onClick() {
            },
            disableActionForItem(item) {
                return false;
            }
        }
    };
</script>
