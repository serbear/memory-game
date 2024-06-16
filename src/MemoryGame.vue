<template>
  <div class="game-panel">
    <ChessBoard v-if="status !== IStatus.PASSED" />
    <GameOverBoard v-if="status === IStatus.PASSED" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ChessBoard } from '@/components'
import { GameStoreKey } from '@/stores'
import GameOverBoard from '@/components/GameOverBoard/index.vue'
import { IStatus } from '@/constants'

const { state, commit } = useStore(GameStoreKey)
const status = computed(() => state.status)

onMounted(() => {
  commit('reset')
})
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  width: 100%;
  height: 100%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style scoped>
.game-panel {
  width: 660px;
  height: 800px;
  display: flex;
  flex-direction: column;
}
</style>
