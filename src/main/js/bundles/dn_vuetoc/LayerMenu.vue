<template>
    <v-card>
        <v-toolbar dense>
            <v-toolbar-title>{{layer.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon
                   @click="$root.layerArray[layer.layerCount].menuVisibility=false">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-title v-if="layer.description">
            <div class="regular">{{layer.description}}</div>
        </v-card-title>
        <v-divider></v-divider>
        <v-list>
            <v-list-tile @click="$root.zoomToExtent(layer)">
                <v-list-tile-action>
                    <v-icon primary>search</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>{{i18n.zoomToExtent}}</v-list-tile-title>
            </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-card-text>{{i18n.opacity}}
            <v-slider v-model="$root.layerArray[layer.layerCount].opacity"
                      prepend-icon="opacity"
                      thumb-label v-bind:min="0" v-bind:max="1"
                      v-bind:step="0.01"></v-slider>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title v-if="layer.copyright">
            <div class="mb-1 grey--text caption">{{i18n.copyright}}</div>
            <div class="grey--text caption">{{layer.copyright}}</div>
        </v-card-title>
    </v-card>
</template>

<script>
    export default {
        props: [
            "i18n",
            "layer"
        ]
    }
</script>