import { ALL_CARD_NAMES } from '@/constants'
import type { ICard } from '@/IType'

function id(length: number) {
  const result = []
  const characters = 'abcdefghijklmnopqrstuvwxyz'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join('')
}
export function shuffleAllCards(): ICard[] {
  const newCards: ICard[] = [...ALL_CARD_NAMES, ...ALL_CARD_NAMES].map((name) => ({
    id: id(8),
    flipped: false,
    name,
    pairFound: false
  }))

  for (let i = newCards.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i)
    const x = newCards[i - 1]
    newCards[i - 1] = newCards[j]
    newCards[j] = x
  }
  return newCards
}
