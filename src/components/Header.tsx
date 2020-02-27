import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Icon, { Octoface, Calendar, Gear, Clock } from '@primer/octicons-react'
import { Link } from 'gatsby'

interface HeaderProps {
  siteTitle?: string
}

const StyledNavbar = styled.nav`
  /* Declare position of navbar */
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  /* Use flex utilities for controlling alignments */
  display: flex;

  padding: 1rem;
`

const StyledControllGroup = styled.ul`
  /* Use flex utilities to control alignments */
  display: flex;

  list-style: none;
  height: 100%;
  margin: 0;
  padding: 0;
`

const StyledControlBrandGroup = styled(StyledControllGroup)`
  flex: 1;
`

const StyledControlConfigGroup = styled(StyledControllGroup)`
  flex: 1;
  justify-content: flex-end;

  min-width: auto;
`

const StyledItem = styled.li`
  display: flex;
  align-items: center;

  font-family: 'SF Mono', Menlo, Monaco, monospace;
  font-size: 12px;
  font-weight: bold;

  border-radius: 4px;
  border: 1px solid #060606;

  color: #fafafa;
  background: #202020;

  padding: 0.5rem 1rem;

  box-shadow: 0 0 1px rgba(0, 0, 0, 0.26), 0 0 5px rgba(0, 0, 0, 0.16),
    0 8px 10px rgba(0, 0, 0, 0.06), 0 15px 65px rgba(0, 0, 0, 0.48);

  text-decoration: none;

  p {
    margin-top: 0;
    margin-right: 0;
    margin-left: 0.375rem;
    margin-bottom: 0;
  }
`

const Header: React.FC = () => {
  const [date, setDate] = useState(new Date())

  const convertDate = (inputDate: Date): string => {
    const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    const weekday = weekdays[inputDate.getDay()]
    const month = months[inputDate.getMonth()]

    return `${weekday}, ${month} ${inputDate.getDate()}, ${inputDate.getFullYear()}`
  }

  useEffect(() => {
    const id = setInterval(() => setDate(new Date()), 1000)

    return (): void => {
      clearInterval(id)
    }
  }, [])

  return (
    <StyledNavbar>
      <StyledControlBrandGroup>
        <StyledItem as="a" href="https://github.com/richardnguyen99/portfolios">
          <Icon icon={Octoface} />
          <p>PortfoliOS</p>
        </StyledItem>
      </StyledControlBrandGroup>
      <StyledControllGroup style={{ flexShrink: 0 }}>
        <StyledItem>
          <Icon icon={Calendar} />
          <p>{convertDate(date)}</p>
        </StyledItem>
      </StyledControllGroup>
      <StyledControlConfigGroup>
        <StyledItem style={{ marginRight: '0.5rem' }}>
          <Icon icon={Gear} />
          <p>Config</p>
        </StyledItem>
        <StyledItem>
          <Icon icon={Clock} />
          <p>{date.toLocaleTimeString()}</p>
        </StyledItem>
      </StyledControlConfigGroup>
    </StyledNavbar>
  )
}

export default Header
