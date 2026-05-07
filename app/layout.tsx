import './globals.css'
import ThemeProvider from './components/ThemeProvider'
import AppProviders from './providers'

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
      <body>
        <ThemeProvider>
          <AppProviders>
            {children}
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}
