// NoteList.jsx ← props (notes + onDelete)
function NoteList({ notes, onDelete }) {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <div className="note-item" key={note.id}>
          <div className="note-content">
            <span className="note-text">
              <span className="emoji">{note.emoji}</span>
              {note.text}
            </span>
            <span className="note-date">{note.date}</span>
          </div>
          <button className="note-delete" onClick={() => onDelete(note.id)}>
            Xóa
          </button>
        </div>
      ))}
    </div>
  )
}

export default NoteList
