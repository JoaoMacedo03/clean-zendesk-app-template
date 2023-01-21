import React, { useEffect } from 'react'
import ZAFClient from 'zendesk_app_framework_sdk'
import { GroupAdd, Group, Badge, LocationCity } from '@mui/icons-material';
import { SidebarState } from '@/presentation/pages/sidebar/types'
import Styles from './github-user-data-styles.scss'

type Props = {
    sidebarState: SidebarState
}

const client = ZAFClient.init()

const GithubUserData: React.FC<Props> = ({ sidebarState }: Props) => {
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
            client.invoke('notify', 'Dados enviados ao ticket', 'success')
        })
    }

    useEffect(() => {
        client.invoke('resize', { width: '100%', height: 700 });
    }, [])

    return (
        <div className={Styles.githubUserDataWrap}>
            <img 
                src={user.avatar_url} 
                alt={user.name} 
            />

            <div className={Styles.dataWrap}>
                <span>
                    <GroupAdd />
                    Seguidores:
                    <b>{user.followers}</b>
                </span>
                <span>
                    <Group />
                    Seguindo:
                    <b>{user.following}</b>
                </span>    
            </div>

            <div className={Styles.dataWrap}>
                <span>
                    <Badge />
                    Nome: 
                    <b>{user.name}</b>
                </span>
            </div>

            <div className={Styles.dataWrap}>
                <span>
                    <LocationCity />
                    Cidade:
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