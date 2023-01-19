import React from 'react'
import { Sidebar } from '@/presentation/pages'
import { makeGetGithubUser, makeGetGithubUserRepos } from '@/main/factories/use-cases'
import { makeSidebarValidation } from './sidebar-validation'

export const MakeSidebar: React.FC = () => {
  return (
    <Sidebar
      getGithubUser={makeGetGithubUser()}
      getGithubUserRepos={makeGetGithubUserRepos()}
      validation={makeSidebarValidation()}
    />
  )
}
