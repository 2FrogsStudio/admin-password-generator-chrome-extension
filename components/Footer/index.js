import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/2FrogsStudio/admin-password-generator-chrome-extension"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
        <span className={styles.logo}>
          <img
            src="icons/icon16-github.png"
            alt="Logo"
            width={16}
            height={16}
          />
        </span>
      </a>
    </footer>
  );
}
