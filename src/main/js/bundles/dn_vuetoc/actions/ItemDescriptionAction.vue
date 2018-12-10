<template>
    <v-list-group
        v-if="displayActionForItem(item)"
        no-action>
        <v-list-tile
            slot="activator">
            <v-list-tile-action>
                <v-icon primary>description</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{ descriptionLabel }}</v-list-tile-title>
        </v-list-tile>
        <v-card-title v-if="displayActionForItem(item)">
            <div class="regular">{{ item.layer.description }}</div>
        </v-card-title>
    </v-list-group>
</template>
<script>
    export default  {
        name: "item-description",
        props: {
            item: {
                type: Object
            },
            descriptionLabel: {
                type: String,
                default: "Description"
            }
        },
        methods: {
            displayActionForItem(item) {
                return !!item.layer && !!item.layer.description;
            }
        }
    }
</script>
