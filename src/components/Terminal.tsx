import React, { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable'

import { Heading } from '@components'

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

const StyledConsole = styled.p`
  padding: 0.5rem;

  font-family: Monaco, Menlo, monospace;
  font-weight: normal;
  font-size: 12px;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  color: white;
  background: black;

  margin: 0;

  height: 100%;
`

const StyledTerminal = styled.div`
  display: block;

  position: absolute;

  width: 640px;
  height: 480px;

  box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56);
`

const Terminal: React.FC = () => {
  const [posX, setPosX] = useState<number>(20)
  const [posY, setPosY] = useState<number>(20)

  const draggableRef = useRef<HTMLDivElement>(null)
  const dragging = useRef<boolean>(false)

  const matchSelector = (
    e: EventTarget | null,
    selector: string,
    node: (Node & ParentNode) | null
  ): boolean => {
    if (node !== null) {
      return !!node.querySelector(selector)
    }
    return false
  }

  const onMouseDown = useCallback((e: MouseEvent) => {
    if (
      draggableRef.current &&
      matchSelector(e.target, '#handle', draggableRef.current.parentNode)
    ) {
      dragging.current = true
    }
  }, [])

  const onMouseUp = useCallback(() => {
    if (dragging.current) {
      dragging.current = false
    }
  }, [])

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (dragging.current) {
      setPosX(pos => pos + e.movementX)
      setPosY(pos => pos + e.movementY)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)

    return (): void => {
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseUp, onMouseDown, onMouseMove])

  return (
    <Draggable handle="#handle">
      <StyledTerminal>
        <StyledHeading id="handle">
          <StyledBtnContainer>
            <StyledBtnRed />
            <StyledBtnYellow />
            <StyledBtnGreen />
          </StyledBtnContainer>
          <StyledTitle>Children</StyledTitle>
        </StyledHeading>
        <StyledConsole>Hello</StyledConsole>
      </StyledTerminal>
    </Draggable>
  )
}

export default Terminal
