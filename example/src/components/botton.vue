<template>
    <el-button :style="state.styles" :type="type" :disabled="disabled">
        <el-icon v-if="icon" style="vertical-align: middle;" :class="hasSlot ? 'mr1' : ''">
            <component :is="icon"></component>
        </el-icon>
        <span
            style="vertical-align: middle; display: inline-block;"
            :style="icon ? 'margin-top: 1px' : ''">
            <slot></slot>
        </span>
    </el-button>
</template>

<script lang="ts">
import { self } from '@/self'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons'
import { computed, defineComponent, onMounted, PropType, watch } from 'vue'
export default defineComponent({
    components: {
        ArrowLeftBold,
        ArrowRightBold
    },
    props: {
        size: {
            type: String as PropType<'medium' | 'mini' | 'small'>,
            default: () => 'medium'
        },
        icon: {
            type: String,
            default: () => null
        },
        color: {
            type: String,
            default: () => null
        },
        backgroundColor: {
            type: String,
            default: () => null
        },
        type: {
            type: String as PropType<'primary'>,
            default: () => 'primary'
        },
        boundless: {
            type: Boolean,
            default: () => false
        },
        block: {
            type: Boolean,
            default: () => false
        },
        loading: {
            type: Boolean,
            default: () => false
        },
        selected: {
            type: Boolean,
            default: () => false
        },
        disabled: {
            type: Boolean,
            default: () => false
        }
    },
    setup(props, { slots }) {

        // =================
        //
        // State
        //

        const state = self.data({
            styles: ''
        })

        // =================
        //
        // Watch
        //

        watch(() => props, () => {
            changeStyle()
        }, {
            deep: true
        })

        // =================
        //
        // Computed
        //

        const hasSlot = computed(() => {
            return !!slots.default
        })

        // =================
        //
        // Mounted
        //

        onMounted(() => {
            changeStyle()
        })

        // =================
        //
        // Methods
        //

        const changeStyle = () => {
            let styles = [] as string[]
            if (props.block) {
                styles.push('display: block')
                styles.push('width: 100%')
            } else {
                styles.push('width: 86px')
            }
            if (props.selected) {
                styles.push('border: 2px solid grey')
            }
            if (props.boundless) {
                styles.push('padding: 0')
            }
            if (props.color) {
                styles.push(`color: ${props.color}`)
            }
            if (props.backgroundColor) {
                styles.push(`background-color: ${props.backgroundColor}`)
                styles.push(`border-color: ${props.backgroundColor}`)
            }
            state.styles = styles.join(';')
        }

        // =================
        //
        // Done
        //

        return {
            state,
            hasSlot
        }
    }
})
</script>
