//Start.tsx - это страница. Страницы лежат по пути src/pages/
import styles from './Pages.module.css';
export function Start() {
  // const [count, setCount] = useState(0)
  return (
    <>
      <h1 style={{ fontSize: '50px', width: '50%', margin: '180px auto 80px' }}>
        Deal with{' '}
        <span
          className={styles.redLetter}
          style={{
            fontSize: '40px',
            width: '50%',
            color: '#red',
          }}
        >
          i
        </span>
        t!
      </h1>
      <h2 style={{ width: '60%', margin: '0 auto' }}>
        A simple To-Do app with features that help you{' '}
        <span
          className={styles.redLetter}
          style={{
            width: '50%',
            color: '#red',
          }}
        >
          avoid wasting time
        </span>
        .
      </h2>
    </>
  );
}
