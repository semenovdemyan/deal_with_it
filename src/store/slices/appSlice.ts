import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Task = {
  id: string;
  name: string;
  status: 'none' | 'completed' | 'not_completed';
};

type Note = {
  id: string;
  name: string;
  status: 'none' | 'completed' | 'not_completed';
};

interface AppState {
  lang: 'en' | 'ru';
  currentPage: 'Start' | 'Todo' | 'Notes' | 'AboutApp';
  tasks: Task[];
  notes: Note[];
}

const initialState: AppState = {
  lang: 'ru',
  currentPage: 'Start',
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  notes: JSON.parse(localStorage.getItem('notes') || '[]'),
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<'en' | 'ru'>) {
      state.lang = action.payload;
    },
    removeTask(state, action: PayloadAction<{ id: string }>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTaskName(state, action: PayloadAction<{ id: string; name: string }>) {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.name = action.payload.name;
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    setCurrentPage(
      state,
      action: PayloadAction<'Start' | 'Todo' | 'Notes' | 'AboutApp'>
    ) {
      state.currentPage = action.payload;
      localStorage.setItem('currentPage', action.payload);
    },
    addTask(state, action: PayloadAction<{ name: string }>) {
      state.tasks.push({
        id: new Date().toISOString(),
        name: action.payload.name,
        status: 'none',
      });
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTaskStatus(
      state,
      action: PayloadAction<{
        id: string;
        status: 'none' | 'completed' | 'not_completed';
      }>
    ) {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    addNote(state, action: PayloadAction<{ name: string }>) {
      state.notes.push({
        id: new Date().toISOString(),
        name: action.payload.name,
        status: 'none',
      });
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
    updateNoteStatus(
      state,
      action: PayloadAction<{
        id: string;
        status: 'none' | 'completed' | 'not_completed';
      }>
    ) {
      const note = state.notes.find((note) => note.id === action.payload.id);
      if (note) {
        note.status = action.payload.status;
      }
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
    removeNote(state, action: PayloadAction<{ id: string }>) {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
    editNoteName(state, action: PayloadAction<{ id: string; name: string }>) {
      const note = state.notes.find((note) => note.id === action.payload.id);
      if (note) {
        note.name = action.payload.name;
      }
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
  },
});

export const {
  setLang,
  setCurrentPage,
  addTask,
  updateTaskStatus,
  removeTask,
  editTaskName,
  addNote,
  updateNoteStatus,
  removeNote,
  editNoteName,
} = appSlice.actions;

export default appSlice.reducer;
