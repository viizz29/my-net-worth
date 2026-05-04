import './globals.css'
import Sidebar from '@/app/components/Sidebar'
import Header from './components/Header'
import ThemeProvider from './components/ThemeProvider'

export const metadata = {
  title: 'My Net Worth',
  description: 'Track your financial health',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
        <ThemeProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-6 text-slate-900 dark:text-slate-100">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}