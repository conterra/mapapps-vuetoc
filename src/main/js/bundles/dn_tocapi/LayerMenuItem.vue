<template>
    <div>
        <v-divider v-if="displayAction && !lastAction" />
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
        props: {
            item: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            action: {
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
            lastAction: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
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
