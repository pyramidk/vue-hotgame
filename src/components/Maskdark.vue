<template>
  <div>
    <div class="share-bg"></div>
    <div class="result" v-show="rightShow">
      <img :src=$store.state.rightResult>
    </div>
    <div class="share-box">   
      <div class="share-text">{{ $store.state.font }}</div>
      <ul class="share-list">
        <li @click="replay"><div class="share-btn share-bufu"></div></li>
        <li @click="showRightResult">
          <div class="share-btn who"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: mapGetters([
    'rightShow'
  ]),
  methods: mapActions([
    'replay',
    'showRightResult'
  ])
}
</script>

<style scoped>
.share-bg {
  position: absolute;
  right: 0;
  z-index: 100;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  width: 100%;
}
.share-box {
  position: absolute;
  left: 0;
  z-index: 173;
  top: 35%;
  width: 100%;
}
.share-text {
  line-height: 1.5;
  color: #fff;
  font-size: 1.75em;
  width: 94%;
  text-align: center;
  letter-spacing: 0;
  margin: 0 auto 50px;
}
.share-list li {
  text-align: center;
}
.share-btn {
  cursor: pointer;
  display: inline-block;
  width: 187px;
  height: 72px;
  background-size: contain;
  background-repeat: no-repeat;
}
.share-bufu {
  background-image: url(../../static/img-bg/upload_ifrwgyzrgu4deyrrgyzdambqhayde_356x143.png)
}
.who {
  background-image: url(../../static/img-bg/upload_ie3wmnbshbrteyrrgyzdambqgayde_356x143.png);
}
.result {
  text-align: center;
}
.result img {
  position: absolute;
  z-index: 173;
  top: 40px;
  left: 50%;
  margin-left: -53px;
  width: 106px;
  height: 140px;
}
ul li {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
}
</style>
