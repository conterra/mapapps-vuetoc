<script>
    import ButtonAction from "./ButtonAction.vue";
    export default  {
        name: "zoom-to-extent",
        extends: ButtonAction,
        props: {
            fromLabel: String,
            toLabel: String,
            titleLabel: String,
            icon: {
                type: String,
                default: "search"
            }
        },
        methods: {
            displayActionForItem(item) {
                return item.layer && item.layer.fullExtent;
            },
            onClick(item) {
                const layer = item.layer;
                let extent = layer.fullExtent;
                if (!extent) {
                    return;
                }
                item.view.goTo({ target: extent }, {
                    "animate": true,
                    "duration": 1000,
                    "easing": "ease-in-out"
                });
                this.$emit('close-menu');
            }
        }
    }
</script>
