<template>
    <v-list-tile
        :class="{'layer-item__not-visible': !item.visibleInContext}">
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
        <v-list-tile-action v-if="!item.visibleInContext">
            <v-tooltip right>
                <v-icon
                    slot="activator"
                    color="orange"
                >
                    warning
                </v-icon>
                <span v-html="item.visibleInContextCause" />
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
                    :item="item"
                    :bus="bus"
                    :custom-layer-actions="customLayerActions"
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
        props: ["item", "bus", "config", "customLayerActions"],
        data: () => { menuOpen: false }
    };
</script>
