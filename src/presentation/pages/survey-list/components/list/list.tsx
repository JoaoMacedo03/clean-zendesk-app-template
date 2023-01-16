import React, { useContext } from 'react'
import { SurveyContext, SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import Styles from './list-styles.scss'
import { ILoadSurveyList } from '@/domain/useCases'

const List: React.FC = () => {
    const { state } = useContext(SurveyContext)

    return (
        <ul className={Styles.listWrap} data-testid="survey-list">
            {state.surveys.length
                ? state.surveys.map((survey: ILoadSurveyList.Model) =>
                    <SurveyItem key={survey.id} survey={survey} />)
                : <SurveyItemEmpty />
            }
        </ul>
    )
}

export default List
