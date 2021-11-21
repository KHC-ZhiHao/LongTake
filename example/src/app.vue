<template>
    <Loading :loading="state.loading">
        <Confirm></Confirm>
        <router-view></router-view>
    </Loading>
</template>

<script lang="ts">
import Loading from '@/components/loading.vue'
import Confirm from '@/layout/confirm.vue'
import { self } from '@/self'
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
    components: {
        Loading,
        Confirm
    },
    setup() {

        // =================
        //
        // State
        //

        const state = self.data({
            loading: true
        })

        // =================
        //
        // Mounted
        //

        onMounted(() => {
            state.loading = false
        })

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
