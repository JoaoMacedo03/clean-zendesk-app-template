import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ZAFClient from 'zendesk_app_framework_sdk'
import { Button, CircularProgress, TextField } from '@mui/material'
import { IGetGithubUser, IGetGithubUserRepos } from '@/domain/use-cases'
import { IValidation } from '@/presentation/contracts/validation'
import { ErrorMessage } from '@/presentation/components'
import { GithubUserData } from './components'
import { SidebarState } from './types/sidebar-state-types'
import Styles from './sidebar-styles.scss'

type Props = {
    getGithubUser: IGetGithubUser
    getGithubUserRepos: IGetGithubUserRepos
    validation: IValidation
}

const client = ZAFClient.init()

const Sidebar: React.FC<Props> = ({ getGithubUser, getGithubUserRepos, validation }: Props) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState<SidebarState>({
        githubUser: '',
        error: '',
        userFound: false,
        githubUserData: null
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

    const goBack = (): void => {
        setState(current => ({ ...current, userFound: false }))
        client.invoke('resize', { width: '100%', height: 170 })
    } 

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        if (!validate()) return
        setLoading(true)
        try {
            const user = await getGithubUser.get(state.githubUser)
            const repositories = await getGithubUserRepos.get(user.repos_url)
            setState(current => 
                ({ 
                    ...current, 
                    userFound: true, 
                    githubUserData: { user, repositories } 
                })
            )
            setLoading(false)
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

    useEffect(() => {
        client.invoke('resize', { width: '100%', height: 170 })
    }, [])

    if(state.userFound) return <GithubUserData goBack={goBack} sidebarState={state} />

    return (
        <form onSubmit={handleSubmit} className={Styles.sidebarWrap}>
            <TextField
                variant="outlined"
                name="githubuser"
                label={t('presentation.pages.sidebar.label')}
                fullWidth
                onChange={handleChange}
            />
            {state.error && <ErrorMessage error={state.error} />}
            <Button type="submit" variant="contained">
                {loading ? 
                    <CircularProgress size={30} /> : 
                    <>{t('presentation.pages.sidebar.button')}</> 
                }
            </Button>
        </form>
    )
}

export default Sidebar
