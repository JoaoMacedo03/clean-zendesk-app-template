import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import Router from '@/main/routes/router'
import { CircularProgress } from '@mui/material'
import '@/presentation/styles/global.scss'
import '@/presentation/translations'

const container = document.getElementById('main')
const root = createRoot(container)

root.render(
    <Suspense fallback={<CircularProgress />}>
        <Router />
    </Suspense>
)
