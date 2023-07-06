import React, { useState } from 'react';

import Button from 'components/button';
import InteractiveFormField from 'components/interactive-form-field';
import {
  textFields,
} from 'utils';

const CustomerInfoForm = ({
  handleFormSubmit,
  title,
  description,
  verified,
  children
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInputValuesSet, setIsInputValuesSet] = useState(
    textFields.reduce((acc, field) => {
      acc[field.id] = false;

      return acc;
    }, {})
  );

  const onSubmit = async (e) => {
    try {
      setIsLoading(true);
      await handleFormSubmit(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-lg p-8 mx-auto md:max-w-4xl"
    >
      {title && (
        <h2 className="mb-6 font-bold text-gray-800 text-l">{title}</h2>
      )}
      {description && (
        <p className="mb-8 text-gray-800">{description}</p>
      )}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div>
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
        </div>
        <div>
          {children}
        </div>
      </div>
      <Button
        type="submit"
        className="block w-full"
        disabled={isLoading || (!verified && !Object.values(isInputValuesSet).every(Boolean))}
      >
        Submit
      </Button>
    </form>
  );
};

export default CustomerInfoForm;
