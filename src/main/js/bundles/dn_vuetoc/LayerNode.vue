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
            v-model="open"
            no-action>
            <slot
                slot="activator"
                :item="item"
                name="header"/>
            <slot
                name="tree"/>
        </v-list-group>
    </div>
</template>
<script>
    export default {
        props: ["item", "config"],
        data: function(){
            return {
                open: this.item.open,
                updating: this.item.updating,
                watchHandle: []
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
