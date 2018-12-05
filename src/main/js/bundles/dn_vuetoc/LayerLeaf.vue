<template>
    <div>
        <v-progress-linear
            v-if="config.showLoadingStatus"
            :active="updating"
            :height="2"
            indeterminate
            class="ma-0"
        />
        <slot :item="item"/>
    </div>
</template>
<script>
    export default {
        props: ["item", "config"],
        data: function(){
            return {
                updating: false,
                watchHandle: undefined
            }
        },
        beforeMount: function(){
            this.watchHandle = this.item.watch("updating", updating => this.updating = updating);
        },
        beforeDestroy: function(){
            this.watchHandle && this.watchHandle.remove();
        }
    }
</script>
