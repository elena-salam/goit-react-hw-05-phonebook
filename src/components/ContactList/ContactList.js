import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import ContactListItem from '../ContactListItem/ContactListItem';
import PropTypes from 'prop-types';
import itemTransition from './itemTransition.module.css';


const ContactList = ({contacts, onDeleteContact}) =>{
    return(
        <TransitionGroup component="ul">
            {contacts.map(({id, name, number}) => (
                <CSSTransition key={id}
                timeout={250}
                classNames={itemTransition}>
                    <ContactListItem 
                    name={name} 
                    number={number} 
                    onDelete={()=>onDeleteContact(id)}/>
                </CSSTransition>
            ))}
        </TransitionGroup>
    )
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    onDeleteContact: PropTypes.func,
}

export default ContactList;