import Vue from 'vue'
import Vuex from 'vuex'

import GridEvents from '../event.js'

import {stageArray, bisai, fontArray} from '../constant.js'

Vue.use(Vuex)

let easy, normal, hard
// right: showGirl.list[0]
const state = {
  count: 0,
  stageShow: false,
  stageNum: 1,
  stageArray: stageArray,
  bisai: bisai,
  showGirl: {},
  listChange: [],
  gameShow: false,
  fail: false,
  fontArray: fontArray,
  font: '',
  rightResult: ''
}

const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  },
  start () {
    state.stageShow = true
    mutations.play(state.stageNum)
    console.log(state.showGirl)
    GridEvents.$emit('start')
  },
  replay () {
    state.fail = false
    state.stageShow = true
    state.gameShow = false
    mutations.play(state.stageNum)
    GridEvents.$emit('replay')
  },
  next () {
    state.stageNum++
    mutations.play(state.stageNum)
    state.stageShow = true
    state.gameShow = false
    console.log(state.showGirl)
  },
  fail () {
    state.fail = true
    if (state.stageNum >= 1 && state.stageNum <= 10) {
      state.font = fontArray.easy[Math.floor(Math.random() * 3)].replace('X', state.stageNum)
    } else if (state.stageNum >= 11 && state.stageNum < 22) {
      state.font = fontArray.normal[Math.floor(Math.random() * 3)].replace('X', state.stageNum)
    } else if (state.stageNum === 22) {
      state.font = fontArray.hard[0]
    }
  },
  randomOrder (targetArray) {
    let arrayLength = targetArray.length
    let tempArray1 = []
    for (let i = 0; i < arrayLength; i++) {
      tempArray1[i] = i
    }
    let tempArray2 = []
    for (let i = 0; i < arrayLength; i++) {
      tempArray2[i] = tempArray1.splice(Math.floor(Math.random() * tempArray1.length), 1)
    }
    let tempArray3 = []
    for (let i = 0; i < arrayLength; i++) {
      tempArray3[i] = targetArray[tempArray2[i]]
    }
    return tempArray3
  },
  play (guan) {
    guan = guan || 1
    if (guan === 1) {
      easy = this.randomOrder(bisai.easy)
      normal = this.randomOrder(bisai.normal)
      hard = this.randomOrder(bisai.hard)
    }
    if (guan >= 1 && guan <= 7) {
      state.showGirl = easy[guan - 1]
    } else if (guan > 7 && guan <= 15) {
      state.showGirl = normal[guan - 8]
    } else {
      state.showGirl = hard[guan - 16]
    }
    state.rightResult = state.showGirl.list[0]
    state.listChange = this.randomOrder(state.showGirl.list)
  }
}

const actions = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  start: ({ commit }) => commit('start'),
  next: ({ commit }) => commit('next'),
  fail: ({ commit }) => commit('fail'),
  replay: ({ commit }) => commit('replay')
}

const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd',
  stageShow: state => state.stageShow,
  stageNum: state => state.stageNum,
  showGirl: state => state.showGirl,
  gameShow: state => state.gameShow,
  listChange: state => state.listChange,
  fail: state => state.fail,
  font: state => state.font
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
