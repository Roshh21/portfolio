import { useEffect, useState } from 'react'

/**
 * Cycles through a list of words with a typewriter effect:
 * types the word, pauses, deletes it, then moves to the next.
 *
 * @param {string[]} words
 * @param {{ typingSpeed?: number, deletingSpeed?: number, pauseTime?: number }} options
 */
export function useTypingEffect(
  words,
  { typingSpeed = 80, deletingSpeed = 40, pauseTime = 1600 } = {}
) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!words || words.length === 0) return

    const currentWord = words[wordIndex % words.length]
    let timeout

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      const nextText = isDeleting
        ? currentWord.slice(0, text.length - 1)
        : currentWord.slice(0, text.length + 1)
      timeout = setTimeout(
        () => setText(nextText),
        isDeleting ? deletingSpeed : typingSpeed
      )
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime])

  return text
}
