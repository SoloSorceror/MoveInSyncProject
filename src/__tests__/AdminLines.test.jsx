import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminLines from '@/pages/AdminLines'

describe('AdminLines Page', () => {
    it('renders line buttons and input for new station', () => {
        render(<AdminLines />)

        expect(screen.getByText('Yellow Line')).toBeInTheDocument()
        expect(screen.getByText('Blue Line')).toBeInTheDocument()
        expect(screen.getByText('Red Line')).toBeInTheDocument()

        expect(screen.getByPlaceholderText('Add new station...')).toBeInTheDocument()
    })
})
