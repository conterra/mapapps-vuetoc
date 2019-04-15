<script>
    import ButtonAction from "./ButtonAction.vue";

    const defaultExtent = '{"spatialReference":{"wkid":4326},"xmin":-180,"ymin":-90,"xmax":180,"ymax":90}';

    const isDefaultExtent = extent => JSON.stringify(extent) === defaultExtent

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
                let displayAction = !!item.fullExtent && !isDefaultExtent(item.fullExtent);
                this.$emit("display-changed", displayAction);
                return displayAction;
            },
            onClick(item) {
                let extent = item.fullExtent;
                if (!extent) {
                    return;
                }
                this.eventBus.$emit("zoom-to-extent", extent);
                this.$emit('close-menu');
            }
        }
    }
</script>
