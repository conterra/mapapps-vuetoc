<script>
    import ButtonAction from "./ButtonAction.vue";

    export default {
        name: "item-description",
        extends: ButtonAction,
        props: {
            icon: {
                type: String,
                default: "info"
            }
        },
        beforeDestroy: function () {
            this.eventBus.$emit("close-description");
        },
        methods: {
            displayActionForItem: function (item) {
                let displayAction = !!item && !!item.description;
                this.$emit("display-changed", displayAction);
                return displayAction;
            },
            onClick(item) {
                this.eventBus.$emit("show-description", item);
                this.$emit('close-menu');
            }
        }
    }
</script>
