<template>
    <div>
        <v-progress-linear
            v-if="config.showLoadingStatus"
            :active="updating"
            :height="2"
            indeterminate
            class="ma-0"
        />
        <v-list-group
            v-if="item.children.length"
            v-model="open"
            no-action>
            <layer-details
                slot="activator"
                :bus="bus"
                :item="item"
                :i18n="i18n"
                :config="config"
                :custom-layer-actions="customLayerActions"
            />
            <slot
                :children="item.children.items"
                name="sub"
            />
        </v-list-group>
        <layer-details
            v-else
            :bus="bus"
            :item="item"
            :i18n="i18n"
            :config="config"
            :custom-layer-actions="customLayerActions"
        />
    </div>
</template>
<script>
    import LayerDetails from "./LayerDetails.vue";

    export default {
        components: {
            "layer-details": LayerDetails
        },
        props: ["bus", "i18n", "item", "config", "customLayerActions"],
        data: function(){
            return {
                open: this.item.open,
                updating: this.item.updating,
                watchHandle: []
            }
        },
        watch: {
            open: function(value) {
                if(value !== this.item.open){
                    this.item.open = value;
                }
            }
        },
        beforeMount: function(){
            this.watchHandle.push(this.item.watch("updating", updating => this.updating = updating));
            this.watchHandle.push(this.item.watch("open", open => this.open = open));
        },
        beforeDestroy: function(){
            this.watchHandle.forEach(handle => handle.remove);
        }
    }
</script>
