<script>
    import SliderAction from "./SliderAction.vue";
    export default  {
        name: "opacity",
        extends: SliderAction,
        data: function () {
            return {
                icon: "opacity",
                watchHandle: []
            }
        },
        beforeMount: function () {
            this.sliderValue = this.item.opacity;
            this.watchHandle = this.item.watch("opacity", value => {
                this.sliderValue = value;
            });
            this.eventBus.$on("reset", this.onReset);
        },
        beforeDestroy: function () {
            this.watchHandle.remove();
            this.eventBus.$off("reset", this.onReset);
        },
        methods: {
            displayActionForItem(item) {
                let displayAction = item.opacity !== undefined;
                this.$emit("display-changed", displayAction);
                return displayAction;
            },
            onChange(value) {
                this.item.opacity = value;
            },
            onReset(){
                this.item.opacity = this.item.initialOpacity;
            }
        }
    }
</script>
