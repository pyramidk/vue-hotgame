<template>
  <div class="gamescreen" v-show="stageShow">
    <div class="stage">
      <div class="di"><img :src=imgUrl.di alt=""></div>
      <div class="ji"><img :src=stageArray[stageNum-1] alt=""></div>
      <div class="guan"><img :src=imgUrl.guan alt=""></div>
    </div>
    <div class="gamestage" v-show="!gameShow">
      <img :src=imgUrl.stage class="stage-font"/>
      <img :src=showGirl.group class="img-show"/>
      <p class="hot"><i></i>红人：{{showGirl.name}}<span id="nameShow"></span></p>
      <dl class="time-section">
        <dt> <span ref='seeSecondBox'>{{this.stageTime}}</span>s</dt>
        <dd><div class="jindu1">
          <div class="jindu2"></div>
          <div class="jindu3">
            <img :src=imgUrl.second class="jindu4 progressbar animated3" ref="seeProgress"/>
          </div>
        </div></dd>
      </dl>
    </div>
    <div class="game" v-show="gameShow">
      <img :src=imgUrl.gameFont class="font-last"/>
      <ul class="avatar-list">
        <li @click="compare(item)" v-for="item in $store.state.listChange"><img :src=item alt=""><div class="wrong" style="display: none"></div></li>
      </ul>
      <p class="hot">谁是<i></i>红人：{{showGirl.name}}<span></span></p>
      <dl class="time-section">
        <dt> <span ref='timeSecondBox'>{{this.gameTime}}</span>s</dt>
        <dd><div class="jindu1">
          <div class="jindu2"></div>
          <div class="jindu3">
            <img :src=imgUrl.second class="jindu4" ref="timeProgress"/>
          </div>
        </div></dd>
      </dl>
    </div>
  </div>
</template>

<script>
import GridEvents from '../event.js'
import img from '../img.js'
import { stageArray } from '../constant.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      imgUrl: img,
      stageArray: stageArray,
      stopTimeout: false,
      clearStage: '',
      clearGame: '',
      stageTime: 5,
      totalStage: 5,
      gameTime: 10,
      totalGame: 10
    }
  },
  mounted () {
    GridEvents.$on('start', this.countFive)
    GridEvents.$on('replay', this.countFive)
  },
  computed: mapGetters([
    'stageShow',
    'stageNum',
    'showGirl',
    'gameShow',
    'listChange'
  ]),
  methods: {
    ...mapActions([
      'next',
      'fail'
    ]),
    progressTimeOut: function (variant, total, progressBoxId, time, type, callback) {
      var that = this
      function progress () {
        if (variant < 0 || that.stopTimeout) {
          clearTimeout(type)
          variant = total

          if (!that.stopTimeout) {
            if (typeof (callback) === 'function') callback()
          }
        } else {
          that.$refs[time].innerHTML = variant
          that.$refs[progressBoxId].style.left = (-(1 - variant / total) * 100) + '%'
          variant--
          type = setTimeout(progress, 1000)
        }
      }
      progress()
    },
    showGame: function () {
      console.log('gameShow')
      this.$store.state.gameShow = true
      this.countTen()
    },
    countFive: function () {
      this.stopTimeout = false
      this.progressTimeOut(this.stageTime, this.totalStage, 'seeProgress', 'seeSecondBox', this.clearStage, this.showGame)
    },
    countTen: function () {
      var that = this
      this.progressTimeOut(this.gameTime, this.totalGame, 'timeProgress', 'timeSecondBox', this.clearGame, function () {
        that.fail()
        // that.next()
        // that.countFive()
      })
    },
    compare (src) {
      if (src.indexOf(this.$store.state.showGirl.list[0]) > -1) {
        console.log('you win')
          // this.gameTime = 10;
        this.stopTimeout = true
        this.next()
        this.countFive()
          // this.winTimeout = true;
      } else {
        console.log('lose')
        // this.gameTime = 10;
        this.stopTimeout = true
        this.fail()
        // this.fail();
        // return false;
      }
    }
  }
}
</script>

<style scoped>
  .gamestage {
    margin-bottom: 70px;
  }
  .stage {
    text-align: center;
    width: 100%;
    margin-top: 60px;
  }
  .stage div {
    display: inline-block;
  }
  .stage img {
    width: 55px;
    height: 55px;
  }
  .stage-font {
    display: block;
    margin: 20px auto 0;
    width: 331px;
    height: 88px;
  }
  .img-show {
    display: block;
    width: 344px;
    height: 220px;
    text-align: center;
    margin: 20px auto;
    border: 2px solid #010;
    box-sizing: border-box;
    background: #fff;
  }
  .hot {
    color: #fff;
    font-weight: 800;
    vertical-align: middle;
    line-height: 1.15;
    text-align: center;
    height: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .time-section {
    width: 316px;
    height: 40px;
    margin: 20px auto 0;
  }
  dt {
    float: right;
    color: #97f4fe;
    font-weight: 800;
    -webkit-text-fill-color: #97f4fe;
    -webkit-text-stroke: 2px #000;
    font-size: 25px;
    text-align: right;
  }
  dd {
    margin: 0 0;
    padding: 0 0;
  }
  .jindu1{
    height: 40px;
    position: relative;
    display: block;
    width: 224px;
    text-align: center;
    margin: 0 auto;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-image: url(../../static/img-bg/upload_ie3wiojrgrqteyrrgyzdambqgayde_546x47.png);
  }
  .jindu2 {
    position: absolute;
    z-index: 20;
    top: -5px;
    left: -30px;
    width: 47px;
    height: 47px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-image: url(../../static/img-bg/upload_ifrwkm3bgrqteyrrgyzdambqhayde_89x85.png);
  }
  .jindu3 {
    position: absolute;
    z-index: 14;
    top:15px;
    left: -4px;
    width: 224px;
    overflow: hidden;
    height: 12px;
  }
  .jindu4 {
    vertical-align: top;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    -webkit-transition: left 1s ease;
    -moz-transition: left 1s ease;
    transition: left 1s ease;
  }


  .game {
    margin-bottom: 70px;
  }
  .font-last {
    display: block;
    margin: 20px auto 0;
    width: 214px;
    height: 28px;
  }
  .wrong {
    position: absolute;
    top: 0;
    left: 15px;
    width: 82px;
    height: 136px;
    background-position: center center;
    background-size: contain;
    background-image: url(../../static/img-bg/upload_ie3tem3gha2teyrrgyzdambqgayde_135x135.png);
    background-repeat: no-repeat;
  }
  ul {
    width: 348.5px;
    height: 298px;
    margin: 20px auto 0; 
    padding: 0;
  }
  li {
    position: relative;
    list-style: none;
    float: left;
    margin-right: 5px;
  }
  li img {
    width: 106px;
    height: 140px;
    border: 2px solid #010;
  }
</style>
