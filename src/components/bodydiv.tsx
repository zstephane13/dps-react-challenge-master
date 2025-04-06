import { User } from "../types";

interface BodydivProps {
  users: User[];
  inputCheck: boolean;
  oldestUsersByCity: { [key: string]: User };
}

export default function Bodydiv({
  users,
  inputCheck,
  oldestUsersByCity,
}: BodydivProps) {
  return (
    <div>
      {users.map((user: User) => (
        <div key={user.id}>
          {user.firstName} {user.lastName}
          {inputCheck && oldestUsersByCity[user.address.city]?.id === user.id && (
            <strong> (Oldest in city)</strong>
          )}
        </div>
      ))}
    </div>
  );
}
