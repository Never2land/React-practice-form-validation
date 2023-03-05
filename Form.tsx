import React, { useEffect, useState } from 'react';
import { formConfiguration } from './configurations';
import './style.css';

export default function Form() {
  const [formState, setFormState] = useState(
    formConfiguration.map((item) => ({
      ...item,
      stateField: {
        value: item.stateDefault,
        error: null,
      },
    }))
  );

  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   constructFormState();
  // }, []);

  // const constructFormState = () => {
  //   const initialFormState = formConfiguration.map((item) => ({
  //     ...item,
  //     stateField: {
  //       value: item.stateDefault,
  //       error: null,
  //     },
  //   }));
  //   setFormState(initialFormState);
  // };
  const nameValidator = (name) => name.length >= 3;

  const handleValidations = () => {
    const firstName = formState[0];
    if (!nameValidator(firstName.stateField.value)) {
      const updatedFormState = formState.map((el) =>
        el.label === 'First Name'
          ? {
              ...el,
              stateField: {
                ...el.stateField,
                error: 'First Name cannot be less than 3 characters',
              },
            }
          : el
      );
      console.log(updatedFormState);
      setFormState(updatedFormState);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit', handleValidations());
    setSuccess(handleValidations());
  };

  const handleTextField = (item, text) => {
    const updatedItems = formState.map((form) =>
      form.label === item.label
        ? {
            ...form,
            stateField: {
              value: text,
              error: null,
            },
          }
        : form
    );
    setFormState(updatedItems);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {formState.map((item) => (
        <div className="form-element">
          <label className="label">{item.label}</label>
          <input
            type={item.type}
            className="input"
            value={item.stateField.value}
            placeholder={item.placeholder}
            onChange={(event) => handleTextField(item, event.target.value)}
          />
          {item.stateField.error && (
            <small className="error">{item.stateField.error}</small>
          )}
        </div>
      ))}

      <button type="submit" className="button">
        Register
      </button>
      {success && (
        <p className="success">Form has been submitted succesfully!</p>
      )}
    </form>
  );
}
