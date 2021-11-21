<template>
    <el-button :size="size" :style="style" :type="type" :disabled="disabled">
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
import { LocationFilled, Film, FullScreen, ArrowDown, ArrowUp, DocumentAdd, CircleCheck, Document, Delete, VideoPause, MoreFilled } from '@element-plus/icons'
import { computed, defineComponent, PropType } from 'vue'
export default defineComponent({
    components: {
        Film,
        Delete,
        ArrowUp,
        Document,
        ArrowDown,
        FullScreen,
        VideoPause,
        MoreFilled,
        CircleCheck,
        DocumentAdd,
        LocationFilled
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
        // Computed
        //

        const style = computed(() => {
            let styles = [] as string[]
            if (props.block) {
                styles.push('display: block')
                styles.push('width: 100%')
            }
            if (props.selected) {
                styles.push('border: 2px solid grey')
            }
            if (props.boundless) {
                styles.push('padding: 0')
            }
            return styles.join(';')
        })

        const hasSlot = computed(() => {
            return !!slots.default
        })

        // =================
        //
        // Done
        //

        return {
            style,
            hasSlot
        }
    }
})
</script>
