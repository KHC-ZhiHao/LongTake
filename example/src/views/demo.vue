<template>
    <div>
        456
    </div>
</template>

<script lang="ts">
import { self } from '@/self'
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {

        // =================
        //
        // State
        //

        const state = self.data({})

        // =================
        //
        // Done
        //

        return {
            state
        }
    }
})
</script>
