/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import {AnimatedLogo} from './index'

describe('Animated Logo', () => {
 
  it('should have company name on logo when hovered', () => {
    render(<AnimatedLogo />)

    const companyHeading = screen.getByTestId("company-name")

    const companyName = companyHeading.innerHTML

    expect(companyName).toContain('Centro Pokémom')
  })

})