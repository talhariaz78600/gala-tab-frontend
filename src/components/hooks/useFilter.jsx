import { useState } from "react";

const useFilters = () => {
  const [modalFilters, setModalFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFiltersApply = (filters) => {
    setModalFilters(filters);
    const valuesArray = Object.values(filters).flat();
    const filterChips = Object.entries(filters)
      .filter(([key, value]) => value && value.length > 0)
      .map(([key, value]) => ({ key, value }));
    setSelectedFilters(valuesArray);
  };

  return {
    modalFilters,
    setModalFilters,
    selectedFilters,
    setSelectedFilters,
    handleFiltersApply,
  };
};

export default useFilters;