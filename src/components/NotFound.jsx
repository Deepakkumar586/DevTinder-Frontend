// components/NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <a href="/" style={styles.link}>Go to Home</a>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: '3rem',
    color: '#dc3545',
  },
  message: {
    fontSize: '1.2rem',
    color: '#6c757d',
    marginBottom: '1rem',
  },
  link: {
    textDecoration: 'none',
    fontSize: '1rem',
    color: '#007bff',
    borderBottom: '1px solid #007bff',
  },
};

export default NotFound;
