export const confirm = {
    namespaced: true,
    state: () => ({
        open: false,
        message: '',
        loading: false,
        handler: null
    }),
    mutations: {
        open(state, { message, handler }) {
            state.open = true
            state.message = message
            state.loading = false
            state.handler = handler
        },
        cancel(state) {
            state.open = false
        },
        confirm(state) {
            state.loading = true
            state.handler(() => {
                state.open = false
            })
        }
    },
    getters: {
        open: state => state.open,
        message: state => state.message,
        loading: state => state.loading
    }
}
