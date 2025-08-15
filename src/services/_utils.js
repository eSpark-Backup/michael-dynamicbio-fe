export const prepareHeaders = (headers) => {
  const token = localStorage.getItem("token");
  const tempToken = localStorage.getItem("temp-token");
  if (tempToken) {
    headers.set("Authorization", `Bearer ${tempToken}`);
  } else if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  } 
  return headers;
};

console.log(import.meta.env.VITE_BASE_URL, "import.meta.env.VITE_BASE_URL")
export const baseUrl = import.meta.env.VITE_BASE_URL
