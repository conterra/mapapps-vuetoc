<template>
    <v-card class="elevation-6">
        <v-toolbar
            class="primary title"
            dense>
            <v-toolbar-title>{{ i18n.basemaps }}</v-toolbar-title>
        </v-toolbar>
        <v-list>
            <v-list-tile
                v-for="basemap in basemaps"
                :key="basemap.id"
                :class="{'primary--text': basemap.id === $root.selectedId}"
                @click.prevent.stop="$root.selectedId = basemap.id">
                <v-list-tile-action v-if="basemap.icon">
                    <v-icon
                        v-if="basemap.id === $root.selectedId"
                        primary
                        medium>{{ basemap.icon }}
                    </v-icon>
                    <v-icon v-else="basemap.id === $root.selectedId">{{ basemap.icon }}
                    </v-icon>
                </v-list-tile-action>
                <v-list-tile-action v-else>
                    <v-icon
                        v-if="basemap.id === $root.selectedId"
                        primary
                        medium>video_label</v-icon>
                    <v-icon v-else="basemap.id === $root.selectedId">video_label</v-icon>
                </v-list-tile-action>
                <v-list-tile-content v-if="basemap.id === $root.selectedId">
                    <v-list-tile-title
                        class="title"
                        v-text="basemap.title"/>
                </v-list-tile-content>
                <v-list-tile-content v-else>
                    <v-list-tile-title v-text="basemap.title"/>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        props: [
            "i18n",
            "basemaps"
        ]
    }
</script>
