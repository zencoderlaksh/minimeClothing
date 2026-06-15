const PageLoader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid #e5e7eb',
      borderTop: '3px solid #111',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
    }} />
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

export default PageLoader