import React from 'react'
import { Sidebar } from '@/presentation/pages'
import { makeGetGithubUser } from '@/main/factories/use-cases'

export const MakeSidebar: React.FC = () => {
    return (
      <Sidebar getGithubUser={makeGetGithubUser()} />
    )
  }
