<template>
    <div class="main-wrapper">
        <div class="main-nav">
            <div class="main-title" ref="title">LongTake</div>
            <div class="pt2">
                <Botton icon="arrow-left-bold" @click="next(-1)"></Botton>
                <Botton @click="toDemo">Docs</Botton>
                <Botton @click="toDemo">Demo</Botton>
                <Botton @click="toDemo">GitHub</Botton>
                <Botton icon="arrow-right-bold" @click="next(1)"></Botton>
            </div>
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
                color: '#fff',
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

        const toDemo = () => {
            self.router.push({
                name: 'demo',
                params: {
                    name: 'basic'
                }
            })
        }

        // =================
        //
        // Done
        //

        return {
            next,
            title,
            state,
            canvas,
            toDemo
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
        .main-nav {
            z-index: 10;
            top: 10vh;
            width: 100%;
            text-align: center;
            position: absolute;
        }
        .main-title {
            font-family: 'Overpass', sans-serif;
            font-size: 5em;
            font-weight: 900;
        }
        .main-canvas {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            position: absolute;
            background-color: #fff;
            background-image: url('/images/loading.gif');
            background-repeat: no-repeat;
            background-position: center;
        }
    }
</style>
