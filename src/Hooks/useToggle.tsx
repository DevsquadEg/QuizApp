import { useState, useCallback } from "react";

// Now accepts optional boolean to explicitly set the value
const useToggle = (defaultValue = false): [boolean, (value?: boolean) => void] => {
  const [value, setValue] = useState<boolean>(defaultValue);

  const toggleValue = useCallback((val?: boolean) => {
    if (typeof val === "boolean") {
      setValue(val); // explicitly set true or false
    } else {
      setValue((prev) => !prev); // toggle normally
    }
  }, []);

  return [value, toggleValue];
};

export default useToggle;
