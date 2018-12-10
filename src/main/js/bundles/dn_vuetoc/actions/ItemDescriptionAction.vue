<script>
    import ButtonAction from "dn_vuetoc/actions/ButtonAction.vue";
    export default  {
        name: "item-description",
        extends: ButtonAction,
        props: {
            icon: {
                type: String,
                default: "description"
            },
            descriptionTitleLable: {
                type: String,
                default: "Description"
            },
            windowManager: {
                type: Object,
                default: () => {}
            },
            titleLable: String
        },
        data: function () {
            return {
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
                return !!item.layer && !!item.layer.description;
            },
            onClick(item) {
                const layer = item.layer;
                let descriptionWindow = this.descriptionWindow = this.windowManager.createWindow({
                    title: this.descriptionTitleLable + " - " + layer.title,
                    dockable: false,
                    closable: true,
                    minimizeOnClose: false,
                    maximizable: true,
                    destroyContent: false,
                    marginBox: {
                        w: 300,
                        h: 500
                    },
                    content: layer.description,
                    windowClass: "vuetocLegendWindow"
                });
                descriptionWindow.show();
                this.$emit('close-menu');
            }
        }
    }
</script>
