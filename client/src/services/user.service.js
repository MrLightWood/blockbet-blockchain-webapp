import handleResponse from "../helpers/handleResponse";

export const userService = {
  login,
  register,
  logout,
  getStatus,
};

function getStatus() {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  return fetch('/users/status', requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function register(email, password) {
  const requestOptions = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password}),
  };

  return fetch('/users/register', requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function login(email, password, rememberMe) {
  const requestOptions = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, rememberMe }),
  };

  return fetch('/users/authenticate', requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function logout() {
  const requestOptions = {
    method: "POST",
  };

  return fetch('/users/logout', requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}
