<template>
    <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="300px">Aside</el-aside>
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
import { self } from '@/self'
import { basic, children } from '@/demo/basic'
import { LongTake } from 'longtake'
import { defineComponent, onMounted, onUnmounted, watch } from 'vue'
export default defineComponent({
    components: {
        Editer
    },
    setup() {

        const canvas = self.ref<HTMLCanvasElement>()
        const files = {
            basic: basic,
            children: children
        }

        // =================
        //
        // State
        //

        const state = self.data({
            desc: '',
            title: '',
            code: '',
            loading: false,
            longtake: null
        })

        // =================
        //
        // Watch
        //

        watch(() => self.route, () => {
            load()
            refresh()
        }, {
            deep: true
        })

        // =================
        //
        // Mounted
        //

        onMounted(() => {
            load()
            refresh()
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

        const load = () => {
            let name = self.route.params.name as any
            let file = files[name]
            if (file) {
                // @ts-ignore
                state.code = window.js_beautify(`
                    // longtake = new LongTake('canvas', 960, 600)
                    ${file.code}
                `)
            } else {
                state.code = '(longtake, LongTake) => {}'
            }
        }

        const refresh = () => {
            if (state.longtake) {
                state.longtake.close()
            }
            /* eslint no-eval: off */
            let method = eval(state.code)
            state.longtake = new LongTake(canvas.value, 960, 600)
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
