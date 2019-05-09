<template>
    <div>
        <v-divider v-if="displayAction && !lastAction"></v-divider>
        <component
            :is="action"
            v-show="displayAction"
            ref="actionInstance"
            :item="item"
            :event-bus="bus"
        />
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
        mounted: function () {
            this.displayAction = this.$refs.actionInstance.displayAction;
        }
    };
</script>
