<template>
    <v-list-group
        :disabled="disableAction"
        no-action
    >
        <v-list-tile
            slot="activator"
            :disabled="disableAction"
        >
            <v-list-tile-action>
                <v-icon primary>
                    {{ icon }}
                </v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{ titleLabel }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile class="dn-toc__slider">
            {{ fromLabel }}
            <v-icon>{{ fromIcon }}</v-icon>
            <v-slider
                v-model="sliderValue"
                :max="max"
                :step="step"
                hide-details
                @input="onChange"
            />
            {{ toLabel }}
            <v-icon>{{ toIcon }}</v-icon>
        </v-list-tile>
    </v-list-group>
</template>
<script>
    export default {
        props: {
            icon: {
                type: String,
                default: "opacity"
            },
            item: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            eventBus: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            fromLabel: {
                type: String,
                default: ""
            },
            toLabel: {
                type: String,
                default: ""
            },
            titleLabel: {
                type: String,
                default: ""
            }
        },
        data: function () {
            return {
                sliderValue: 1,
                max: 1,
                step: 0.01,
                displayAction: true,
                disableAction: false
            };
        },
        methods: {
            onChange(value) {
            },
            disableActionForItem(item) {
                return false;
            }
        }
    };
</script>
