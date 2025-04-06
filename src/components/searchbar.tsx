import { User } from "../types";
import { SearchbarProps } from "../types";

interface SearchbarProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  inputCheck: boolean;
  checkInputValue: (value: boolean) => void;
  users: User[];
  selectCity: string | null;
  setCity: (value: string | null) => void;
}

const Searchbar: React.FC<SearchbarProps> = function ({
  inputValue, setInputValue, inputCheck, checkInputValue, users, selectCity, setCity,
}) {
  const cities: string[] = [...new Set(users.map((user) => user.address.city))];

  return (
    <center>
      <div className="searchbar">
        <div>
          <h1>Name</h1>
          <input
            type="text"
            className="txt"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} />
        </div>

        <div>
          <h1>City</h1>
          <select
            className="txt"
            id="dropdown"
            value={selectCity ?? ""}
            onChange={(e) => {
              const selected = e.target.value;
              setCity(selected === "" ? null : selected);
            } }
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h1>Highlight oldest per city</h1>
          <input
            type="checkbox"
            checked={inputCheck}
            onChange={(e) => checkInputValue(e.target.checked)} />
        </div>
      </div>
    </center>
  );
};

export default Searchbar;
