<template>
  <div class="hello">
    <h1>{{ $store.state.count }}</h1>
    <h1>{{ evenOrOdd }}</h1>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters([
    'evenOrOdd'
  ]),
  methods: mapActions([
    'increment',
    'decrement'
  ])
}
</script>
</style>
