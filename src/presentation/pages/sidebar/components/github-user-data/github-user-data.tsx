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

            <div className={Styles.dataWrap}>
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

            <div className={Styles.dataWrap}>
                <span>
                    <Badge />
                    Nome: 
                    <b>{githubUserData.user.name}</b>
                </span>
            </div>

            <div className={Styles.dataWrap}>
                <span>
                    <LocationCity />
                    Cidade:
                    <b>{githubUserData.user.location}</b>
                </span>
            </div>

            <div className={Styles.divider}/>

            <div>
                {githubUserData.repositories.map(repository => (
                    <div key={repository.name}>{repository.name}</div>
                ))}
            </div>
        </div>
    )
}

export default GithubUserData