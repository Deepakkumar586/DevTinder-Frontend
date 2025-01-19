import React from "react";

const NotFound = () => {
  return (
    <div style={styles.container} className="flex flex-col">
      <h1 style={styles.heading}>404 - Oops! Page Not Found 😅</h1>
      <p style={styles.message}>
        Well, this is awkward! 😬 The page you're looking for seems to have gone
        on a vacation. Don't worry, it's not you, it's us. 🧐
      </p>
      <a href="/" style={styles.link}>
        Take me back to the Home Page
      </a>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: "3rem",
    color: "#dc3545",
  },
  message: {
    fontSize: "1.2rem",
    color: "#6c757d",
    marginBottom: "1rem",
  },
  link: {
    textDecoration: "none",
    fontSize: "1rem",
    color: "#007bff",
    borderBottom: "1px solid #007bff",
  },
};

export default NotFound;
