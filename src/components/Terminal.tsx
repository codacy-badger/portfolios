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
  display: block;
  padding: 0.5rem;

  font-family: 'SF Mono', Monaco, Menlo, monospace;
  font-weight: normal;
  font-size: 14px;

  color: #fafafa;
  background: #202020;

  margin: 0;

  height: 100%;

  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  outline: none;
  overflow-y: scroll;
  overflow-wrap: break-word;

  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 50%;
  }

  &::-webkit-scrollbar-track {
    border: 1px solid #000;
    padding: 2px 0;
    background-color: #404040;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #737272;
    border: 1px solid #000;
  }
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

  const [text, setText] = useState('portfoliOS@~ root$ ')
  const [command, setCommand] = useState('')

  const unregisterableKeys = [
    'Enter',
    'Backspace',
    'Control',
    'Shift',
    'Command',
    'Meta',
    'Alt',
    'Escape',
  ]

  const commands = ['clear', 'ls', 'sysinfo']

  const handleKeyPress = (e: KeyboardEvent): void => {
    e.preventDefault()

    if (e.key === 'Enter') {
      const parsedCommand = command.split(' ')

      if (parsedCommand[0] === 'clear') {
        setText(`portfoliOS@~ root$ `)
      } else if (parsedCommand[0] === 'help') {
        setText(
          `${text}\n${parsedCommand[0]}: Command not found\nportfoliOS@~ root$ `
        )
      } else if (parsedCommand[0] === 'echo') {
        setText(
          `${text}\n${parsedCommand.slice(1).join(' ')}\nportfoliOS@~ root$ `
        )
      } else if (parsedCommand[0] === 'sysinfo') {
        if (parsedCommand[1] === '--author' || parsedCommand[1] === '-a') {
          setText(`${text}\nRichard Nguyen\nportfoliOS@~ root$ `)
        } else {
          setText(
            `${text}\nAuthor: Richard Nguyen\nLanguage: Typescript\nFramework: Gatsby, Styled-components\nRepository: https//github.com/richardnguyen99/portfolios\nportfoliOS@~ root$ `
          )
        }
      } else {
        setText(
          `${text}\n${parsedCommand[0]}: Command not found\nportfoliOS@~ root$ `
        )
      }
      setCommand('')
    } else if (e.key === 'Backspace') {
      if (command !== '') {
        setText(text.substring(0, text.length - 1))
        setCommand(command.substring(0, command.length - 1))
      }
    } else if (!unregisterableKeys.includes(e.key)) {
      setText(text + e.key)
      setCommand(command + e.key)
    }
  }

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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false)

    return (): void => {
      document.removeEventListener('keydown', handleKeyPress, false)
    }
  }, [handleKeyPress])

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
      <StyledConsole>
        {text !== '' && text.includes('\n') ? (
          text.split('\n').map(i => {
            return <p>{`${i}`}</p>
          })
        ) : (
          <p>{`${text}`}</p>
        )}
      </StyledConsole>
    </StyledTerminal>
  )
}

export default Terminal
