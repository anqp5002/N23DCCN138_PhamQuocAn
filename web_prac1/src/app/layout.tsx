import { Header } from '@/components/layout/header';
import './globals.css';

export const metadata = {
  title: 'Blog của Thiếu chủ An',
  description: 'Thực hành Lab 1 Next.js App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="antialiased">
      <body className="min-h-screen bg-background font-sans text-foreground">
        <Header />
        <main className="container mx-auto py-8 px-4 flex-1">
          {children}
        </main>
        <footer className="py-6 md:px-8 md:py-0 border-t mt-auto">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Được xây dựng bởi An (n23dccn138). Thực hành Lab 1.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}