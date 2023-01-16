import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Footer, LoginHeader, FormStatus, Input, SubmitButton } from '@/presentation/components'
import { FormContext, ApiContext } from '@/presentation/contexts'
import Styles from './login-styles.scss'
import { IValidation } from '@/presentation/contracts/validation'
import { IAuthentication } from '@/domain/useCases'

type Props = {
  validation: IValidation
  authentication: IAuthentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const naviagate = useNavigate()
  const { setCurrentAccount } = useContext(ApiContext)
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)

    setState(current => {
      return {
        ...current,
        emailError,
        passwordError,
        isFormInvalid: !!emailError || !!passwordError
      }
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return
      setState(current => { return { ...current, isLoading: true } })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      setCurrentAccount(account)
      naviagate('/')
    } catch (error) {
      setState(current => {
        return {
          ...current,
          mainError: error.message,
          isLoading: false
        }
      })
    }
  }

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton text="Entrar" />
          <Link
            data-testid="signup"
            to="/signup"
            className={Styles.link}
          >
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
