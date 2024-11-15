import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { setLang, setCurrentPage } from './store/slices/appSlice';
import styles from './App.module.css';

import { Header } from './components/Header/Header';
import { LangToggle } from './components/LangToggle/Langtoggle';
import { AboutApp } from './pages/AboutApp';
import { Start } from './pages/Start';
import { Todo } from './pages/Todo';
import { Notes } from './pages/Notes';

export function App() {
  const lang = useSelector((state: RootState) => state.app.lang);
  const currentPage = useSelector((state: RootState) => state.app.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage') as
      | 'Start'
      | 'Todo'
      | 'Notes'
      | 'AboutApp'
      | null;
    if (savedPage) {
      dispatch(setCurrentPage(savedPage));
    }
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.headerLangContainer}>
        <Header
          lang={lang}
          setLang={(value: 'en' | 'ru') => dispatch(setLang(value))}
          setCurrentPage={(value: 'Start' | 'Todo' | 'Notes' | 'AboutApp') =>
            dispatch(setCurrentPage(value))
          }
        />
        <LangToggle lang={lang} />
      </div>

      {currentPage === 'Todo' && <Todo />}
      {currentPage === 'Notes' && <Notes />}
      {currentPage === 'AboutApp' && <AboutApp />}
      {currentPage === 'Start' && <Start />}
    </div>
  );
}
