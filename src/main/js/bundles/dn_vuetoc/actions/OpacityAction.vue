<script>
    import SliderAction from "./SliderAction.vue";
    export default  {
        name: "opacity",
        extends: SliderAction,
        props: ["fromLabel", "toLabel", "titleLabel"],
        data: function () {
            return {
                icon: "opacity",
                opacityWatchHandle: undefined
            }
        },
        beforeMount: function () {
            this.opacityWatchHandle = this.item.layer.watch("opacity", value => {
                this.sliderValue = value;
            });
        },
        beforeDestroy: function () {
            this.opacityWatchHandle.remove();
        },
        methods: {
            displayActionForItem(item) {
                return item.layer && item.layer.type !== "group" && item.layer.opacity !== undefined;
            },
            onChange(value) {
                this.item.layer.opacity = value;
            }
        }
    }
</script>
