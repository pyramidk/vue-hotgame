import Vue from 'vue'
import Vuex from 'vuex'

import GridEvents from '../event.js'

import {stageArray, bisai, fontArray} from '../constant.js'

Vue.use(Vuex)

let easy, normal, hard

const state = {
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
  rightResult: '',
  rightShow: false,
  maskNum: 0
}

const mutations = {
  start () {
    state.stageShow = true
    mutations.play(state.stageNum)
    GridEvents.$emit('start')
  },
  replay () {
    state.fail = false
    state.stageShow = true
    state.gameShow = false
    state.rightShow = false
    mutations.play(state.stageNum)
    GridEvents.$emit('replay')
  },
  next () {
    state.stageNum++
    mutations.play(state.stageNum)
    state.stageShow = true
    state.gameShow = false
  },
  fail () {
    state.fail = true
    state.maskNum = state.stageNum - 1
    if (state.stageNum >= 1 && state.stageNum <= 10) {
      state.font = fontArray.easy[Math.floor(Math.random() * 3)].replace('X', state.maskNum)
    } else if (state.stageNum >= 11 && state.stageNum < 22) {
      state.font = fontArray.normal[Math.floor(Math.random() * 3)].replace('X', state.maskNum)
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
  },
  showRightResult () {
    state.rightShow = true
  }
}

const actions = {
  start: ({ commit }) => commit('start'),
  next: ({ commit }) => commit('next'),
  fail: ({ commit }) => commit('fail'),
  replay: ({ commit }) => commit('replay'),
  showRightResult: ({ commit }) => commit('showRightResult'),
  compare: ({ commit }) => commit('compare')
}

const getters = {
  stageShow: state => state.stageShow,
  stageNum: state => state.stageNum,
  showGirl: state => state.showGirl,
  gameShow: state => state.gameShow,
  listChange: state => state.listChange,
  fail: state => state.fail,
  font: state => state.font,
  rightShow: state => state.rightShow
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
