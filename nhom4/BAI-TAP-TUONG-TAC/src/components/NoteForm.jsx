import { useState } from 'react'

// NoteForm.jsx ← useState (controlled input)
function NoteForm({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim() === '') return

    onAdd(text.trim())
    setText('')
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nhập ghi chú mới..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">+ Thêm</button>
    </form>
  )
}

export default NoteForm
