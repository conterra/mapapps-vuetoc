<template>
    <v-card-title v-if="item.copyright && item.copyright.toLowerCase() !=='none'">
        <div class="grey--text caption">{{ copyrightLabel }}</div>
        <div class="grey--text caption">{{ item.copyright }}</div>
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
                let displayAction = !!item && !!item.copyright;
                this.$emit("display-changed", displayAction);
                return displayAction;
            },
            disableActionForItem(item) {
                return false;
            }
        }
    }
</script>
