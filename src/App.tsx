import React, { useState, useEffect } from "react";
import ListGroup from "./component/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


interface City {
  id: number;
  name: string;
  description: string;
}

const App: React.FC = () => {
  const [cities, setCities] = useState<City[]>(() => {
    const savedCities = localStorage.getItem("cities");
    return savedCities ? JSON.parse(savedCities) : [
      { id: 1, name: "Colombo", description: "Capital city of Sri Lanka" },
      { id: 2, name: "Kandy", description: "Sacred city with a famous temple" },
      { id: 3, name: "Galle", description: "Historic city with a fort" },
      { id: 4, name: "Jaffna", description: "Cultural city in the north" },
      { id: 5, name: "Nuwara Eliya", description: "Botanical Garden in Sri Lanka" }
    ];
  });

  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [newCityName, setNewCityName] = useState<string>("");
  const [newCityDescription, setNewCityDescription] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const handleCitySelect = (id: number) => {
    setSelectedCityId(id);
  };

  const handleAddCity = () => {
    if (newCityName.trim() === "" || newCityDescription.trim() === "") {
      alert("Please provide both city name and description.");
      return;
    }

    const newCity: City = {
      id: cities.length + 1,
      name: newCityName,
      description: newCityDescription,
    };

    setCities([...cities, newCity]);
    setNewCityName("");
    setNewCityDescription("");
  };

  const handleResetSelection = () => {
    setSelectedCityId(null);
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">City Explorer</h1>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search for a city"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <h3>Available Cities</h3>
      <ListGroup
        cities={filteredCities}
        selectedCityId={selectedCityId}
        onSelectCity={handleCitySelect}
      />

      {selectedCityId && (
        <div className="mt-4">
          <h3>Description</h3>
          <p>
            {cities.find((city) => city.id === selectedCityId)?.description}
          </p>
        </div>
      )}

      <button
        className="btn btn-secondary mt-3"
        onClick={handleResetSelection}
        disabled={selectedCityId === null}
      >
        Reset Selection
      </button>

      <div className="mt-4">
        <h3>Add a New City</h3>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="City Name"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="City Description"
          value={newCityDescription}
          onChange={(e) => setNewCityDescription(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddCity}>
          Add City
        </button>
      </div>
    </div>
  );
};

export default App;
