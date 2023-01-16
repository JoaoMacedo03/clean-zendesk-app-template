import React, { useContext, useRef } from 'react'
import { FormContext } from '@/presentation/contexts'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>()
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState(current => {
      return { ...current, [event.target.name]: event.target.value }
    })
  }

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        placeholder=" "
        data-testid={props.name}
        title={error}
        readOnly
        ref={inputRef}
        onFocus={e => { e.target.readOnly = false }}
        onChange={handleChange}
      />
      <label
        data-testid={`${props.name}-label`}
        onClick={() => { inputRef.current.focus() }} title={error}>
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
