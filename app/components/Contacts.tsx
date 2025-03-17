import React from 'react';

interface Contact {
  id: number;
  name: string;
  role: string;
  email: string;
}

const contacts: Contact[] = [
  
  { id: 1, name: 'Aemail', role: 'CEO', email: 'aemail@gmail.com'},
  { id: 2, name: 'Bemail', role: 'CTO', email: 'bemail@gmail.com'},
  { id: 3, name: 'Cemail', role: 'COO', email: 'cemail@gmail.com'},  
  ];

  const Contacts: React.FC = () => {
    return (
      <div>
        <h1>For questions about this beauteous web page, please do not hesitate to contact:</h1>
        <ul className="flex space-x-4">
          {contacts.map(contact => (
            <li key={contact.id}>
              <strong>{contact.name}</strong>: {contact.email}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Contacts;