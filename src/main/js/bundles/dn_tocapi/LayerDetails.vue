<template>
    <v-list-tile
        :class="{'layer-item__not-visible': disabled}">
        <v-list-tile-action @click.prevent.stop>
            <v-btn
                icon
                @click="item.visible = !item.visible">
                <v-icon :class="{'success--text': item.visible}">
                    {{ item.visible ? config.visibleIconClass :
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
                    color="orange"
                >
                    warning
                </v-icon>
                <span v-html="message" />
            </v-tooltip>
        </v-list-tile-action>
        <v-list-tile-action
            v-if="item.loaded && config.showLayerMenu"
            @click.prevent.stop>
            <v-menu
                v-model="menuOpen"
                :close-on-content-click="false"
                :close-on-click="true"
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
                    @close-menu="menuOpen=false"
                />
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
            return {
                menuOpen: false,
                disabled: false,
                message: "",
                watchHandles: []
            }
        }
    };
</script>
