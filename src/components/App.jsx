import { Component } from 'react';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';

const LOCAL_STORAGE_KEY = 'contacts';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  componentDidMount() {
    this.setState({
      contacts: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
    });
  }

  handelAddContact = (name, number) => {
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), name, number }],
    }));
  };

  applyFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handelChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  handelDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.handelAddContact} />

        <h2>Contacts</h2>
        <Filter
          onChangeFilter={this.handelChangeFilter}
          filter={this.state.filter}
        />
        <ContactList
          contacts={this.applyFilter()}
          onDeleteContact={this.handelDeleteContact}
        />
      </div>
    );
  }
}
