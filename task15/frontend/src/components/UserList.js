function UserList({ users, onDelete }) {
  return (
    <div>
      <h2>User List</h2>

      {users.map((u) => (
        <div key={u.id}>
          {u.name} | {u.email} | {u.age}
          <button onClick={() => onDelete(u.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default UserList;