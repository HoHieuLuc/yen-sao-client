import React, { Component, ErrorInfo, ReactNode } from 'react';
import GenericError from './GenericError';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <GenericError
                statusCode={404}
                title='Trang này không tồn tại'
                description='Trang bạn đang truy cập không tồn tại, hãy kiểm tra lại đường dẫn.'
            />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
