"use client";

import { Component, type ReactNode } from "react";
import { WebglFallback } from "./ui/WebglFallback";

type ConfiguratorErrorBoundaryProps = { children: ReactNode };
type ConfiguratorErrorBoundaryState = { hasError: boolean };

export class ConfiguratorErrorBoundary extends Component<
  ConfiguratorErrorBoundaryProps,
  ConfiguratorErrorBoundaryState
> {
  state: ConfiguratorErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <WebglFallback />;
    }
    return this.props.children;
  }
}
