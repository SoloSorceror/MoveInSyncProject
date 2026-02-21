import React from 'react'

export const SkeletonLine = ({ className = '', width = 'w-full', height = 'h-4' }) => (
    <div className={`bg-gray-200 rounded animate-pulse ${width} ${height} ${className}`} />
)

export const SkeletonCard = ({ className = '' }) => (
    <div className={`bg-white rounded-2xl border border-gray-200 p-5 shadow-sm ${className}`}>
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse" />
            </div>
        </div>
        <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-4/6 animate-pulse" />
        </div>
    </div>
)

export const SkeletonAvatar = ({ className = '', size = 'w-10 h-10' }) => (
    <div className={`bg-gray-200 rounded-full animate-pulse ${size} ${className}`} />
)
