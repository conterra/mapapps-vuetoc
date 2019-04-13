<script>
    import SliderAction from "./SliderAction.vue";
    export default  {
        name: "opacity",
        extends: SliderAction,
        data: function () {
            return {
                icon: "opacity",
                opacityWatchHandle: undefined
            }
        },
        beforeMount: function () {
            this.sliderValue = this.item.opacity;
            this.opacityWatchHandle = this.item.watch("opacity", value => {
                this.sliderValue = value;
            });
        },
        beforeDestroy: function () {
            this.opacityWatchHandle.remove();
        },
        methods: {
            displayActionForItem(item) {
                let displayAction = item && item.opacity !== undefined;
                this.$emit("display-changed", displayAction);
                return displayAction;
            },
            onChange(value) {
                this.item.opacity = value;
            }
        }
    }
</script>
