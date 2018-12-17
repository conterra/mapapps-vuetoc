<script>
    import ButtonAction from "./ButtonAction.vue";

    export default {
        name: "zoom-to-extent",
        extends: ButtonAction,
        props: {
            titleLabel: String,
            icon: {
                type: String,
                default: "search"
            }
        },
        methods: {
            displayActionForItem(item) {
                let displayAction = item.layer && item.layer.fullExtent;
                this.$emit("display-changed", displayAction);
                return displayAction;
            },
            onClick(item) {
                const layer = item.layer;
                let extent = layer.fullExtent;
                if (!extent) {
                    return;
                }
                item.view.goTo({target: extent}, {
                    "animate": true,
                    "duration": 1000,
                    "easing": "ease-in-out"
                });
                this.$emit('close-menu');
            }
        }
    }
</script>
