import React, { useState, useCallback, useEffect } from 'react'
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

  color: #fafafa;
  line-height: 1;
  height: 12px;

  font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 12px;
  font-weight: 400;
`

const StyledHeading = styled.div`
  display: flex;

  position: relative;

  margin: 0;
  padding: 0.375rem;

  color: #fafafa;
  background: #202020;

  width: auto;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  box-sizing: border-box;
`

const StyledConsole = styled.p`
  padding: 0.5rem;

  font-family: Monaco, Menlo, monospace;
  font-weight: normal;
  font-size: 12px;

  color: #fafafa;
  background: #202020;

  margin: 0;

  height: 100%;

  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`

const StyledTerminal = styled.div`
  display: block;

  position: absolute;

  width: 640px;
  height: 280px;

  border-radius: 5px;

  box-shadow: 0 0 1px rgba(0, 0, 0, 0.26), 0 0 5px rgba(0, 0, 0, 0.16),
    0 8px 10px rgba(0, 0, 0, 0.06), 0 55px 65px rgba(0, 0, 0, 0.48);
`

const Terminal: React.FC = () => {
  const [state, setState] = useState({
    isDragging: false,
    dX: 80,
    dY: 80,
  })

  const onMouseMove = useCallback(
    e => {
      if (state.isDragging) {
        setState(prevState => ({
          ...prevState,
          dX: prevState.dX + e.movementX,
          dY: prevState.dY + e.movementY,
        }))
      }
    },
    [state.isDragging]
  )

  const onMouseDown = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      isDragging: true,
    }))
  }, [])

  const onMouseUp = useCallback(() => {
    if (state.isDragging) {
      setState(prevState => ({
        ...prevState,
        isDragging: false,
      }))
    }
  }, [state.isDragging])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return (): void => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [onMouseMove, onMouseUp])

  return (
    <StyledTerminal
      style={{
        left: `${state.dX.toString().concat('px')}`,
        top: `${state.dY.toString().concat('px')}`,
      }}
    >
      <StyledHeading onMouseDown={onMouseDown}>
        <StyledBtnContainer>
          <StyledBtnRed />
          <StyledBtnYellow />
          <StyledBtnGreen />
        </StyledBtnContainer>
        <StyledTitle>Children</StyledTitle>
      </StyledHeading>
      <StyledConsole>Hello</StyledConsole>
    </StyledTerminal>
  )
}

export default Terminal
