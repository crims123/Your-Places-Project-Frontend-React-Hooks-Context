import { useState } from 'react';

const useInput = (initialState) => {
  const [values, setValues] = useState(initialState);

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return [values, setValues, handleOnChange];
};

export default useInput;