'use client';

import { usePeopleApi } from './hooks/usePeopleApi';
import PersonCard from './components/PersonCard';
import HistorySidebar from './components/HistorySidebar';
import { useState, useEffect, useMemo } from 'react';
import './Card.module.css';
import { Person } from './types/person';

export default function Home() {
  const { currentPerson, personHistory, loading, error, fetchData } = usePeopleApi();
  const [selectedPerson, setSelectedPerson] = useState(currentPerson);
  const [deletedEmails, setDeletedEmails] = useState<string[]>([]);

  useEffect(() => {
    setSelectedPerson(currentPerson);
  }, [currentPerson]);

  const filteredHistory = useMemo(() => {
    return personHistory.filter((p) => {
      if (!p.email) return true;
      if (currentPerson && p.email === currentPerson.email) return false;
      if (deletedEmails.includes(p.email)) return false;
      return true;
    });
  }, [personHistory, currentPerson, deletedEmails]);

  const handleSelect = (person: Person) => {
    setSelectedPerson(person);
  };

  const handleDelete = (email: string) => {
    setDeletedEmails((prev) => [...prev, email]);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          borderRight: '1px solid #ccc',
          padding: '10px',
          overflowY: 'auto',
        }}
      >
        <HistorySidebar
          personHistory={filteredHistory}
          onSelect={handleSelect}
          onDelete={handleDelete}
        />
      </div>

      {/* Main content area */}
     
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        
        {error ? (
          <div>Error loading data</div>
        ) : loading ? (
          // Show loading in the PersonCard area only
          <p>Loading...</p>
        ) : (
          <PersonCard person={selectedPerson} fetchData={fetchData} />
        )}
      </div>
    </div>
  );
}