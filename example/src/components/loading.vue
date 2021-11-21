<template>
    <div style="width: 100%" :style="height ? `height:${height}`: ''">
        <div v-if="!!error" class="mv5 mv5 text-center">
            <div class="mb4" style="font-size: 3em">&#x1F622;</div>
            <div v-if="error" v-html="error"></div>
        </div>
        <div v-else-if="!!loading === true" class="mv5 text-center">
            Loading...
        </div>
        <slot v-else></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        error: String,
        height: String,
        loading: {
            type: Boolean as any,
            default: true
        }
    },
    setup() {
        return {}
    }
})
</script>
