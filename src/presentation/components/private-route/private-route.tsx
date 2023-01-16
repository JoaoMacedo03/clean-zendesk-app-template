import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

const PrivateRoute: React.FC = () => {
    const { getCurrentAccount } = useContext(ApiContext)
    const token = getCurrentAccount()?.accessToken
    return token ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
