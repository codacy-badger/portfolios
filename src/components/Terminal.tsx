import React, { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { Heading } from '@components'

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

  const onMouseDown = useCallback(() => {
    if (draggableRef.current) {
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
    <StyledTerminal
      ref={draggableRef}
      style={{
        left: `${posX.toString().concat('px')}`,
        top: `${posY.toString().concat('px')}`,
      }}
    >
      <Heading />
      <StyledConsole>Hello</StyledConsole>
    </StyledTerminal>
  )
}

export default Terminal
