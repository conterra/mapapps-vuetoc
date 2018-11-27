<template>
    <v-list-group
        v-if="displayActionForItem(item)"
        :disabled="disableActionForItem(item)"
        no-action>
        <v-list-tile
            slot="activator"
            :disabled="disableActionForItem(item)">
            <v-list-tile-action>
                <v-icon primary>{{ icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{ titleLabel }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile class="vue-toc__slider">
            {{ fromLabel }}
            <v-icon>{{ fromIcon }}</v-icon>
            <v-slider
                v-model="sliderValue"
                :max="max"
                :step="step"
                hide-details
                @input="onChange"/>
            {{ toLabel }}
            <v-icon>{{ toIcon }}</v-icon>
        </v-list-tile>
    </v-list-group>
</template>
<script>
    export default {
        props: {
            item: Object
        },
        data: function () {
            return {
                sliderValue: 1,
                max: 1,
                step: 0.01,
                fromLabel: "",
                toLabel: "",
                fromIcon: "",
                toIcon: ""
            };
        },
        methods: {
            onChange(value) {
            },
            displayActionForItem(item) {
                return true;
            },
            disableActionForItem(item) {
                return false;
            }
        }
    };
</script>
