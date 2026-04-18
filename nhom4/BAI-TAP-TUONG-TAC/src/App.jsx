import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'

// Dữ liệu mặc định
const defaultNotes = [
  {
    id: 1,
    emoji: '📚',
    text: 'Học useState để quản lý state trong component',
    date: '17/04/2026, 20:00',
  },
  {
    id: 2,
    emoji: '⚡',
    text: 'Tìm hiểu useEffect xử lý side effects',
    date: '17/04/2026, 20:05',
  },
  {
    id: 3,
    emoji: '🔗',
    text: 'Thực hành Context API chia sẻ dữ liệu',
    date: '17/04/2026, 20:10',
  },
  {
    id: 4,
    emoji: '🌙',
    text: 'Thêm chức năng Dark / Light mode',
    date: '17/04/2026, 20:15',
  },
  {
    id: 5,
    emoji: '💾',
    text: 'Lưu dữ liệu vào localStorage bằng useEffect',
    date: '17/04/2026, 20:20',
  },
]

// Danh sách emoji ngẫu nhiên cho ghi chú mới
const emojis = ['📝', '✨', '🎯', '💡', '🚀', '🔥', '📌', '🎨', '⭐', '💻']

// Format ngày giờ hiện tại
function formatDate() {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${day}/${month}/${year}, ${hours}:${minutes}`
}

// App.jsx ← useState + useEffect + ThemeProvider
function App() {
  // useState: quản lý danh sách ghi chú
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes')
    return saved ? JSON.parse(saved) : defaultNotes
  })

  // useState: quản lý theme
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'light'
  })

  // useEffect: lưu notes vào localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  // useEffect: lưu theme vào localStorage + cập nhật data-theme
  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Thêm ghi chú mới
  const addNote = (text) => {
    const newNote = {
      id: Date.now(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      text: text,
      date: formatDate(),
    }
    setNotes([...notes, newNote])
  }

  // Xóa ghi chú
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
      <Header noteCount={notes.length} />
      <div className="app-container">
        <NoteForm onAdd={addNote} />
        <NoteList notes={notes} onDelete={deleteNote} />
      </div>
    </ThemeProvider>
  )
}

export default App
