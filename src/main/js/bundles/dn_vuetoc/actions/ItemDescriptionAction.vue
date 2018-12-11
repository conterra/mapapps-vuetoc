<script>
    import ButtonAction from "dn_vuetoc/actions/ButtonAction.vue";

    export default {
        name: "item-description",
        extends: ButtonAction,
        props: {
            icon: {
                type: String,
                default: "description"
            },
            descriptionTitleLabel: {
                type: String,
                default: "Description"
            },
            isMobile: {
                type: Boolean,
                default: false
            },
            windowManager: {
                type: Object,
                default: () => {
                }
            },
            widgetSize: {
                type: Object,
                default: () => {
                }
            }
        },
        data: function () {
            let layer = this.item.layer;
            let description = layer.type === "wmts" ? layer.activeLayer.description : layer.description;
            return {
                description,
                descriptionWindow: undefined
            }
        },
        beforeDestroy: function () {
            if (this.descriptionWindow) {
                this.descriptionWindow.close();
                this.descriptionWindow = undefined;
            }
        },
        methods: {
            displayActionForItem: function (item) {
                let layer = item.layer;
                if (!item.layer) {
                    return false;
                }
                if (layer.type === "wmts") {
                    return layer.activeLayer && !!item.layer.activeLayer.description;
                }
                return !!layer.description;
            },
            onClick(item) {
                const layer = item.layer;
                let widgetSize = this.widgetSize;
                if (this.isMobile) {
                    widgetSize = {
                        w: "100%",
                        h: "100%"
                    };
                }
                let descriptionWindow = this.descriptionWindow = this.windowManager.createWindow({
                    title: this.descriptionTitleLabel + " - " + layer.title,
                    dockable: false,
                    closable: true,
                    minimizeOnClose: false,
                    maximizable: true,
                    destroyContent: false,
                    marginBox: widgetSize,
                    content: this.description,
                    windowClass: "vueTocDescriptionWindow"
                });
                descriptionWindow.show();
                this.$emit('close-menu');
            }
        }
    }
</script>
