import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CreateCommunity from '../CommunityComponents/communities/CreateCommunity';

const sampleOptions = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Business Administration',
  'Psychology',
  'Mathematics',
  'Biology',
  'Chemistry',
  'Physics',
  'Sociology',
];

function Search({ onSearch, onCancel }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = sampleOptions.filter(
    (option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase()) &&
      searchTerm.trim() !== ''
  );

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setSearchTerm(option);
    setShowOptions(false);
  };

  const handleRemoveOption = () => {
    setSearchTerm('');
    setSelectedOption('');
  };

  const handleSearch = () => {
    // console.log(Searching for ${ searchTerm });
    setShowOptions(false);
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleCancel = () => {
    setShowOptions(true);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <SearchIcon className="pl-[2px]" />
        <TextField
          type="search"
          className="block w-full text-sm rounded-lg bg-gray-50"
          placeholder="Search Community"
          value={searchTerm}
          size='small'
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowOptions(true);
          }}
        />
        <button
          type="button"
          onClick={onSearch ? null : handleSearch}
          className="text-white bg-blue-700 hover:bg-blue-500 font-medium rounded-lg text-sm ml-2 px-4 py-2"
        >
          Search
        </button>
        {showOptions && filteredOptions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border rounded-md border-gray-300 mt-2">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CombinedComponent() {
  const [showCreateCommunityForm, setShowCreateCommunityForm] = useState(false);
  const [activeTab, setActiveTab] = useState('join'); // 'join' or 'create'

  const handleCreateCommunityClick = () => {
    setShowCreateCommunityForm(true);
    setActiveTab('join'); // Switch to the 'Join Community' tab
  };

  const handleCancelCreateCommunity = () => {
    setShowCreateCommunityForm(false);
    setActiveTab('join'); // Switch to the 'Join Community' tab
  };

  const handleCreateCommunity = () => {
    // console.log(Creating community);
    setShowCreateCommunityForm(false);
    setActiveTab('join'); // Switch to the 'Join Community' tab
  };

  return (
    <div>
      {!showCreateCommunityForm && activeTab === 'join' && (
        <React.Fragment>
          <Search onSearch={handleCreateCommunityClick} />
          <button
            type="button"
            onClick={handleCreateCommunityClick}
            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2 mt-4"
          >
            Create Community
          </button>
        </React.Fragment>
      )}

      {showCreateCommunityForm && (
        <CreateCommunity
          onCancel={handleCancelCreateCommunity}
          onClose={() => setShowCreateCommunityForm(false)}
        />
      )}
    </div>
  );
}