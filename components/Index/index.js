import styles from '../../styles/Pages.module.css';
import Secret from '../Secret';

// Generate new password

export default function Index({ navigateToPage }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Admin Password Generator</h1>
        <Secret ></Secret>
      </main>
    </div>
  );
}
