import { useEffect, useState } from 'react'

interface UseDebounceProps {
  value: string
  delay: number
}

export const useDebounce = ({value, delay}: UseDebounceProps) => {

  const [debounceValue, setDebounceValue] = useState<string>('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => clearTimeout(timer)
  },[value, delay])

  return { debounceValue }
}