<template>
    <div class="main-wrapper">
        <div class="main-nav">
            <div class="main-title" :style="`color: ${state.color}`">LongTake</div>
            <div class="main-subtitle" :style="`color: ${state.color}`">輕巧、快速的繪製動畫</div>
            <div class="pt3">
                <Botton
                    icon="arrow-left-bold"
                    @click="next(-1)"
                    :color="state.color"
                    :background-color="state.backgroundColor">
                </Botton>
                <Botton
                    @click="toApis"
                    :color="state.color"
                    :background-color="state.backgroundColor">
                    APIs
                </Botton>
                <Botton
                    @click="toDemo"
                    :color="state.color"
                    :background-color="state.backgroundColor">
                    Demo
                </Botton>
                <Botton
                    @click="toGitHub"
                    :color="state.color"
                    :background-color="state.backgroundColor">
                    GitHub
                </Botton>
                <Botton
                    icon="arrow-right-bold"
                    @click="next(1)"
                    :color="state.color"
                    :background-color="state.backgroundColor">
                </Botton>
            </div>
        </div>
        <canvas
            style="background-image: url('./images/loading.gif');"
            class="main-canvas"
            ref="canvas"
            width="1920"
            height="1080">
        </canvas>
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

        const canvas = self.ref<HTMLCanvasElement>()
        const themes = {
            farm: {
                color: '#fff',
                backgroundColor: '#000',
                render: farmRender
            },
            tree: {
                color: '#fff',
                backgroundColor: '#59572E',
                render: treeRender
            },
            twin: {
                color: '#fff',
                backgroundColor: '#000',
                render: twinRender
            },
            sheep: {
                color: '#000',
                backgroundColor: '#FD9C44',
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
            color: '',
            backgroundColor: '',
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
            state.index = LongTake.helper.randInt(0, keys.length - 1)
            state.theme = keys[state.index] as any
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
                theme.render(state.longtake)
                state.color = theme.color
                state.backgroundColor = theme.backgroundColor
            }
        }

        const toGitHub = () => {
            window.open('https://github.com/KHC-ZhiHao/LongTake')
        }

        const toApis = () => {
            window.open('https://github.com/KHC-ZhiHao/LongTake/blob/master/apis/summary.md')
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
            state,
            canvas,
            toApis,
            toDemo,
            toGitHub
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
        .main-subtitle {
            font-family: 'Overpass', sans-serif;
            font-size: 2em;
            font-weight: 300;
        }
        .main-canvas {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            position: absolute;
            background-color: #CCC;
            background-repeat: no-repeat;
            background-position: center;
        }
    }
</style>
