import React from 'react'
import { Sidebar } from '@/presentation/pages'
import { makeGetGithubUser } from '@/main/factories/use-cases'
import { makeSidebarValidation } from './sidebar-validation'

export const MakeSidebar: React.FC = () => {
    return (
      <Sidebar
        getGithubUser={makeGetGithubUser()}
        validation={makeSidebarValidation()}
      />
    )
  }
