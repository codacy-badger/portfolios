import React from 'react'
import styled from 'styled-components'

const StyledBtn = styled.button`
  border-radius: 50%;
  border: none;

  width: 14px;
  height: 14px;

  padding: 0;
  margin-right: 0.5rem;
`

const StyledBtnRed = styled(StyledBtn)`
  background: rgba(255, 59, 48, 1);
`

const StyledBtnYellow = styled(StyledBtn)`
  background: rgba(255, 204, 0, 1);
`

const StyledBtnGreen = styled(StyledBtn)`
  background: rgba(40, 205, 65);
`

const StyledBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
`

const StyledTitle = styled.h1`
  margin: 0 auto;

  color: white;
  line-height: 1;
  height: 14px;

  font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  font-weight: 400;
`

const StyledHeading = styled.div`
  display: flex;

  position: relative;

  margin: 0;
  padding: 0.5rem;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: black;

  width: auto;
`

const Heading: React.FC = () => {
  return (
    <StyledHeading>
      <StyledBtnContainer>
        <StyledBtnRed />
        <StyledBtnYellow />
        <StyledBtnGreen />
      </StyledBtnContainer>
      <StyledTitle>Children</StyledTitle>
    </StyledHeading>
  )
}

export default Heading
