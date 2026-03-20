import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Ольга Солонина',
  description:
    'Более 2-х лет в продуктовом дизайне. Думаю как дизайнер, понимаю как разработчик.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var saved = localStorage.getItem('theme');
              if (saved === 'dark') {
                document.documentElement.classList.add('dark');
              } else if (saved === 'light') {
                // светлая — ничего не делаем
              } else {
                // нет сохранённой — смотрим системные настройки
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark');
                }
              }
            } catch(e) {}
          })();
        `
      }} />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
