import './globals.css'
import AppShell from '@/components/AppShell'

export const metadata = {
    title: 'АвтоИмпорт',
    description: 'Калькулятор доставки машин',
}

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
        <body className="min-h-screen flex flex-col">
        <AppShell>{children}</AppShell>
        </body>
        </html>
    )
}
