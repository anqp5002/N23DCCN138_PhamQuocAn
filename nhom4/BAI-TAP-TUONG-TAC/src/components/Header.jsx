import { useTheme } from '../context/ThemeContext'

// Header.jsx ← props + useTheme()
function Header({ noteCount }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="header-left">
        <span className="icon">📋</span>
        <h1>Ghi Chú Cá Nhân</h1>
      </div>
      <div className="header-right">
        <span className="badge">{noteCount} ghi chú</span>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}

export default Header
