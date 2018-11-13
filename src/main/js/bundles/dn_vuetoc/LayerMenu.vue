<template>
    <v-card v-if="item && item.layer" class="vue-toc__layer-menu">
        <v-card-title v-if="item.layer.description">
            <div class="regular">{{item.layer.description}}</div>
        </v-card-title>
        <v-divider></v-divider>
        <v-list>
            <v-list-tile @click="$root.zoomToExtent(item)">
                <v-list-tile-action>
                    <v-icon primary>search</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>{{i18n.zoomToExtent}}</v-list-tile-title>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-group no-action v-if="$root.getOpacityValue(item)">
                <v-list-tile slot="activator">
                    <v-list-tile-action>
                        <v-icon primary>opacity</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>{{i18n.opacity}}</v-list-tile-title>
                </v-list-tile>
                <v-list-tile class="vue-toc__opacity">
                    {{i18n.invisible}}
                    <v-slider v-model="$root.getOpacityValue(item).opacity"
                              hide-details :max="1" step="0.01" @input="$root.onOpacitySliderChange(item, $event)">
                    </v-slider>
                    {{i18n.visible}}
                </v-list-tile>
            </v-list-group>
        </v-list>
        <v-divider></v-divider>
        <v-card-title v-if="item.layer.copyright">
            <div class="mb-1 grey--text caption">{{i18n.copyright}}</div>
            <div class="grey--text caption">{{item.layer.copyright}}</div>
        </v-card-title>
    </v-card>
</template>

<script>
    export default {
        props: [
            "i18n",
            "item"
        ]
    }
</script>
