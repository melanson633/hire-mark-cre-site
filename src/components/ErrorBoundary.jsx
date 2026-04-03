import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[ui-error]", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert">
          <p className="error-boundary-eyebrow">Application Error</p>
          <h1>Something failed while rendering this page.</h1>
          <p>Refresh and try again. If this keeps happening, contact Mark directly.</p>
          <a href="mailto:melanson633@gmail.com" className="button-primary">
            melanson633@gmail.com
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
