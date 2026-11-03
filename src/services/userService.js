const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}
export async function createUser(userData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return response.json();
}
export async function updateUser(userId, userData) {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
}
export async function deleteUser(userId) {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "DELETE",
  });
  if(!response.ok){
    throw new Error("Failed to delete user");
  }
  return true;
}
