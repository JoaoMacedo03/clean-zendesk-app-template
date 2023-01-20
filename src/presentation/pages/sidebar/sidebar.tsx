import React, { useState } from 'react'
import { Button, CircularProgress, TextField } from '@mui/material'
import { IGetGithubUser, IGetGithubUserRepos } from '@/domain/use-cases'
import { IValidation } from '@/presentation/contracts/validation'
import { ErrorMessage } from '@/presentation/components'
import { GithubUserData } from './components'
import Styles from './sidebar-styles.scss'

type Props = {
    getGithubUser: IGetGithubUser
    getGithubUserRepos: IGetGithubUserRepos
    validation: IValidation
}

const Sidebar: React.FC<Props> = ({ getGithubUser, getGithubUserRepos, validation }: Props) => {
    const [state, setState] = useState({
        githubUser: '',
        error: '',
        userFound: false
    })
    const [loading, setLoading] = useState(false)

    const validate = (): boolean => {
        setState(current => ({ ...current, error: '' }))
        const formData = { githubuser: state.githubUser }
        const hasError = validation.validate('githubuser', formData)
        if (hasError) {
            setState(current => ({ ...current, error: validation.validate('githubuser', formData) }))
            return false
        }
        return true
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        if (!validate()) return
        setLoading(true)
        try {
            const githubUser = await getGithubUser.get(state.githubUser)
            const repos = await getGithubUserRepos.get(githubUser.repos_url)
            setState(current => ({ ...current, userFound: true }))
            setLoading(false)
            console.log('githubUser -> ', githubUser)
            console.log('repos -> ', repos)
        } catch (error) {
            setState(current => ({
                ...current,
                error: error.message
            }))
            setLoading(false)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setState(current => ({
            ...current, githubUser: event.target.value, error: ''
        }))
    }

    if(state.userFound) return <GithubUserData />

    return (
        <form onSubmit={handleSubmit} className={Styles.sidebarWrap}>
            <TextField
                variant="outlined"
                name="githubuser"
                label="Informe o nome do usuário GitHub"
                fullWidth
                onChange={handleChange}
            />
            {state.error && <ErrorMessage error={state.error} />}
            <Button type="submit" variant="contained">
                {loading ? <CircularProgress size={30} /> : <>Buscar</> }
            </Button>
        </form>
    )
}

export default Sidebar
