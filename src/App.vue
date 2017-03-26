<template>
  <div class="facegame">
    <!-- <hello></hello> -->
    <index></index>
    <stage></stage>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Index from './components/Index'
import Stage from './components/Stage'

export default {
  name: 'app',
  components: {
    Hello,
    Index,
    Stage
  }
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
