import { useContext } from 'react'
import { ApiContext } from '@/presentation/contexts'
import { useNavigate } from 'react-router-dom'

type ResultType = () => void

export const useLogout = (): ResultType => {
    const naviagate = useNavigate()
    const { setCurrentAccount } = useContext(ApiContext)
    return (): void => {
        setCurrentAccount(undefined)
        naviagate('/login')
    }
}
