import { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Pages.module.css';

const endpoint = 'https://pwpush.com'
const endpointCreateSecret = `${endpoint}/p.json`
const endpointLinkSecret = `${endpoint}/en/p`

export default function Secret() {

  function generateSecret(length = 16) {
    var keys = 'abcdefghijklmnopqrstuvwxyz';
    keys += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    keys += '0123456789';
    var result = '';
  
    for(var i = 1; i <= length; i++) {
      var keyPos = Math.round(Math.random() * (keys.length - 1));
      result += keys.charAt(keyPos);
    }
    return result;
  }

  // States
  const [secret, setSecret] = useState('Press the button \'Create Secret\'');
  const [secretLink, setSecretLink] = useState('Press the button \'Share Secret\'');

  const setSecretLinkWithDomain = (url_token) => {
    setSecretLink (`${endpointLinkSecret}/${url_token}`)
  }

  // Function to handle button click
  const handleCreateSecret = () => {
    setSecret(generateSecret());
  };

  const handleCreateSecretLink = () => {
    shareSecret();
  };

  const shareSecret = () => {
    const payload = {
     password: {
      payload: secret,
      expire_after_days: 1,
      expire_after_views: 10
     }
    };

    axios.post(endpointCreateSecret, payload)
    .then(
      (data) => { setSecretLinkWithDomain(data.data.url_token) }
    )
    .catch(
      (error) => {console.log(error)}
    );
  };

  return (
    <>
        <h1 className={styles.code}>{secret}</h1>
        <p>
            <button 
              className={styles.buttonCreateSecret} 
              onClick={handleCreateSecret}>Create Secret
            </button>&nbsp;&#x2192;&nbsp;
            <button 
              className={styles.buttonShareSecret} 
              onClick={handleCreateSecretLink}>Share Secret
            </button>
          </p>
          <span className={styles.logo}>
          <img
            src="icons/icon16-github.png"
            alt="Logo"
            width={16}
            height={16}
          />
        </span>
        <h1 className={styles.code} >{secretLink}</h1>
        <p className={styles.description}>Notice: do not open link because it's available only for one open</p>
    </>
  );
}
