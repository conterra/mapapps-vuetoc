<template>
    <v-card class="elevation-6">
        <v-toolbar
            class="primary title"
            dense
        >
            <v-toolbar-title>{{ i18n.ground }}</v-toolbar-title>
        </v-toolbar>
        <v-list-tile class="dn-toc__slider">
            {{ i18n.invisible }}
            <v-slider
                v-model="opacity"
                :max="1"
                :step="0.01"
                hide-details
                @change="changeOpacity"
            />
            {{ i18n.visible }}
        </v-list-tile>
    </v-card>
</template>

<script>
    export default {
        props: {
            i18n: {
                type: Object,
                default: function () {
                    return {
                        ground: "Ground",
                        visible: "visible",
                        invisible: "invisible"
                    };
                }
            },
            groundOpacity: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                opacity: this.groundOpacity
            }
        },
        methods: {
            changeOpacity: function () {
                this.$emit('update:groundOpacity', this.opacity);
            }
        }
    }
</script>
