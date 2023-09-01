import { useState, useEffect } from 'react';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';

const LOCAL_STORAGE_KEY = 'contacts';
export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
  );
  const [filter, setFilter] = useState('');

  //  setContacts(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
  useEffect(
    (_, prevContacts) => {
      if (prevContacts !== contacts) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
      }
    },
    [contacts]
  );

  const handelAddContact = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), name, number },
    ]);
  };

  const applyFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handelChangeFilter = e => {
    setFilter(e.target.value);
  };

  const handelDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handelAddContact} />

      <h2>Contacts</h2>
      <Filter onChangeFilter={handelChangeFilter} filter={filter} />
      <ContactList
        contacts={applyFilter()}
        onDeleteContact={handelDeleteContact}
      />
    </div>
  );
};
