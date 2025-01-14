import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Domain.css';
import PersonCardForDomains from './PersonCardForDomains';
import AddPerson from './AddPerson';

const Domain = () => {
  const { domainName } = useParams(); // Extract domain name from URL
  const [domain, setDomain] = useState(null);

  // Dummy adminService function to fetch domain details
  const fetchDomainDetails = async (domainName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          domain: domainName,
          name: 'Example Domain',
          applicationLink: 'https://example.com/app',
          contactEmail: 'contact@example.com',
          noReplyEmail: 'noreply@example.com',
          phone: '123-456-7890',
          people: [
            { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
            { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
          ],
        });
      }, 1000); // Simulate API delay
    });
  };

  useEffect(() => {
    fetchDomainDetails(domainName).then((data) => setDomain(data));
  }, [domainName]);

  const handleEditField = (field, value) => {
    setDomain({ ...domain, [field]: value });
  };

  const handleDeletePerson = (personId) => {
    if (window.confirm('Are you sure you want to permanently delete this person?')) {
      setDomain({
        ...domain,
        people: domain.people.filter((person) => person.id !== personId),
      });
    }
  };

  const handleAddPerson = (newPerson) => {
    setDomain({ ...domain, people: [...domain.people, newPerson] });
  };

  if (!domain) {
    return <div className="loading text-center mt-5">Loading domain details...</div>;
  }

  return (
    <div className="container domain-page mt-5">
      <h2 className="text-center mb-4">{domain.name}</h2>
      <div className="card shadow-sm domain-details-card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Domain</label>
                <input
                  type="text"
                  className="form-control"
                  value={domain.domain}
                  onChange={(e) => handleEditField('domain', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Application Link</label>
                <input
                  type="text"
                  className="form-control"
                  value={domain.applicationLink}
                  onChange={(e) => handleEditField('applicationLink', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Contact Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={domain.contactEmail}
                  onChange={(e) => handleEditField('contactEmail', e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>No Reply Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={domain.noReplyEmail}
                  onChange={(e) => handleEditField('noReplyEmail', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={domain.phone}
                  onChange={(e) => handleEditField('phone', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="mt-4">People Associated</h3>
      <div className="row mt-3">
        {domain.people.map((person) => (
          <div className="col-md-4" key={person.id}>
            <PersonCardForDomains person={person} onDelete={() => handleDeletePerson(person.id)} />
          </div>
        ))}
      </div>
      <AddPerson onAddPerson={handleAddPerson} />
    </div>
  );
};

export default Domain;
