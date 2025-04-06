import { useState, useEffect, useMemo } from "react";
import Searchbar from "./components/searchbar";
import Bodydiv from "./components/bodydiv";
import { User, OldestUsersByCity } from "./types";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputCheck, setInputCheck] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectCity, setSelectCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://dummyjson.com/users");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data?.users ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const searchTerm = inputValue.toLowerCase();
      const cityMatch = selectCity ? user.address.city === selectCity : true;
      return fullName.includes(searchTerm) && cityMatch;
    });
  }, [users, inputValue, selectCity]);

  const oldestUsersByCity = useMemo(() => {
    return users.reduce<OldestUsersByCity>((acc, user) => {
      const city = user.address.city;
      if (!acc[city] || new Date(user.birthDate) < new Date(acc[city].birthDate)) {
        return { ...acc, [city]: user };
      }
      return acc;
    }, {});
  }, [users]);

  if (isLoading) return <div>Chargement en cours...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="App">
      <h1>Customer Relationship Management</h1>
      <Searchbar
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputCheck={inputCheck}
        checkInputValue={setInputCheck}
        users={users}
        selectCity={selectCity}
        setCity={setSelectCity}
      />
      <Bodydiv
        users={filteredUsers}
        inputCheck={inputCheck}
        oldestUsersByCity={oldestUsersByCity}
      />
    </div>
  );
};

export default App;