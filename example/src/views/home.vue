<template>
    <div class="main-wrapper">
        <!-- <div>
            <a href="">example</a>
            <a href="">github</a>
        </div> -->
        <div ref="title" class="main-title">LongTake</div>
        <div>
            <Botton icon="arrow-left-bold" @click="next(-1)"></Botton>
            <Botton icon="arrow-right-bold" @click="next(1)"></Botton>
        </div>
        <canvas class="main-canvas" ref="canvas" width="1920" height="1080"></canvas>
    </div>
</template>

<script lang="ts">
import Botton from '@/components/botton.vue'
import { self } from '@/self'
import { LongTake } from 'longtake'
import { farmRender } from '@/theme/farm'
import { treeRender } from '@/theme/tree'
import { twinRender } from '@/theme/twin'
import { sheepRender } from '@/theme/sheep'
import { defineComponent, watch, onMounted, onUnmounted } from 'vue'
export default defineComponent({
    components: {
        Botton
    },
    setup() {

        const title = self.ref<HTMLDivElement>()
        const canvas = self.ref<HTMLCanvasElement>()
        const themes = {
            farm: {
                color: '#fff',
                render: farmRender
            },
            tree: {
                color: '#000',
                render: treeRender
            },
            twin: {
                color: '#fff',
                render: twinRender
            },
            sheep: {
                color: '#000',
                render: sheepRender
            }
        }

        // =================
        //
        // State
        //

        const state = self.data({
            index: 0,
            theme: 'farm' as keyof typeof themes,
            longtake: null as LongTake
        })

        // =================
        //
        // watch
        //

        watch(() => state.theme, () => render())

        // =================
        //
        // Mounted
        //

        onMounted(() => {
            let keys = Object.keys(themes)
            state.theme = keys[LongTake.helper.randInt(0, keys.length - 1)] as any
            render()
        })

        onUnmounted(() => {
            if (state.longtake) {
                state.longtake.close()
            }
        })

        // =================
        //
        // Methods
        //

        const next = (dir: 1 | -1) => {
            let keys = Object.keys(themes)
            state.index += dir
            if (state.index === -1) {
                state.index = keys.length - 1
            }
            if (state.index === keys.length) {
                state.index = 0
            }
            state.theme = keys[state.index] as any
            render()
        }

        const render = () => {
            if (state.longtake) {
                state.longtake.close()
            }
            state.longtake = new LongTake(canvas.value, 1920, 1080)
            let theme = themes[state.theme]
            if (theme) {
                title.value.style.color = theme.color
                theme.render(state.longtake)
            }
        }

        // =================
        //
        // Done
        //

        return {
            next,
            title,
            state,
            canvas
        }
    }
})
</script>

<style lang="scss" scoped>
    .main-wrapper {
        position: relative;
        width: 100vw;
        height: 100vh;
        text-align: center;
        .main-title {
            font-size: 5em;
        }
        .main-canvas {
            z-index: -1;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            position: absolute;
            background-color: red;
        }
    }
</style>
