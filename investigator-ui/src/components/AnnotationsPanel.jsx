import { useState } from "react";

export default function AnnotationsPanel() {
  const [note, setNote] = useState("");
  const [annotations, setAnnotations] = useState([
    {
      author: "System",
      text: "Initial claim parsed from uploaded documents.",
      time: "10:43 AM"
    }
  ]);

  const addNote = () => {
    if (!note.trim()) return;

    setAnnotations([
      ...annotations,
      {
        author: "Investigator",
        text: note,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      }
    ]);

    setNote("");
  };

  return (
    <div className="card">
      <h3 className="section-title">Annotations & Notes</h3>

      <div className="annotations-list">
        {annotations.map((a, idx) => (
          <div key={idx} className="annotation">
            <div className="annotation-meta">
              <strong>{a.author}</strong>
              <span>{a.time}</span>
            </div>
            <div className="annotation-text">{a.text}</div>
          </div>
        ))}
      </div>

      <div className="annotation-input">
        <textarea
          placeholder="Add investigator note or observation..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={addNote} className="btn-primary">
          Add Note
        </button>
      </div>
    </div>
  );
}