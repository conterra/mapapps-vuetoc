<template>
    <v-card-title>
        <div class="grey--text caption">
            {{ copyrightLabel }}
        </div>
        <div class="grey--text caption">
            {{ item.copyright }}
        </div>
    </v-card-title>
</template>
<script>
    export default {
        name: "copyright",
        props: ["item", "copyrightLabel"],
        watch: {
            "item.copyright"() {
                let item = this.item;
                this.displayAction = !!item.copyright && item.copyright.toLowerCase() !== 'none';
            }
        }
    }
</script>
