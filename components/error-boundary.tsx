"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log the error to an error monitoring service, e.g., Sentry
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-muted/50">
          {/* Error icon */}
          <AlertTriangle className="h-12 w-12 text-destructive" />

          {/* Error Message */}
          <div className="text-center space-y-2 mt-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              Something went wrong!
            </h1>
            <p className="max-w-[600px] text-muted-foreground text-lg">
              We apologize for the inconvenience. Please try again or return to the homepage.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-6">
            {/* Reset button */}
            <Button onClick={this.resetErrorBoundary}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            {/* Back to Home button */}
            <Button variant="outline" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
