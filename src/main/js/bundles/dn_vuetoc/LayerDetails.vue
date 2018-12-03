
<template>
    <v-list-tile
        :disabled="!item.visibleAtCurrentScale">
        <v-list-tile-action
            @click.prevent.stop>
            <v-btn
                icon
                @click="item.visible = !item.visible">
                <v-icon>{{ visible ? visibleIconClass : invisibleIconClass }}</v-icon>
            </v-btn>
        </v-list-tile-action>
        <v-list-tile-action
            v-if="$root.showLegend && $root.getLegend(item.layer.url)"
            @click="item.visible = !item.visible">
            <img :src="$root.getLegend(item.layer.url)">
        </v-list-tile-action>
        <v-list-tile-content
            @click.prevent.stop
            @click="item.visible = !item.visible"
        >
            <v-list-tile-title v-text="item.title"/>
        </v-list-tile-content>
        <v-list-tile-action
            v-if="$root.showLayerMenu && hasLayerActions()"
            @click.prevent.stop
        >
            <v-menu
                :close-on-content-click="false"
                :close-on-click="true"
                v-model="menuOpen"
                bottom
                left
                max-width="300"
                min-width="300"
                nudge-top="-10"
                offset-y
                transition="slide-y-transition"
            >
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
        name: "layer-item",
        components: {
            "layer-menu": LayerMenu
        },
        props: [
            "item",
            "i18n",
            "customLayerActions",
            "visibleIconClass",
            "invisibleIconClass"
        ],
        data: function(){
            return {
                menuOpen: false,
                visible: this.item.visible,
                watchHandle: undefined
            }
        },
        beforeMount: function(){
            this.watchHandle = this.item.watch("visible", visible => this.visible = visible);
        },
        beforeDestroy: function(){
            this.watchHandle && this.watchHandle.remove();
        },
        methods: {
            hasLayerActions: function() {
                return this.customLayerActions.some(action =>
                    action.methods.displayActionForItem(this.item)
                );
            }
        }
    };
</script>
