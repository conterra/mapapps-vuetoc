<template>
    <v-card-title v-if="displayActionForItem(item)">
        <div class="regular">{{ item.layer.description }}</div>
    </v-card-title>
</template>
<script>
    export default  {
        name: "item-description",
        props: ["item"],
        methods: {
            displayActionForItem(item) {
                return !!item.layer && !!item.layer.description;
            }
        }
    }
</script>
