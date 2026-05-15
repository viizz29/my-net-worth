'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/app/lib/utils'

const navItems = [
  { href: '/', label: 'Home', icon: 'H' },
  { href: '/accounts', label: 'Accounts', icon: 'A' },
  { href: '/transactions', label: 'Transactions', icon: 'T' },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <aside
      className={`${isCollapsed ? 'w-20' : 'w-64'} min-h-screen overflow-hidden border-r border-border bg-sidebar p-4 text-foreground transition-all duration-300`}
    >
      <div className="flex items-center mb-4 h-10">
        {!isCollapsed && <div className="mr-auto whitespace-nowrap text-xl font-bold text-blue-600 dark:text-blue-400">MyNetWorth</div>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`rounded p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${isCollapsed ? 'mx-auto' : ''}`}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ href, label, icon }) => {
          const isActive = isActivePath(href)

          return (
            <Link
              key={href}
              href={href}
              title={label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-4 rounded p-2 transition-colors',
                isActive
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              <div
                className={cn(
                  'w-6 flex justify-center font-bold transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {icon}
              </div>
              {!isCollapsed && <span className="whitespace-nowrap text-sm font-medium">{label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
