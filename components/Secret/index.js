import { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Pages.module.css';
import CopyToClipboardButton from '../CopyToClipboardButton';

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";


const endpoint = 'https://pwpush.com'
const endpointCreateSecret = `${endpoint}/p.json`
const endpointLinkSecret = `${endpoint}/en/p`

export default function Secret() {

  function generateSecret(length = 24) {
    var keys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
  
    for(var i = 1; i <= length; i++) {
      var keyPos = Math.round(Math.random() * (keys.length - 1));
      result += keys.charAt(keyPos);
    }
    return result;
  }

  const secretInitState = 'Press the button \'Create Secret\'';
  const secretLinkInitState = 'Press the button \'Share Secret\'';

  // States
  const [secret, setSecret] = useState(secretInitState);
  const [secretLink, setSecretLink] = useState(secretLinkInitState);

  const setSecretLinkWithDomain = (url_token) => {
    setSecretLink (`${endpointLinkSecret}/${url_token}`)
  }

  // Function to handle button click
  const handleCreateSecret = (length) => {
    setSecret(generateSecret(length));
    setSecretLink(secretLinkInitState);
  };

  const handleCreateSecretLink = () => {
    shareSecret();
  };

  const shareSecret = () => {
    const payload = {
     password: {
      payload: secret,
      expire_after_days: 7,
      expire_after_views: 1
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
        <h1 className={styles.code}>{secret} &nbsp;
          <CopyToClipboardButton text={secret} />
        </h1>
        <p>
        <Dropdown>
          <DropdownTrigger>
            <Button className={styles.buttonCreateSecret} variant="bordered">
              Create Secret
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem className={`${styles.buttonCreateSecret} ${styles.buttonCreateSecretWeak}`} onClick={(length) => handleCreateSecret(8)}>length 8</DropdownItem>
            <DropdownItem className={`${styles.buttonCreateSecret} ${styles.buttonCreateSecretMiddle}`}  onClick={(length) => handleCreateSecret(16)}>length 16</DropdownItem>
            <DropdownItem className={`${styles.buttonCreateSecret} ${styles.buttonCreateSecretStrong}`}  onClick={(length) => handleCreateSecret(24)}>length 24</DropdownItem>
          </DropdownMenu>
        </Dropdown>&nbsp;&#x2192;&nbsp;
            <button 
              className={styles.buttonShareSecret} 
              onClick={handleCreateSecretLink}>Share Secret
            </button>
        </p>
        <h1 className={styles.code}>{secretLink} &nbsp; 
          <CopyToClipboardButton text={secretLink} />
        </h1>
        <p className={styles.description}>Notice: do not open link because it's available only for one open</p>

    </>
  );
}

