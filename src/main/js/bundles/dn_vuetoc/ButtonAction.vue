<template>
    <v-list-tile v-if="displayToolForItem(item)" @click="onClick(item)">
        <v-list-tile-action>
            <v-icon primary>{{icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{titleLabel}}</v-list-tile-title>
    </v-list-tile>
</template>
<script>
export default {
  props: {
    item: Object
  },
  data: function() {
    return {
      icon: "settings",
      titleLabel: "Tool Title"
    };
  },
  methods: {
    onChange(value) {},
    displayToolForItem(item) {
      return true;
    }
  }
};
</script>