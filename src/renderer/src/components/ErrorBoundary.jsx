import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error in React Component:', error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ textAlign: "center", padding: "20px", border: "1px solid red", background: "#ffeeee" }}>
                    <h2 style={{ color: "red" }}>⚠️ Oops! Something went wrong.</h2>
                    <p>We encountered an unexpected issue. Try refreshing the page or go back home.</p>
                    <a href="/" style={{ color: "blue", textDecoration: "underline" }}>Return to Home</a>

                    {/* Display error details */}
                    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid gray", background: "#f8f8f8" }}>
                        <h4>Error Details:</h4>
                        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", color: "darkred" }}>
                            {this.state.error?.toString()}
                        </pre>
                        {this.state.errorInfo && (
                            <div style={{ marginTop: "10px" }}>
                                <h4>Call Stack:</h4>
                                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", color: "darkblue" }}>
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
