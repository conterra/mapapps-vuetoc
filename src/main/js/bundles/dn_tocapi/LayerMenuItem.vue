<template>
    <div>
        <v-divider v-if="displayDivider && !lastAction"></v-divider>
        <component
            :is="action"
            :item="item"
            :event-bus="bus"
            @display-changed="(displayAction)=>this.displayDivider=displayAction"/>
    </div>
</template>

<script>
    export default {
        props: ["action", "item", "bus", "lastAction"],
        data: function () {
            return {
                displayDivider: true,
                watchHandle: []
            }
        },
        beforeMount: function () {
            this.bus.$on("close-menu", () => this.$emit("close-menu"));
        },
        beforeDestroy: function () {
            this.$off("display-changed");
        }
    };
</script>
