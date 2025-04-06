export interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: {
    city: string;
    // ajoutez d'autres champs d'adresse si nécessaire
  };
  // ajoutez d'autres champs utilisateur si nécessaire
}

export type OldestUsersByCity = Record<string, User>;
// Dans types.ts
export interface SearchbarProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  inputCheck: boolean;
  checkInputValue: (value: boolean) => void;
  users: User[];
  selectCity: string;
  setCity: (city: string) => void;
}

export interface BodydivProps {
  users: User[];
  inputCheck: boolean;
  oldestUsersByCity: OldestUsersByCity;
}