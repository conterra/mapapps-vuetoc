<template>
    <v-card v-if="item && item.layer">
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
        </v-list>
        <v-divider></v-divider>
        <v-card-text v-if="$root.getOpacityValue(item)">{{i18n.opacity}}
            <v-slider v-model="$root.getOpacityValue(item).opacity"
                      prepend-icon="opacity" thumb-label hide-details :max="1"
                      step="0.1" @input="$root.onOpacitySliderChange(item, $event)">
            </v-slider>
        </v-card-text>
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
