import React from "react";
import CreatableSelect from "react-select/creatable";
import { predefinedTags } from "../assets/data";

const TagSelection = ({ setSelectedTags }) => {
  const handleTagChange = (selectedOptions) => {
    const tags = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedTags(tags);
  };

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%", // Make the selection area full width
      maxWidth: "500px", // Or set a max width if needed
      marginBottom: "1rem",
    }),
    control: (provided) => ({
      ...provided,
      padding: "0.5rem",
    }),
  };

  return (
    <CreatableSelect
      isMulti
      options={predefinedTags}
      onChange={handleTagChange}
      styles={customStyles}
      placeholder="Select tags"
    />
  );
};

export default TagSelection;
