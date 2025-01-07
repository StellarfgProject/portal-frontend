// People.js
import React from 'react';
import PersonCard from './PersonCard';
import './People.css';

const People = () => {
  // Sample data for people
  const people = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      active: true,
      notify: false,
      isAdmin: false,
      isSalrefiEmployee: true,
      notifyIncomplete: false,
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      active: true,
      notify: true,
      isAdmin: true,
      isSalrefiEmployee: false,
      notifyIncomplete: true,
    },
  ];

  const handleMakeAdmin = (id) => {
    alert(`Make Admin clicked for user with ID: ${id}`);
    // Add your logic here
  };

  const handleChangePassword = (id) => {
    alert(`Change Password clicked for user with ID: ${id}`);
    // Add your logic here
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Manage People</h2>
      <div className="row">
        {people.map((person) => (
          <div className="col-md-6 col-lg-4 mb-4" key={person.id}>
            <PersonCard
              person={person}
              onMakeAdmin={() => handleMakeAdmin(person.id)}
              onChangePassword={() => handleChangePassword(person.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
