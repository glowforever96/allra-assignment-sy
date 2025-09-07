import { useEffect, useState } from "react";

function useSaveLocalStroage() {
  const [isSaveId, setIsSaveId] = useState(false);
  const [businessNumber, setBusinessNumber] = useState("");

  const handleToggleSaveId = (checked: boolean) => {
    setIsSaveId(checked);
    if (!checked) {
      localStorage.removeItem("saved-business-number");
    } else if (businessNumber.length === 10) {
      localStorage.setItem("saved-business-number", businessNumber);
    }
  };

  const handleBusinessNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    setBusinessNumber(inputValue);

    if (isSaveId) {
      localStorage.setItem("saved-business-number", inputValue);
    }
  };

  useEffect(() => {
    const savedId = localStorage.getItem("saved-business-number");
    if (savedId) {
      setBusinessNumber(savedId);
      setIsSaveId(true);
    }
  }, []);

  return {
    isSaveId,
    businessNumber,
    handleToggleSaveId,
    handleBusinessNumberChange,
  };
}

export default useSaveLocalStroage;
