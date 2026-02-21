import React, { Component } from 'react'
import { AlertCircle, RotateCcw } from 'lucide-react'

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <AlertCircle size={32} className="text-[#D7231A]" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 mb-2">Something went wrong</h2>
                    <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
                        An unexpected error occurred in this section of the app. We've logged the issue.
                    </p>
                    <button
                        onClick={() => {
                            this.setState({ hasError: false, error: null })
                            window.location.reload()
                        }}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#003087] text-white rounded-xl font-bold text-sm hover:bg-blue-900 transition-colors shadow-sm"
                    >
                        <RotateCcw size={15} /> Reload Page
                    </button>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <pre className="mt-8 text-left bg-gray-100 p-4 rounded-xl text-xs text-red-600 overflow-x-auto max-w-2xl w-full">
                            {this.state.error.toString()}
                        </pre>
                    )}
                </div>
            )
        }

        return this.props.children
    }
}
