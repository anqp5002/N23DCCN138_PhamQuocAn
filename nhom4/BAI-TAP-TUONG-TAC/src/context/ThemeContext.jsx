import { createContext, useContext } from 'react'

// createContext
const ThemeContext = createContext()

// Provider
export function ThemeProvider({ theme, toggleTheme, children }) {
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// useTheme() - custom hook
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
