<template>
  <div class="facegame">
    <index></index>
    <stage></stage>
    <mask-dark v-show="fail"></mask-dark>
  </div>
</template>

<script>
import Index from './components/Index'
import Stage from './components/Stage'
import MaskDark from './components/MaskDark'

import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    Index,
    Stage,
    MaskDark
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
