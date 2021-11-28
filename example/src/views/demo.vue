<template>
    <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside class="pa2" width="300px">
                <div class="pa2">Basic</div>
                <div class="pa2 pt1 pb1" v-for="item of basic" :key="item.name">
                    <Botton  block @click="load(item.name)">
                        {{ item.title }}
                    </Botton>
                </div>
                <div class="pa2">Interactive</div>
                <div class="pa2 pt1 pb1" v-for="item of interactive" :key="item.name">
                    <Botton  block @click="load(item.name)">
                        {{ item.title }}
                    </Botton>
                </div>
            </el-aside>
            <el-main>
                <div class="content">
                    <canvas class="demo-canvas" ref="canvas" width="960" height="600"></canvas>
                    <el-button type="primary" @click="refresh">Primary</el-button>
                    <Editer @edited="edited" :code="state.code"></Editer>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import Editer from '@/components/editer.vue'
import Botton from '@/components/botton.vue'
import { self } from '@/self'
import { LongTake } from 'longtake'
import { DemoAttr } from '@/demo'
import { basic } from '@/demo/basic'
import { interactive } from '@/demo/interactive'
import { defineComponent, onMounted, onUnmounted, watch } from 'vue'
export default defineComponent({
    components: {
        Editer,
        Botton
    },
    setup() {

        const canvas = self.ref<HTMLCanvasElement>()

        // =================
        //
        // State
        //

        const state = self.data({
            demo: null as DemoAttr,
            desc: '',
            code: '',
            title: '',
            loading: false,
            longtake: null
        })

        // =================
        //
        // Watch
        //

        watch(() => self.route, () => {
            let name = self.route.params.name as any
            load(name)
        }, {
            deep: true
        })

        // =================
        //
        // Mounted
        //

        onMounted(() => {
            let name = self.route.params.name as any
            load(name)
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

        const load = (name: string) => {
            let items = [...basic, ...interactive]
            state.demo = items.find(e => e.name === name)
            if (state.demo) {
                state.desc = state.demo.desc
                state.title = state.demo.title
                // @ts-ignore
                state.code = window.js_beautify(`
                    // longtake = new LongTake('canvas', 960, 600)
                    ${state.demo.code}
                `)
            } else {
                // @ts-ignore
                state.code = window.js_beautify(`
                    // longtake = new LongTake('canvas', 960, 600)
                    (longtake, LongTake) => {}
                `)
            }
            self.router.replace({
                params: {
                    name
                }
            })
            refresh()
        }

        const refresh = () => {
            if (state.longtake) {
                state.longtake.close()
                canvas.value.style.touchAction = 'auto'
            }
            /* eslint no-eval: off */
            let method = eval(state.code)
            state.longtake = new LongTake(canvas.value)
            method(state.longtake, LongTake)
        }

        const edited = (code) => {
            state.code = code
        }

        // =================
        //
        // Done
        //

        return {
            load,
            basic,
            interactive,
            state,
            canvas,
            edited,
            refresh
        }
    }
})
</script>

<style>
.el-header {
    background-color: #b3c0d1;
    line-height: 60px;
}

.el-aside {
    background-color: #d3dce6;
    height: calc(100vh - 60px);
    overflow: auto;
}

.el-main {
    background-color: #e9eef3;
    height: calc(100vh - 60px);
    overflow: auto;
}

.demo-canvas {
    background-color: #fff;
    display: block;
}

.content {
    margin: 0 auto;
    width: 960px;
}

</style>
