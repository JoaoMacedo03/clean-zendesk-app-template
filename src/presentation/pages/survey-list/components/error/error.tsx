import React, { useContext } from 'react'
import { SurveyContext } from '@/presentation/pages/survey-list/components'
import Styles from './error-styles.scss'

const Error: React.FC = () => {
    const { state, setState } = useContext(SurveyContext)
    const reload = (): void => {
        setState(current => {
            return { surveys: [], error: '', reload: !current.reload }
        })
    }

    return (
        <div className={Styles.errorWrap}>
            <span data-testid="error">{state.error}</span>
            <button data-testid="reload" onClick={reload}>Tentar novamente</button>
        </div>
    )
}

export default Error
