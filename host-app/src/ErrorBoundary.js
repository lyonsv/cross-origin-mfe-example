import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Microfrontend loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h3>🚨 Component Failed to Load</h3>
          <p>There was an error loading the remote component.</p>
          {this.props.fallback ? (
            this.props.fallback
          ) : (
            <div className="fallback-component">
              <p>Using fallback component instead.</p>
              <button onClick={() => window.location.reload()}>
                Reload Page
              </button>
            </div>
          )}
          <details>
            <summary>Error Details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;