<template>
  <div class="facegame">
    <index></index>
    <stage></stage>
    <Maskdark v-show="fail"></Maskdark>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Index from './components/Index'
import Stage from './components/Stage'
import Maskdark from './components/Maskdark'

import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    Hello,
    Index,
    Stage,
    Maskdark
  },
  computed: mapGetters([
    'fail'
  ])
}
</script>

<style>
body {
  margin: 0;
}
.facegame {
  width: 100%;
  height: 100%;
  background-image: url(../static/img-bg/upload_ie4dky3dheydeyrrgyzdambqgiyde_640x1059.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  overflow: hidden;
}
</style>
