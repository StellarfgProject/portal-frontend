import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Person.css';

const Person = () => {
  const { email } = useParams(); // Extract email from route parameters
  const [person, setPerson] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAdminAction, setIsAdminAction] = useState(false); // True: Make admin, False: Remove admin

  console.log(email); // Logs the email from route parameters

  // Dummy adminService.js function
  const fetchPersonDetails = async (email) => {
    // Simulate an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          firstName: 'John',
          lastName: 'Doe',
          email: email,
          active: true,
          notify: false,
          isAdmin: false,
          isSalrefiEmployee: true,
          notifyIncomplete: false,
          domains: [
            { id: 1, name: 'domain1.com', link: '/admin/domain/domain1.com' },
            { id: 2, name: 'domain2.com', link: '/admin/domain/domain2.com' },
          ],
        });
      }, 1000);
    });
  };

  useEffect(() => {
    fetchPersonDetails(email).then((data) => setPerson(data));
  }, [email]);

  const handleToggleField = (field) => {
    setPerson({ ...person, [field]: !person[field] });
  };

  const handleToggleAdmin = (isAdminAction) => {
    setIsAdminAction(isAdminAction); // Set action type (grant or remove admin)
    setShowModal(true); // Show confirmation modal
  };

  const confirmAdminToggle = () => {
    setPerson({ ...person, isAdmin: isAdminAction }); // Update admin status
    setShowModal(false); // Close the modal
    alert(`User ${isAdminAction ? 'granted' : 'removed'} admin rights.`);
  };

  const handlePasswordChange = () => {
    alert('Password change initiated!');
  };

  if (!person) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container person-page mt-5">
      <h2 className="text-center mb-4">Manage Person</h2>
      <div className="card shadow person-details-card">
        <div className="card-body">
          <h5>{`${person.firstName} ${person.lastName}`}</h5>
          <p className="text-muted">{person.email}</p>
          <div className="options mt-4">
            {/* Active */}
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="activeSwitch"
                checked={person.active}
                onChange={() => handleToggleField('active')}
              />
              <label className="form-check-label" htmlFor="activeSwitch">
                Active
              </label>
            </div>
            {/* Notify */}
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="notifySwitch"
                checked={person.notify}
                onChange={() => handleToggleField('notify')}
              />
              <label className="form-check-label" htmlFor="notifySwitch">
                Notify
              </label>
            </div>
            {/* Admin */}
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="adminSwitch"
                checked={person.isAdmin}
                onChange={() => handleToggleAdmin(!person.isAdmin)}
              />
              <label className="form-check-label" htmlFor="adminSwitch">
                Admin
              </label>
            </div>
            {/* Salrefi Employee */}
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="salrefiSwitch"
                checked={person.isSalrefiEmployee}
                onChange={() => handleToggleField('isSalrefiEmployee')}
              />
              <label className="form-check-label" htmlFor="salrefiSwitch">
                Salrefi Employee?
              </label>
            </div>
            {/* Notify Incomplete */}
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="notifyIncompleteSwitch"
                checked={person.notifyIncomplete}
                onChange={() => handleToggleField('notifyIncomplete')}
              />
              <label className="form-check-label" htmlFor="notifyIncompleteSwitch">
                Notify Incomplete
              </label>
            </div>
          </div>
          <button className="btn btn-primary mt-4" onClick={handlePasswordChange}>
            Change Password
          </button>
        </div>
      </div>
      {/* Domains Section */}
      <div className="domains mt-5">
        <h4>Domains</h4>
        <div className="row">
          {person.domains.map((domain) => (
            <div className="col-md-4 mb-3" key={domain.id}>
              <div className="card domain-card shadow-sm">
                <div className="card-body">
                  <a href={domain.link} className="stretched-link">
                    {domain.name}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Admin Toggle */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Action</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to {isAdminAction ? 'grant' : 'remove'} admin rights for this user?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={confirmAdminToggle}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Person;
