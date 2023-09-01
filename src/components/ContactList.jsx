export function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          {contact.name}:{contact.number}
          <button onClick={() => onDeleteContact(contact.id)} type="button">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
