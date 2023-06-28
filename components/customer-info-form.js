import React, { useState } from 'react';

import Button from 'components/button';
import {
  textFields,
} from 'utils';

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
          value={verified || isValueSet ? value : null}
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

const CustomerInfoForm = ({
  handleFormSubmit,
  title,
  description,
  verified,
  children
}) => {
  const [isInputValuesSet, setIsInputValuesSet] = useState(
    textFields.reduce((acc, field) => {
      acc[field.id] = false;

      return acc;
    }, {})
  );

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-full max-w-lg p-8 mx-auto"
    >
      {title && (
        <h2 className="mb-6 font-bold text-gray-800 text-l">{title}</h2>
      )}
      {description && (
        <p className="mb-8 text-gray-800">{description}</p>
      )}
      {textFields.map((field) => (
        <InteractiveFormField
          key={field.id}
          id={field.id}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={field.value}
          verified={verified}
          isValueSet={isInputValuesSet[field.id]}
          setIsValueSet={
            (value) => setIsInputValuesSet({ ...isInputValuesSet, [field.id]: value })
          }
        />
      ))}
      {children}
      <Button
        type="submit"
        className="block w-full"
        disabled={!verified && !Object.values(isInputValuesSet).every(Boolean)}
      >
        Submit
      </Button>
    </form>
  );
};

export default CustomerInfoForm;
