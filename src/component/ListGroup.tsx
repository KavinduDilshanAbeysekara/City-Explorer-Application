import React from "react";

interface City {
  id: number;
  name: string;
  description: string;
}

interface ListGroupProps {
  cities: City[];
  selectedCityId: number | null;
  onSelectCity: (id: number) => void;
}

const ListGroup: React.FC<ListGroupProps> = ({
  cities,
  selectedCityId,
  onSelectCity,
}) => {
  return (
    <ul className="list-group">
      {cities.map((city) => (
        <li
          key={city.id}
          className={`list-group-item ${
            selectedCityId === city.id ? "active" : ""
          }`}
          onClick={() => onSelectCity(city.id)}
          style={{ cursor: "pointer" }}
        >
          {city.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
