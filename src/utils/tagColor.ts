// Пастельные цвета для тегов
const COLORS = [
  '#FFB3BA', // розовый
  '#BAFFC9', // зелёный
  '#BAE1FF', // голубой
  '#FFFFBA', // жёлтый
  '#FFDFBA', // оранжевый
  '#E2F0CB', // светло-зелёный
  '#F0E6EF', // лавандовый
  '#FFD3B6', // персиковый
  '#D4F0F0', // мятный
  '#F9E4BC', // кремовый
]

export function getTagColor(tagName: string): string {
  let hash = 0
  for (let i = 0; i < tagName.length; i++) {
    hash = tagName.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % COLORS.length
  return COLORS[index]
}
