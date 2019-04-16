<template>
    <div>
        <v-divider v-if="displayAction && !lastAction"></v-divider>
        <component
            v-show="displayAction"
            :is="action"
            :item="item"
            :event-bus="bus"
            ref="actionInstance"/>
    </div>
</template>

<script>
    export default {
        props: ["action", "item", "bus", "lastAction"],
        data: function () {
            return {
                displayAction: false
            }
        },
        beforeMount: function () {
            this.bus.$on("close-menu", () => this.$emit("close-menu"));
        },
        mounted: function() {
            this.displayAction = this.$refs.actionInstance.displayAction;
        }
    };
</script>
