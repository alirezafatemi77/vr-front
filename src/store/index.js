import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lab:[],
    userintrestarry:[],
    room1:[],
    room2:[],
    room3:[],
    room4:[],
    selectedroom:'',
    selected:[],
  },
  mutations: {
    setintrest(state,selected){
      selected.forEach(ele=>{
        this.state.lab.push(ele.parameters.style)
      })
    
    },
    pushselected(state,sel){
      this.state.selected.push(sel)
    },
    setuserintrestarray(state,userintrestarray){
      this.state.userintrestarry=userintrestarray
      console.log(this.state.userintrestarry)

    },
    setroomnumber(state,room){
      this.state.selectedroom=room
    },

    setroom1(state,room1){
      this.state.room1.push(room1)
    },
    setroom2(state,room1){
      this.state.room2.push(room1)
    },
    setroom3(state,room1){
      this.state.room3.push(room1)
    },
    setroom4(state,room1){
      this.state.room4.push(room1)
    }
  },
  actions: {
  },
  modules: {
  }
})
