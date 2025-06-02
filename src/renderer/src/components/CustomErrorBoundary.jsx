import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
//import { ipcRenderer } from 'electron'; // Import Electron's IPC

const sendErrorToMain = (error, stackTrace) => {
    // ipcRenderer.send('renderer-error', {
    //     message: error.toString(),
    //     stack: errorInfo.componentStack,
    // });
    errors.sendToFile(error, stackTrace)
    console.error("Error:", error, stackTrace)
};

const ErrorFallback = ({ error }) => {
    // Capture the stack manually
    const stackTrace = error?.stack || "Stack trace not available.";
    sendErrorToMain(error, stackTrace); // Send error to Electron main process

    return (
        <div style={{ textAlign: "center", padding: "20px", border: "1px solid red", background: "#ffeeee" }}>
            <h2 style={{ color: "red" }}>⚠️ Oops! Something went wrong.</h2>
            <p>We encountered an unexpected issue. Try refreshing the page or go back home.</p>
            <a href="/" style={{ color: "blue", textDecoration: "underline" }}>Return to Home</a>

            <div style={{ marginTop: "20px", padding: "10px", border: "1px solid gray", background: "#f8f8f8" }}>
                <h4>Error Details:</h4>
                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", color: "darkred" }}>
                    {error.toString()}
                </pre>

                <h4>Call Stack:</h4>
                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", color: "darkblue" }}>
                    {stackTrace}
                </pre>
            </div>
        </div>
    );
};

const CustomErrorBoundary = ({ children }) => (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={sendErrorToMain}>
        {children}
    </ErrorBoundary>
);

export default CustomErrorBoundary;
