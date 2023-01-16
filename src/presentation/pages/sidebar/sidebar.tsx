import React from 'react'
import { Button, TextField } from '@mui/material'
import Styles from './sidebar-styles.scss'

const Sidebar: React.FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        console.log('Test Submit')
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
