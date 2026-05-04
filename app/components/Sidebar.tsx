'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

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

        <Link href="/" title="Accounts" className="flex items-center gap-4 rounded p-2 text-foreground transition-colors hover:bg-muted">
          <div className="w-6 flex justify-center font-bold text-muted-foreground">H</div>
          {!isCollapsed && <span className="whitespace-nowrap text-sm font-medium">Home</span>}
        </Link>

        <Link href="/accounts" title="Accounts" className="flex items-center gap-4 rounded p-2 text-foreground transition-colors hover:bg-muted">
          <div className="w-6 flex justify-center font-bold text-muted-foreground">A</div>
          {!isCollapsed && <span className="whitespace-nowrap text-sm font-medium">Accounts</span>}
        </Link>
        <Link href="/transactions" title="Transactions" className="flex items-center gap-4 rounded p-2 text-foreground transition-colors hover:bg-muted">
          <div className="w-6 flex justify-center font-bold text-muted-foreground">T</div>
          {!isCollapsed && <span className="whitespace-nowrap text-sm font-medium">Transactions</span>}
        </Link>
      </nav>
    </aside>
  )
}
