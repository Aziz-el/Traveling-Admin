import React from 'react';

type State = { hasError: false } | { hasError: true; error: Error };

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Uncaught error in component tree', error, info);
  }

  render() {
    if ((this.state as any).hasError) {
      const err = (this.state as any).error as Error;
      return (
        <div className="p-8">
          <h2 className="text-red-600 text-lg mb-2">Произошла ошибка</h2>
          <pre className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm text-red-700">{err?.message}</pre>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}
