import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack)
    // e.g. Sentry.captureException(error, { extra: info })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', gap: '16px', padding: '24px',
          fontFamily: 'sans-serif', textAlign: 'center'
        }}>
          <h2>Something went wrong</h2>
          <p style={{ color: '#666', maxWidth: '400px' }}>
            An unexpected error occurred. Try refreshing the page.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '10px 24px', cursor: 'pointer',
              borderRadius: '6px', border: '1px solid #ccc',
              background: '#fff', fontSize: '14px'
            }}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary