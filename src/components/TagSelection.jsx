import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { predefinedTags } from '../assets/data';

const TagSelection = ({ setSelectedTags }) => {
  
  const handleTagChange = (selectedOptions) => {
    const tags = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedTags(tags);
  };

  return (
    <CreatableSelect 
      isMulti 
      options={predefinedTags} 
      onChange={handleTagChange} 
    />
  );
};

export default TagSelection;
