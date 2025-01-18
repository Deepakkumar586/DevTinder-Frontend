// Production mode

// export const BASE_URL = "/api";

// dev
// export const BASE_URL = 'http://localhost:8888'
export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:8888" : "/api";