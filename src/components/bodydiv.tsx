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
    <center>
      <div className="div">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Birthday</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isOldest =
                inputCheck &&
                user.id === oldestUsersByCity[user.address.city]?.id;
              return (
                <tr key={user.id} className={isOldest ? "highlight" : ""}>
                  <td key={user.id} className={isOldest ? "highlight" : ""}>
                    {user.firstName}
                  </td>
                  <td key={user.id} className={isOldest ? "highlight" : ""}>
                    {user.address.city}
                  </td>
                  <td key={user.id} className={isOldest ? "highlight" : ""}>
                    {user.birthDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </center>
  );
}
