<template>
    <div>
        <Codemirror
            border
            style="font-size: 16px;"
            @change="change"
            :value="state.content"
            :options="state.editOptions"
            :height="480"
        ></Codemirror>
    </div>
</template>

<script lang="ts">
import { self } from '@/self'
import { defineComponent, onMounted, watch } from 'vue'
export default defineComponent({
    props: {
        code: {
            default: () => ''
        }
    },
    emits: ['edited'],
    setup(props, { emit }) {

        // =================
        //
        // State
        //

        const state = self.data({
            content: '',
            editOptions: {
                readOnly: false,
                mode: 'text/javascript',
                theme: 'dracula',
                lineNumbers: true,
                smartIndent: true,
                indentUnit: 4,
                foldGutter: true,
                styleActiveLine: true
            }
        })

        // =================
        //
        // Watch
        //

        watch(() => props.code, () => {
            update()
        })

        // =================
        //
        // Mounted
        //

        onMounted(() => {
            update()
        })

        // =================
        //
        // Mounted
        //

        const update = () => {
            setTimeout(() => {
                state.content = props.code
            }, 100)
        }

        const change = (content: string) => {
            emit('edited', content)
        }

        // =================
        //
        // Done
        //

        return {
            state,
            change
        }
    }
})
</script>
