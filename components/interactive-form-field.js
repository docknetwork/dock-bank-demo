import React from 'react';

const InteractiveFormField = ({
  id,
  type,
  name,
  placeholder,
  value,
  verified,
  isValueSet,
  setIsValueSet,
}) => {
  function handleInputClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!isValueSet) {
      setIsValueSet(true);
    }
  }

  return (
    <div className="flex items-center gap-2 mb-8">
      <div className="flex items-center w-full px-3 py-2 border-2 rounded">
        <input
          id={id}
          className="w-full pl-2 border-none outline-none "
          type={type}
          name={name}
          placeholder={placeholder}
          value={verified || isValueSet ? value : ''}
          onClick={handleInputClick}
          readOnly
        />
      </div>
      {verified && (
        <p className="text-green-500 whitespace-nowrap">✓ Verified</p>
      )}
    </div>
  );
};

export default InteractiveFormField;
