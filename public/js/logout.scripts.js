//Cerrar sesión
const logout = async () => {
  const response = await fetch("/api/session/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response) {
    localStorage.removeItem("cartId");
    localStorage.removeItem("currentPage");
    window.location.href = "/";
  }
  return response;
};
