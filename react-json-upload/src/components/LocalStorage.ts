  // Function to handle setting the value in local storage
  export const setLocalStorage = (value: string) => {
    localStorage.setItem('id', value);
  };

  // Function to handle getting the value from local storage
  export const getLocalStorage = () => {
    const storedValue = localStorage.getItem('id');
    return storedValue || null;
  };