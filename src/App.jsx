// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import contactsList from "./contacts.json";


// Iteration 1 | Display 5 Contacts
function App(props) {
  const firstContacts = contactsList.slice(0, 5)
  const [contacts, setContacts] = useState(firstContacts)
  // console.log("list: ", contacts)

  // Iteration 3 | Add New Random Contacts - get random contact with randomIndex, retrieve and check contact id
  const addRandomContact = () => {
    const randomIndex = Math.floor(Math.random() * contactsList.length - 1)
    let inList = false;
    for (let i = 0; i < firstContacts.length; i++) {
      if (contactsList[randomIndex].id === firstContacts[i].id) {
        inList = true;
      } else {
        setContacts([contactsList[randomIndex], ...contacts]);
      }
    }
  }

  //Iteration 4 | Sort Contacts by Name and Popularity - localeCompare && Array.prototype.sort()
  const sortByPopularity = () => {
    const sortedContactsAscending = contacts.sort((contact1, contact2) => {
      return contact2.popularity - contact1.popularity;
    })
    setContacts([...sortedContactsAscending])
  }

  const sortByName = () => {
    const sortedContacts = contacts.sort((contact1, contact2) => {
      if (contact1.name < contact2.name) {
        return -1
      }
      if (contact1.name > contact2.name) {
        return 1;
      }
      return 0;
    })
    setContacts([...sortedContacts])
  }

  // Iteration 5 | Remove Contacts
  const deleteContact = (id) => {
    const filteredContact = contacts.filter((contact) => {
      return contact.id !== id;
    })
    setContacts([...filteredContact])
  }


  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={sortByName}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {contacts.map((contact) => {
          return (
              <tr key={contact.id}>
                <td><img src={contact.pictureUrl} alt={contact.name} style={{ width: '80px' }} /></td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                {/* Iteration 2 | Conditionally Display Awards Info */}
                <td>{contact.wonOscar ? <p>🏆</p> : <p></p>}</td>
                <td>{contact.wonEmmy ? <p>🏆</p> : <p></p>}</td>
                {/* https://vegibit.com/how-to-delete-an-item-from-an-array-in-react/ */}
                <td><button onClick={() => deleteContact(contact.id)}> Delete </button></td>
              </tr>
          )
        })}
         </tbody>
      </table>
    </div>
  );
}

export default App;
