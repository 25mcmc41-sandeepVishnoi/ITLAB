const BASE_URL = "http://localhost:5000/api/users";

// GET users
export const getUsers = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// ADD user
export const addUser = async (user) => {
  await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

// DELETE user
export const deleteUser = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};