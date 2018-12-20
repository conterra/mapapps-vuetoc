<template>
    <v-list-tile
        :class="{'layer-item__not-visible': disabled}">
        <v-list-tile-action
            @click.prevent.stop>
            <v-btn
                icon
                @click="item.visible = !item.visible">
                <v-icon :class="{'success--text': visible}">{{ visible ? config.visibleIconClass :
                    config.invisibleIconClass }}
                </v-icon>
            </v-btn>
        </v-list-tile-action>
        <v-list-tile-content
            @click.prevent.stop
            @click="item.visible = !item.visible">
            <v-list-tile-title
                v-text="item.title"/>
        </v-list-tile-content>
        <v-list-tile-action v-if="message">
            <v-tooltip right>
                <v-icon
                    slot="activator"
                    color="orange">warning
                </v-icon>
                <span v-html="message"/>
            </v-tooltip>
        </v-list-tile-action>
        <v-list-tile-action
            v-if="loaded && config.showLayerMenu"
            @click.prevent.stop>
            <v-menu
                :close-on-content-click="false"
                :close-on-click="true"
                v-model="menuOpen"
                bottom
                left
                max-width="300"
                min-width="300"
                nudge-top="42"
                nudge-right="4"
                offset-y
                transition="slide-y-transition"
                content-class="dn-toc__item-menu">
                <v-btn
                    slot="activator"
                    icon>
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <layer-menu
                    :i18n="i18n"
                    :custom-layer-actions="customLayerActions"
                    :item="item"
                    @close-menu="menuOpen=false"/>
            </v-menu>
        </v-list-tile-action>
    </v-list-tile>
</template>
<script>
    import LayerMenu from "./LayerMenu.vue";

    export default {
        name: "layer-details",
        components: {
            "layer-menu": LayerMenu
        },
        props: [
            "bus",
            "item",
            "i18n",
            "config",
            "customLayerActions"
        ],
        data: function () {
            let item = this.item;
            let layer = item.layer;
            let loaded = layer.loaded === undefined ? true : layer.loaded;
            let visible = item.visible;
            let initialVisible = item.initialVisible;
            let initialOpacity = item.initialOpacity;
            return {
                menuOpen: false,
                loaded,
                visible,
                disabled: false,
                message: "",
                initialVisible: initialVisible,
                initialOpacity: initialOpacity,
                watchHandles: []
            }
        },
        beforeMount: function () {
            this.watchHandles.push(this.item.watch("visible", visible => this.visible = visible));
            this.watchHandles.push(this.item.layer.watch("loaded", loaded => this.loaded = loaded));
            this.bus.$on('reset', this.reset);
            let layerVisibilityService = this.bus.layerVisibilityService;
            if (layerVisibilityService) {
                layerVisibilityService.subscribe(this.item.layer, ({visible, message}) => {
                    this.disabled = !visible;
                    this.message = message;
                });
            } else {
                this.watchHandles.push(this.item.watch("visibleAtCurrentScale", visible => {
                    this.disabled = !visible;
                    this.message = visible ? undefined : this.i18n.scaleErrorMsg;
                }));
            }
        },
        beforeDestroy: function () {
            this.watchHandles.forEach(handle => handle.remove());
            this.bus.$off('reset', this.reset);
            let layerVisibilityService = this.bus.layerVisibilityService;
            if (layerVisibilityService) {
                layerVisibilityService.unsubscribe(this.item.layer);
            }
        },
        methods: {
            reset: function () {
                this.visible = this.item.visible = this.initialVisible;
                this.item.layer.opacity = this.initialOpacity;
            }
        }
    };
</script>
