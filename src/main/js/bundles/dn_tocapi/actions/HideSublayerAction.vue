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
                if (item.children) {
                    let allChildren = item.children.flatten((item) => item.children);
                    allChildren.forEach((child) => {
                        child.visible = false;
                    })
                }
                this.$emit('close-menu');
            }
        }
    }
</script>
