import React from 'react';
import styles from './Notification.module.css';

const Notification =() => (
    <div className={styles.container}>
        <p className={styles.notificationContent}>Contact is already exist</p>
    </div>
)

export default Notification;