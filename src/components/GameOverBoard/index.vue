<template>
  <div class="result-panel">
    <h1>Game Over</h1>
    <p>Total moves: {{ moveCounter }}</p>
    <a v-if="status === IStatus.PASSED" @click.prevent.stop="reset"> Play again </a>
  </div>
</template>

<script lang="ts">
export default {
  name: 'GameOverBoard'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { GameStoreKey } from '@/stores'
import { IStatus } from '@/constants'

const { state, commit } = useStore(GameStoreKey)
const moveCounter = computed(() => state.totalMoves)
const status = computed(() => state.status)
const reset = () => commit('reset')
</script>

<style scoped>
.result-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 660px;
  height: 800px;
}

.result-panel h1 {
  color: black;
  padding-top: 16px;
  padding-bottom: 16px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: xxx-large;
}

.result-panel p {
  font-family: Arial, Helvetica, sans-serif;
  font-size: x-large;
}

.result-panel a {
  font-family: Arial, Helvetica, sans-serif;
  font-size: x-large;
  margin-top: 32px;
  margin-bottom: 32px;
  border: 1px solid gray;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
}

.result-panel a:link,
.result-panel a:visited {
  background-color: gray;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

.result-panel a:hover {
  background-color: #cbaa89;
}

.result-panel a:active {
  background-color: #7eafc1;
}
</style>
