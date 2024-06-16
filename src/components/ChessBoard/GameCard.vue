<template>
  <div class="container" @click="doFlip">
    <div v-if="!card.pairFound" class="card" :class="{ flipped: card.flipped }">
      <img v-if="card.name === 'bishop'" class="front" src="../../assets/bishop.png" alt="" />
      <img v-if="card.name === 'gold'" class="front" src="../../assets/gold.png" alt="" />
      <img v-if="card.name === 'horse'" class="front" src="../../assets/horse.png" alt="" />
      <img v-if="card.name === 'king'" class="front" src="../../assets/king.png" alt="" />
      <img v-if="card.name === 'lance'" class="front" src="../../assets/lance.png" alt="" />
      <img v-if="card.name === 'pawn'" class="front" src="../../assets/pawn.png" alt="" />
      <img v-if="card.name === 'rook'" class="front" src="../../assets/rook.png" alt="" />
      <img v-if="card.name === 'silver'" class="front" src="../../assets/silver.png" alt="" />
      <img class="back" src="../../assets/suit.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { useStore } from 'vuex'
import type { ICard } from '@/IType'
import { GameStoreKey } from '@/stores'

interface IGameCardProps {
  card: ICard
}

const props = defineProps<IGameCardProps>()

const emit = defineEmits(['onFlip'])

const { card } = toRefs(props)
const { commit } = useStore(GameStoreKey)

const doFlip = () => {
  if (card.value.flipped) {
    return
  }
  commit('flips', [card.value])
  emit('onFlip', card.value)
}
</script>

<style scoped>
.container {
  width: 165px;
  height: 200px;
  cursor: pointer;
  position: relative;
  perspective: 800px;
}

.card {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card img {
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  backface-visibility: hidden;
}

.card .back {
  transform: rotateY(0deg);
}

.card .front {
  transform: rotateY(180deg);
}
</style>
