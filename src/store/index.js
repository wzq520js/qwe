import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data:[],
    checkAll:false
  },
  mutations: {
    setState(state,payload){
        state[payload.key]=payload.value
    },

    setridioFlag(state,payload){
      let {id}=payload
      state.data.forEach(item=>{
        item.list.forEach(items=>{
        items.id===id?items.flag=!items.flag:''
      })
       item.checkAll= item.list.every(item=>{
          return item.flag
        })
    })
    },

    allFlag(state,payload){
      let {id, checked }=payload
     let fidind= state.data.findIndex(item=>{
        return item.id===id
      })
      console.log(fidind);
      console.log(state.data[fidind].checkAll);
      
      state.data[fidind].checkAll=checked
      state.data.forEach(item=>{
        item.list.forEach(items=>{
          items.flag=item.checkAll
        })
      })
    }
  },
  actions: {
    changeFlag({commit}){
      Axios({
        url:'/api/list',
      }).then(res=>{
        commit({type:'setState',key:'data',value:res.data.data})
      })
    },

    setdata({state}){
      Axios({
        method:'post',
        url:'/api/data',
        data:{
          updata:state.data
        }
      }).then(res=>{
        //commit({type:'setState',key:'data',value:res.data.data})
      })
    }
  
  },
  modules: {
  }
})
