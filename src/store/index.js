import Vue from "vue";
import Vuex from 'vuex'
import investModule from "@/store/investModule";
 Vue.use(Vuex)

export default new Vuex.Store ({
    modules:{
        investModule
    }
})