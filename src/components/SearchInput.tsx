import React from 'react'
import { ChangeEvent } from 'react'
import '../styles/components/search_input.css'

interface SearchInputProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

export const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  return (
    <section className="search-input">
      <input
        className="search-input__input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </section>
  )
}
