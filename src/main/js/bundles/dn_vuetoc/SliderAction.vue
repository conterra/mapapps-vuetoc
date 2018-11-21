<template>
    <v-list-group no-action>
        <v-list-tile slot="activator">
            <v-list-tile-action>
                <v-icon primary>{{icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{titleLabel}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile class="vue-toc__opacity">
            {{fromLabel}}
            <v-slider v-model="sliderValue" hide-details :max="max" step="step" @input="onChange"></v-slider>
            {{toLabel}}
        </v-list-tile>
    </v-list-group>
</template>
<script>
export default {
  props: {
    item: Object
  },
  data: function() {
    return {
      sliderValue: 1,
      max: 1,
      step: 0.01
    };
  },
  methods: {
    onChange(value) {}
  }
};
</script>