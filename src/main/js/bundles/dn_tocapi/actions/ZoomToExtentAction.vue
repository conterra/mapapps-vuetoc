<script>
    import ButtonAction from "./ButtonAction.vue";
    import when from "apprt-core/when";

    const defaultExtent = '{"spatialReference":{"wkid":4326},"xmin":-180,"ymin":-90,"xmax":180,"ymax":90}';

    const isDefaultExtent = extent => JSON.stringify(extent.toJSON()) === defaultExtent

    export default {
        name: "zoom-to-extent",
        extends: ButtonAction,
        props: {
            titleLabel: String,
            icon: {
                type: String,
                default: "search"
            },
            coordinateTransformer: {
                type: Object,
                default: () => {}
            }
        },
        methods: {
            displayActionForItem(item) {
                let layer = item.layer;
                let displayAction = layer && layer.fullExtent && !isDefaultExtent(layer.fullExtent);
                this.$emit("display-changed", displayAction);
                return displayAction;
            },
            onClick(item) {
                const layer = item.layer;
                let extent = layer.fullExtent;
                if (!extent) {
                    return;
                }
                let view = item.view;
                const targetWkid = view.spatialReference.wkid;
                when(this.coordinateTransformer.transform(extent, targetWkid))
                    .then(targetExtent => {
                        view.goTo({target: targetExtent}, {
                            "animate": true,
                            "duration": 1000,
                            "easing": "ease-in-out"
                        });
                });
                this.$emit('close-menu');
            }
        }
    }
</script>
