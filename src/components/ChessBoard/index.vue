<template>
  <div class="chessboard">
    <Card v-for="card of cards" :key="card.id" :card="card" @onFlip="onFlip" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ChessBoard'
}
</script>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { IStatus } from '@/constants'
import { GameStoreKey } from '@/stores'
import type { ICard } from '@/IType'
import Card from './GameCard.vue'

let lastCard = ref<ICard | null>(null)
const { state, dispatch, commit } = useStore(GameStoreKey)
const realtimeStatus = computed(() => state.status)
const realtimeNonMatchedPairs = computed(() => state.nonMatchedPairs)
const cards = computed(() => state.cards)

const onFlip = (e: ICard) => {
  if (realtimeStatus.value === IStatus.READY) {
    dispatch('updateStatus', IStatus.PLAYING)
  }
  if (!lastCard.value) {
    lastCard.value = e
    return
  } else {
    state.totalMoves++
  }

  // pair found
  if (lastCard.value !== e && lastCard.value.name === e.name) {
    // hide cards
    e.pairFound = true
    lastCard.value.pairFound = true

    lastCard.value = null
    commit('updateNonMatchedPairs', -1)

    if (!realtimeNonMatchedPairs.value) {
      dispatch('updateStatus', IStatus.PASSED)
    }
    return
  }

  const savedLastCard = lastCard.value
  lastCard.value = null
  dispatch('flipsDelay', {
    timeout: 1000,
    cards: [savedLastCard, e]
  })
}
</script>

<style scoped>
.chessboard {
  margin-top: 0;
  width: 100%;
  background-color: #ffffff;
  height: 800px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: space-around;
}


</style>
