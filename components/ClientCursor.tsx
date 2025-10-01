'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Import dynamique du curseur pour éviter les problèmes SSR
const CursorComponent = dynamic(() => import('./Cursor'), {
    ssr: false,
    loading: () => null
})

export default function ClientCursor() {
    const [isClient, setIsClient] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsClient(true)
        setIsMobile(window.matchMedia('(pointer: coarse)').matches)
    }, [])

    // Ne pas afficher le curseur sur mobile ou côté serveur
    if (!isClient || isMobile) {
        return null
    }

    return <CursorComponent />
}