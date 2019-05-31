<template>
    <div class="pa-3">
        <div class="mb-1 grey--text caption">
            {{ copyrightLabel }}
        </div>
        <div class="grey--text caption">
            {{ item.copyright }}
        </div>
    </div>
</template>
<script>
    export default {
        name: "copyright",
        props: {
            item: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            copyrightLabel: {
                type: String,
                default: "Copyright Label"
            }
        },
        data: function () {
            return {
                displayAction: false
            };
        }
    }
</script>
