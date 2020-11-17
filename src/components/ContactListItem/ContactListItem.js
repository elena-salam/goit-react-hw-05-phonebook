import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactListitem.module.css';

const ContactListItem =({name, number, onDelete}) =>{
    return(
        <li className={styles.item}>
            <span className={styles.span}>{name}: {number}</span>
            <button className={styles.button} type="button" onClick={onDelete}>
                X
            </button>
        </li>
    )
}

ContactListItem.propTypes={
    name: PropTypes.string,
    number: PropTypes.string,
    onDelete: PropTypes.func,
}

export default ContactListItem;