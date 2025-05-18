export const quotes = [
  "Peace comes from within. Do not seek it without.",
  "Each morning we are born again. What we do today is what matters most.",
  "The mind is everything. What you think you become.",
  "Nothing can harm you as much as your own thoughts unguarded.",
  "Every experience is a teacher.",
  "Silence the angry man with love. Silence the ill-natured man with kindness.",
  "Just as a snake sheds its skin, we must shed our past over and over again.",
  "Happiness never decreases by being shared.",
  "Your purpose in life is to find your purpose and give your whole heart and soul to it.",
  "If anything is worth doing, do it with all your heart.",
  "Be where you are; otherwise you will miss your life.",
  "Every morning we are born again. What we do today matters most.",
  "The trouble is, you think you have time.",
  "Believe nothing, no matter where you read it or who has said it, unless it agrees with your own reason.",
  "Three things cannot be long hidden: the sun, the moon, and the truth."
]

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  return quotes[randomIndex]
} 