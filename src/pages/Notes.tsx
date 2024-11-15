import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '.././store';
import { addNote, removeNote, editNoteName } from '.././store/slices/appSlice';
import styles from './Pages.module.css';

export function Notes() {
  const notes = useSelector((state: RootState) => state.app.notes);
  const lang = useSelector((state: RootState) => state.app.lang);
  const dispatch = useDispatch();
  const [noteName, setNoteName] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');

  const labels = {
    addNote: lang === 'ru' ? 'Добавить заметку' : 'Add Note',
    delete: lang === 'ru' ? 'Удалить' : 'Delete',
    edit: '🖊',
    save: lang === 'ru' ? 'Сохранить' : 'Save',
  };

  const handleAddNote = () => {
    if (noteName.trim()) {
      dispatch(addNote({ name: noteName }));
      setNoteName('');
    }
  };

  const handleDeleteNote = (id: string) => {
    dispatch(removeNote({ id }));
  };

  const handleEditNote = (id: string) => {
    setEditingNoteId(id);
    const note = notes.find((note) => note.id === id);
    if (note) {
      setEditedName(note.name);
    }
  };

  const handleSaveEdit = (id: string) => {
    if (editedName.trim()) {
      dispatch(editNoteName({ id, name: editedName }));
      setEditingNoteId(null);
    }
  };

  return (
    <>
      <h1 className={styles.header}>
        <span className={styles.redLetter} style={{ fontSize: '40px' }}>
          N
        </span>
        otes
      </h1>
      <div className={styles.notesContainer}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
            placeholder={
              lang === 'ru' ? 'Введите название заметки' : 'Enter note name'
            }
            className={styles.noteInput}
          />
          <button onClick={handleAddNote} className={styles.addButton}>
            {labels.addNote}
          </button>
        </div>
        <ul className={styles.notesList}>
          {notes.map((note) => (
            <li key={note.id} className={styles.noteItem}>
              {editingNoteId === note.id ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className={styles.editingInput}
                />
              ) : (
                <span className={styles.noteText}>{note.name}</span>
              )}
              <div className={styles.buttonGroup}>
                {editingNoteId === note.id ? (
                  <button
                    onClick={() => handleSaveEdit(note.id)}
                    className={styles.saveButton}
                  >
                    {labels.save}
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleEditNote(note.id)}
                      className={styles.editButton}
                    >
                      {labels.edit}
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className={styles.deleteButton}
                    >
                      {labels.delete}
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
