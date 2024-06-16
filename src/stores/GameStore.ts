import type { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { IStatus } from '@/constants'
import type { ICard, IState } from '@/IType'
import { shuffleAllCards } from '@/helper'

export const GameStoreKey: InjectionKey<Store<IState>> = Symbol()

const GameStore = createStore<IState>({
  state() {
    return {
      nonMatchedPairs: 8,
      totalMoves: 0,
      status: IStatus.READY,
      cards: shuffleAllCards()
    }
  },
  getters: {
    nonMatchedPairs: (s) => s.nonMatchedPairs,
    totalMoves: (s) => s.totalMoves,
    status: (s) => s.status,
    cards: (s) => s.cards
  },
  actions: {
    updateStatus: (context, status: IStatus) => {
      context.commit('changeStatus', status)
    },
    flipsDelay: (
      context,
      {
        timeout,
        cards
      }: {
        timeout: number
        cards: ICard[]
      }
    ) => {
      setTimeout(() => {
        context.commit('flips', cards)
      }, timeout)
    }
  },
  mutations: {
    reset: (state) => {
      state.nonMatchedPairs = 8
      state.totalMoves = 0
      state.cards = shuffleAllCards()
      state.status = IStatus.READY
    },
    updateNonMatchedPairs: (state, payload) => {
      state.nonMatchedPairs = state.nonMatchedPairs + payload
    },
    flips: (state, cards: ICard[]) => {
      state.cards
        .filter((c) => cards.some((cc) => cc.id === c.id))
        .forEach((c) => {
          c.flipped = !c.flipped
        })
    },
    changeStatus: (state, status: IStatus) => {
      state.status = status
    }
  }
})

export { GameStore }
