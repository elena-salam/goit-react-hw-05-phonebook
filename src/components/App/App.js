import React, {Component} from 'react';
import { CSSTransition } from 'react-transition-group';
import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import Layout from '../Layout/Layout';
import Notification from '../Notification/Notification'
import NotificationTransition from '../Notification/NotificationTransition.module.css'
import {v4 as uuid } from 'uuid';
import transitionTitle from './transitionTitle.module.css';
import styles from './App.module.css';


export default class App extends Component {
    state = {
        contacts: [],
        filter: '',
        isOpenModal: false,
       
    }

    componentDidMount(){
        const savedContacts = localStorage.getItem('contacts');
        if(savedContacts){
            // console.log(persistedContacts);
            // console.log(JSON.parse(persistedContacts));
            this.setState({
                contacts: JSON.parse(savedContacts),
            });
        }
    }
    
    componentDidUpdate(prevProps, prevState){
        // console.log('prevState: ', prevState);
        // console.log('thisState: ', this.state);
        if(prevState.contacts !== this.state.contacts){
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        }
    }
    handleContactAdd = contact =>{
          const {contacts} = this.state;
          const isIncludes = contacts.some(item =>item.name ===contact.name);
          if(isIncludes){
              this.setState({isOpenModal:true});
              setTimeout(() => {
                  this.setState({isOpenModal: false});
              }, 1500)
              return;
          }
          const newContactData ={
              id: uuid(),
              name:contact.name,
              number:contact.number,
          }
          this.setState(prevState =>({
              contacts: [...prevState.contacts, newContactData],
          }));
        }  

        handleInputChange = e => {
            const {name, value} = e.target;
            this.setState({[name]: value,});
        }
        handleChangeFilter = filter => {
            this.setState({filter});
        }
        handleDeleteContact = contactId =>
        this.setState(prevState=>({
            contacts:prevState.contacts.filter(contact => contact.id !==contactId),
        }));
        
        filterContacts=()=>{
            const {contacts, filter} = this.state;
            return contacts.filter(contact =>
                contact.name.toLowerCase().includes(filter.toLowerCase()),
                );
        };


    render(){
        const {filter, contacts, isOpenModal} = this.state;
        const flteredContacts = this.filterContacts();

        return(
            <Layout>
                <CSSTransition
                    in={true}
                    appear={true}
                    timeout={500}
                    classNames={transitionTitle}
                >
                    <h2 className={styles.logo}>Phonebook</h2>
                </CSSTransition>
                <section className={styles.section}>
                <ContactForm onAddContact={this.handleContactAdd}/>
                </section>
                
                <h2 className={styles.title}>Contacts</h2>
                {contacts.length > 0 ? (
                    <section className={styles.section}>
                        <Filter value={filter} onChangeFilter={this.handleChangeFilter}/>
                        <ContactList contacts={flteredContacts} onDeleteContact={this.handleDeleteContact}/>
                    </section>
                ) : (
                    <h2>Phonebook is empty</h2> 
                )}
                <CSSTransition
                    in={isOpenModal}
                    appear={true}
                    classNames={NotificationTransition}
                    timeout={250}
                    unmountOnExit
                >
                    <Notification/>
                </CSSTransition>
            </Layout>
        );
    } 
}
