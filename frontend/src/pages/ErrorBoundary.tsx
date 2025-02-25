import * as React from "react";
import {Button} from "@/components/ui/button.tsx";

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
    state: ErrorBoundaryState = {hasError: false};

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    handleReload = () => {
        this.setState({hasError: false});
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center gap-2">
                    <img src="/error.png" alt="Error Image"/>
                    <div className={"space-y-7"}>
                        <h1 className={"font-bold text-xl"}>Something went wrong</h1>
                        <Button
                            onClick={this.handleReload}
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
