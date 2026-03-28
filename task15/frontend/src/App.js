import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { getUsers, addUser, deleteUser } from "./api";

function App() {
  const [users, setUsers] = useState([]);

  // load users
  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h1>CRUD Application</h1>

      <UserForm
        onAdd={async (user) => {
          await addUser(user);
          loadUsers();
        }}
      />

      <UserList
        users={users}
        onDelete={async (id) => {
          await deleteUser(id);
          loadUsers();
        }}
      />
    </div>
  );
}

export default App;