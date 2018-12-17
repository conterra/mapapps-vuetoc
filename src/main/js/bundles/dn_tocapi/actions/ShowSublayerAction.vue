<script>
    import ButtonAction from "./ButtonAction.vue";

    export default {
        name: "show-sublayer",
        extends: ButtonAction,
        props: {
            icon: {
                type: String,
                default: "visibility"
            },
            titleLabel: String
        },
        methods: {
            displayActionForItem(item) {
                let displayAction = item.children && item.children.length;
                this.$emit("display-changed", displayAction);
                return displayAction;
            },
            onClick(item) {
                if (item.children) {
                    let allChildren = item.children.flatten((item) => item.children);
                    allChildren.forEach((child) => {
                        child.visible = true;
                    })
                }
                this.$emit('close-menu');
            }
        }
    }
</script>
