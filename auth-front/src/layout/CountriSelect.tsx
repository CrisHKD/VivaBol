import React, { useState } from "react";
import Select from "react-select";
import countries from "world-countries";

// Definir la estructura del país
interface CountryOption {
  value: string;
  label: string;
}

// Formatear los países para el select
const formattedCountries: CountryOption[] = countries.map((country) => ({
  value: country.cca2, // Código del país (ej. "US", "MX")
  label: country.name.common, // Nombre del país (ej. "United States", "México")
}));

const CountrySelect: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);

  return (
    <Select
      options={formattedCountries}
      value={selectedCountry}
      onChange={setSelectedCountry}
      placeholder="Seleccione un país"
    />
  );
};

export default CountrySelect;