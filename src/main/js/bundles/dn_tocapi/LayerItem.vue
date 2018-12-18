<template>
    <div>
        <v-progress-linear
            v-if="config.showLoadingStatus"
            :active="updating"
            :height="2"
            indeterminate
            class="ma-0"/>
        <v-list-group
            v-if="children.length"
            v-model="open"
            sub-group
            prepend-icon="chevron_right"
            active-class=""
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
                :children="children.items"
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
            class="dn-toc__layer-tree-item--no-childs"
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
        data: function () {
            return {
                open: this.item.open,
                updating: this.item.updating,
                children: this.item.chilren,
                watchHandle: []
            }
        },
        watch: {
            open: function (value) {
                if (value !== this.item.open) {
                    this.item.open = value;
                }
            }
        },
        beforeMount: function () {
            this.watchHandle.push(this.item.watch("updating", updating => this.updating = updating));
            this.watchHandle.push(this.item.watch("open", open => this.open = open));
            this.watchHandle.push(this.item.children.on("change", () => this.children = this.item.children));
        },
        beforeDestroy: function () {
            this.watchHandle.forEach(handle => handle.remove);
        }
    }
</script>
