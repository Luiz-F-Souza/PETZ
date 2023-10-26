/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { Header } from './index'

describe('Header Component', () => {


  it('should render AnimatedLogo component', () => {
    render(<Header />)

    const animatedLogo = screen.getByTestId('logo-container')

    expect(animatedLogo).toBeVisible()
  })

  it('should render a navbar', () => {
    render(<Header />)

    const navBar = screen.getByTestId('header-navbar')

    expect(navBar).toBeVisible()
  })

  it('should render link to new appointment', () => {
    render(<Header />)

    const newAppointmentLink = screen.getByTestId('new-appointment-link') as HTMLAnchorElement

    expect(newAppointmentLink).toBeVisible()

    const href = newAppointmentLink.href

    expect(href).toContain('/agendar-consulta')
  })

  it('should render link to aboutUs', () => {
    render(<Header />)


    const aboutUsLink = screen.getByTestId('about-us-link') as HTMLAnchorElement

    expect(aboutUsLink).toBeVisible()

    const href = aboutUsLink.href

    expect(href).toContain('/quem-somos')
  })
})