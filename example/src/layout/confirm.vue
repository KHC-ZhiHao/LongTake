<template>
    <div>
        <el-dialog
            v-model="state.dialog"
            width="300px"
            :title="$t('提醒')"
            :show-close="false"
            :before-close="cancel">
            <div style="padding-left: 1px; font-size: 1.1em">{{ message }}</div>
            <template #footer>
                <div style="text-align: right">
                    <el-button @click="cancel" :disabled="loading">{{ $t('取消') }}</el-button>
                    <el-button @click="confirm" type="primary" :loading="loading">{{ $t('確定') }}</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { self } from '@/self'
import { useStore } from 'vuex'
import { defineComponent, watch, computed } from 'vue'
export default defineComponent({
    setup() {

        const store = useStore()

        // =================
        //
        // state
        //

        const state = self.data({
            dialog: false
        })

        // =================
        //
        // computed
        //

        const open = computed(() => store.getters['confirm/open'])
        const message = computed(() => store.getters['confirm/message'])
        const loading = computed(() => store.getters['confirm/loading'])

        // =================
        //
        // watch
        //

        watch(() => open.value, () => {
            state.dialog = open.value
        })

        // =================
        //
        // methods
        //

        const cancel = () => store.commit('confirm/cancel')
        const confirm = () => store.commit('confirm/confirm')

        // =================
        //
        // done
        //

        return {
            state,
            cancel,
            message,
            loading,
            confirm
        }
    }
})
</script>
