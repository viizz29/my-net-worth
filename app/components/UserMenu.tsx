'use client'

import { useState } from 'react'
import { useAuth } from '../auth/use-auth'
interface UserMenuProps {
  name: string
}

export default function UserMenu({ name }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth();



  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full p-2 text-foreground transition-colors hover:bg-muted"
      >
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
          {name.charAt(0)}
        </div>
        <span className="text-sm font-medium">{name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-border bg-background shadow-lg shadow-slate-950/10 transition-colors dark:shadow-black/30">
          <div className="border-b border-border p-4 text-sm font-semibold text-foreground">
            {name}
          </div>
          <button
            onClick={() => logout()}
            className="w-full px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
