

export default {
    state: {
        Limitation: 'mdi-currency-usd',
        profit: false,
        lesion:false,
    },
    mutations:{
        setLimitation(state, flag){
            state.Limitation = flag
        },
        setLesion(state, bool){
            state.lesion=bool
        },
        setProfit(state, bool){
            state.profit=bool
        },
    },
    getters:{
        getLimitation(state){
            return state.Limitation
        },
        getProfit(state){
            return state.profit
        },
        getLesion(state){
            return state.lesion
        },

    },
    action:{},
}
