<template>
    <v-card-title v-if="item.layer.copyright && item.layer.copyright.toLowerCase() !=='none'">
        <div class="grey--text caption">{{ copyrightLabel }}</div>
        <div class="grey--text caption">{{ item.layer.copyright }}</div>
    </v-card-title>
</template>
<script>
    export default {
        name: "item-copyright",
        props: ["item", "copyrightLabel"],
        data: function () {
            return {
                displayAction: this.displayActionForItem(this.item),
                disableAction: this.disableActionForItem(this.item)
            }
        },
        methods: {
            displayActionForItem(item) {
                let displayAction = !!item.layer && !!item.layer.copyright;
                this.$emit("display-changed", displayAction);
                return displayAction;
            },
            disableActionForItem(item) {
                return false;
            }
        }
    }
</script>
