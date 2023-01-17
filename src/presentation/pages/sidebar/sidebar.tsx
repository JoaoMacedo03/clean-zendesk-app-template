import React from 'react'
import { Button, TextField } from '@mui/material'
import Styles from './sidebar-styles.scss'
import { IGetGithubUser } from '@/domain/use-cases'

type Props = {
    getGithubUser: IGetGithubUser
}

const Sidebar: React.FC<Props> = ({ getGithubUser }: Props) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        const githubUser = await getGithubUser.get('JoaoMacedo03')
        console.log('githubUser -> ', githubUser)
    }

    return (
        <form onSubmit={handleSubmit} className={Styles.sidebarWrap}>
            <TextField
                variant="outlined"
                label="Oisfsdfs"
                fullWidth
            />
            <Button type="submit" variant="contained">Buscar</Button>
        </form>
    )
}

export default Sidebar
