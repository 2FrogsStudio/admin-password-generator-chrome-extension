// components/CopyToClipboardButton.js
import { useState } from 'react';
import copy from 'clipboard-copy';
import styles from '../../styles/Pages.module.css';

const CopyToClipboardButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(text);
      setIsCopied(true);
    } catch (error) {
      console.error('Failed to copy text to clipboard', error);
    }
  };

  return (
    <>
      <button className={styles.buttonCopyToClipboard}  onClick={handleCopyClick}>📋</button>
    </>
  );
};

export default CopyToClipboardButton;