import { useState } from 'react';
import SearchFilter from '../SearchFilter';

export default function SearchFilterExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroup, setBloodGroup] = useState('All');

  return (
    <div className="p-6">
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedBloodGroup={bloodGroup}
        onBloodGroupChange={setBloodGroup}
      />
    </div>
  );
}
