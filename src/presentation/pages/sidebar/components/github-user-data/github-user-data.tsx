import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ZAFClient from 'zendesk_app_framework_sdk'
import { GroupAdd, Group, Badge, LocationCity, ArrowBack } from '@mui/icons-material'
import { SidebarState } from '@/presentation/pages/sidebar/types'
import Styles from './github-user-data-styles.scss'

type Props = {
    sidebarState: SidebarState
    goBack: () => void
}

const client = ZAFClient.init()

const GithubUserData: React.FC<Props> = ({ sidebarState, goBack }: Props) => {
    const { t } = useTranslation()
    const { githubUserData: { user, repositories } } = sidebarState

    const handleRepository = (description: string, language: string): void => {
        client.metadata().then(response => {
            const { settings } = response
            client.set(
                `ticket.customField:custom_field_${settings.repo_description_id}`, 
                description
            )
            client.set(
                `ticket.customField:custom_field_${settings.repo_language_id}`, 
                language
            )
            client.invoke(
                'notify', 
                t('presentation.pages.sidebar.components.github-user-data.success'), 
                'success'
            )
        })
    }

    useEffect(() => {
        client.invoke('resize', { width: '100%', height: 700 });
    }, [])

    return (
        <div className={Styles.githubUserDataWrap}>
            <div className={Styles.dataWrap} onClick={goBack}>
                <span className={Styles.goBack}>
                    <ArrowBack />
                    {t('presentation.pages.sidebar.components.github-user-data.goback-button')}
                </span>
            </div>
            
            <img 
                src={user.avatar_url} 
                alt={user.name} 
            />

            <div className={Styles.dataWrap}>
                <span>
                    <GroupAdd />
                    {t('presentation.pages.sidebar.components.github-user-data.followers')}:
                    <b>{user.followers}</b>
                </span>
                <span>
                    <Group />
                    {t('presentation.pages.sidebar.components.github-user-data.following')}:
                    <b>{user.following}</b>
                </span>    
            </div>

            <div className={Styles.dataWrap}>
                <span>
                    <Badge />
                    {t('presentation.pages.sidebar.components.github-user-data.name')}: 
                    <b>{user.name}</b>
                </span>
            </div>

            <div className={Styles.dataWrap}>
                <span>
                    <LocationCity />
                    {t('presentation.pages.sidebar.components.github-user-data.city')}:
                    <b>{user.location}</b>
                </span>
            </div>

            <div className={Styles.divider}/>

            <div className={Styles.reposWraps}>
                {repositories.map(repository => (
                    <div 
                        key={repository.name} 
                        onClick={() => 
                            handleRepository(
                                repository.description, 
                                repository.language
                            )
                        }
                    >
                        {repository.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GithubUserData