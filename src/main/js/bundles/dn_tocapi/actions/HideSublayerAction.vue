<script>
    import ButtonAction from "./ButtonAction.vue";

    export default {
        name: "hide-sublayer",
        extends: ButtonAction,
        props: {
            icon: {
                type: String,
                default: "visibility_off"
            },
            titleLabel: String
        },
        methods: {
            displayActionForItem(item) {
                let displayAction = !!item.children && !!item.children.length;
                this.$emit("display-changed", displayAction);
                return displayAction;
            },
            onClick(item) {
                this.item.setForAll("visible", false);
                this.$emit('close-menu');
            }
        }
    }
</script>
