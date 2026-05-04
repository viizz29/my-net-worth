import UserMenu from './UserMenu'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  // In a real app, you would fetch the user from the session/DAL here
  const userName = "John Doe"

  return (
    <header className="h-16 border-b dark:border-slate-800 flex items-center justify-between px-6 bg-white dark:bg-slate-900 transition-colors">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-slate-100">Dashboard</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserMenu name={userName} />
      </div>
    </header>
  )
}