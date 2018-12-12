<template>
    <v-card-title v-if="item.layer.copyright && item.layer.copyright !=='none'">
        <div class="grey--text caption">{{ copyrightLabel }}</div>
        <div class="grey--text caption">{{ item.layer.copyright }}</div>
    </v-card-title>
</template>
<script>
    export default  {
        name: "item-copyright",
        props: ["item", "copyrightLabel"],
        methods: {
            displayActionForItem(item) {
                return !!item.layer && !!item.layer.copyright;
            }
        }
    }
</script>
