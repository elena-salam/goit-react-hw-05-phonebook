import React, {Component} from 'react';
import PropTypes from'prop-types';
import styles from './ContactForm.module.css';

export default class ContactForm extends Component{
    static propTypes={
        onAddContact: PropTypes.func,
    }

    state = {
        name: '',
        number: '',
    }

    handleSubmit = e =>{
        e.preventDefault();
        
        this.props.onAddContact({
            name: this.state.name,
            number: this.state.number,
        });
        this.setState({
            name:'',
            number: '',
        });
    }

    handleInputChange = e =>{
        const {name, value} = e.target;
        
        this.setState({
            [name]: value,
        })
       
    }

    render(){
        const {name, number} = this.state;
        return(
            <form onSubmit={this.handleSubmit}>
                <label className={styles.label}>
                    Name
                    <input 
                        className={styles.input}
                        type="text" value={name} 
                        onChange={this.handleInputChange} 
                        name="name" required/>
                </label>
                <label className={styles.label}>
                    Number
                    <input
                        className={styles.input} 
                        type="tel" value={number} 
                        onChange={this.handleInputChange} name="number" required/>
                </label>
                    <br/>
                    <button className={styles.button} type="submit">Add contact</button>
                
            </form>
        );
    }
}
