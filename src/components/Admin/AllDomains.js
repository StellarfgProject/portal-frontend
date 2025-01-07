// AllDomains.js
import React, { useState } from 'react';
import DomainCard from './DomainCard';
import './AllDomains.css';

const AllDomains = () => {
  const [domains, setDomains] = useState([
    {
      id: 1,
      domain: 'example.com',
      name: 'Example Domain',
    },
    {
      id: 2,
      domain: 'demo.com',
      name: 'Demo Domain',
    },
  ]);

  const addDomain = () => {
    const newDomain = prompt('Enter domain details (domain,name):');
    if (newDomain) {
      const [domain, name] = newDomain.split(',');
      setDomains([...domains, { id: domains.length + 1, domain, name }]);
    }
  };

  return (
    <div className="container mt-5 all-domains">
      <h2 className="text-center mb-4">Manage Domains</h2>
      <button className="btn btn-primary mb-4" onClick={addDomain}>
        Add Domain
      </button>
      <div className="row">
        {domains.map((domain) => (
          <div className="col-md-6 col-lg-4 mb-3" key={domain.id}>
            <DomainCard domain={domain} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDomains;
