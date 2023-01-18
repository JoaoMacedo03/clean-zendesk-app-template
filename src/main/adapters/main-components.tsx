import React from 'react'
import { MakeSidebar } from '@/main/factories/pages'

export const MainComponent: React.FC = () => {
  const appLocation = window.location.search.split('&')[0].split('?type=')[1]

  switch (appLocation) {
    case 'sidebar':
      return <MakeSidebar />
    default:
      return <MakeSidebar />
  }
}
