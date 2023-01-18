import React from 'react'
import Styles from './error-message.scss'

type Props = {
    error: string
}

const ErrorMessage: React.FC<Props> = ({ error = 'Falha' }: Props) => {
    return (
        <div className={Styles.errorWrap}>{error}</div>
    )
}

export default ErrorMessage
