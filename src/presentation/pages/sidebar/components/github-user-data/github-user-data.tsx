import React, { useEffect } from 'react'
import ZAFClient from 'zendesk_app_framework_sdk'
import { GroupAdd, Group } from '@mui/icons-material';
import { SidebarState } from '@/presentation/pages/sidebar/types'
import Styles from './github-user-data-styles.scss'

type Props = {
    sidebarState: SidebarState
}

const client = ZAFClient.init()

const GithubUserData: React.FC<Props> = ({ sidebarState }: Props) => {
    const { githubUserData } = sidebarState

    useEffect(() => {
        client.invoke('resize', { width: '100%', height: 700 });
    }, [])

    return (
        <div className={Styles.githubUserDataWrap}>
            <img 
                src={githubUserData.user.avatar_url} 
                alt={githubUserData.user.name} 
            />

            <div className={Styles.followersWrap}>
                <span>
                    <GroupAdd />
                    Seguidores:
                    <b>{githubUserData.user.followers}</b>
                </span>
                <span>
                    <Group />
                    Seguindo:
                    <b>{githubUserData.user.following}</b>
                </span>    
            </div>

            <div>
                <div>
                    <span>Nome: </span>
                    <span>{githubUserData.user.name}</span>
                </div>
            </div>

            <div>
                <div>
                    <span>Cidade: </span>
                    <span>{githubUserData.user.location}</span>
                </div>
            </div>

            <div>
                {githubUserData.repositories.map(repository => (
                    <div key={repository.name}>{repository.name}</div>
                ))}
            </div>
        </div>
    )
}

export default GithubUserData