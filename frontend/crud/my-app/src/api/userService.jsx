const API_URL = "http://localhost:5000/users";

export const fetchUsers = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addUser = async (user) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUser = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
