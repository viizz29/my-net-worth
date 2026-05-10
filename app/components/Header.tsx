'use client'

import UserMenu from './UserMenu'
import ThemeToggle from './ThemeToggle'
import { getUserInfo } from '../api-calls/auth-api';
import { useAuth } from '../auth/use-auth';
import { useQuery } from '@tanstack/react-query';

export default function Header() {

  const { user } = useAuth();

  const { data: userInfo } = useQuery({
    queryKey: ["user-info", user],
    queryFn: getUserInfo,
    enabled: user != null
  });

  return (
    <header className="h-16 border-b dark:border-slate-800 flex items-center justify-between px-6 bg-white dark:bg-slate-900 transition-colors">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-slate-100">Dashboard</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserMenu name={userInfo?.name || "John Doe"} />
      </div>
    </header>
  )
}