<template>
    <div>
        <v-divider v-if="displayDivider && !lastAction"></v-divider>
        <component
            :is="action"
            :item="item"
            :event-bus="bus"
            @close-menu="$emit('close-menu')"
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
            this.watchHandle.push(this.$on("display-changed", displayAction => this.displayDivider = displayAction));
        },
        beforeDestroy: function () {
            this.watchHandle.forEach(handle => handle.remove);
        }
    };
</script>
