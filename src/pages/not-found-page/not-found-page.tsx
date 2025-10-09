import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'sans-serif',
        backgroundColor: '#f8f9fa',
        color: '#333',
      }}
    >
      <h1 style={{ fontSize: '6rem', margin: 0 }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Page Not Found</p>
      <Link
        to="/"
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#4481c3',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 500,
        }}
      >
        Вернуться на главную
      </Link>
    </div>
  );
}

export default NotFoundPage;
