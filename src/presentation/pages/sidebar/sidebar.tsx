import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { IGetGithubUser, IGetGithubUserRepos } from '@/domain/use-cases'
import Styles from './sidebar-styles.scss'
import { IValidation } from '@/presentation/contracts/validation'
import { ErrorMessage } from '@/presentation/components'

type Props = {
    getGithubUser: IGetGithubUser
    getGithubUserRepos: IGetGithubUserRepos
    validation: IValidation
}

const Sidebar: React.FC<Props> = ({ getGithubUser, getGithubUserRepos, validation }: Props) => {
    const [state, setState] = useState({
        githubUser: '',
        error: ''
    })

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
        try {
            const githubUser = await getGithubUser.get(state.githubUser)
            const repos = await getGithubUserRepos.get(githubUser.repos_url)
            console.log('githubUser -> ', githubUser)
            console.log('repos -> ', repos)
        } catch (error) {
            setState(current => ({
                ...current,
                error: error.message
            }))
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setState(current => ({
            ...current, githubUser: event.target.value, error: ''
        }))
    }

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
            <Button type="submit" variant="contained">Buscar</Button>
        </form>
    )
}

export default Sidebar
