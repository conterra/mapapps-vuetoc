<script>
    import SliderAction from "./SliderAction.vue";
    export default  {
        name: "opacity",
        extends: SliderAction,
        data: function () {
            return {
                icon: "opacity",
                watchHandles: []
            }
        },
        beforeMount: function () {
            this.sliderValue = this.item.opacity;
            this.watchHandles.push(this.item.watch("opacity", value => {
                this.sliderValue = value;
            }));
            this.watchHandles.push(this.eventBus.$on("reset", this.onReset));
        },
        beforeDestroy: function () {
            this.watchHandles.forEach(handle => handle.remove());
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
