import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl inline-block text-primary">An Blog</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Bài viết
            </Link>
            <Link
              href="/about"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Về tôi
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
             <div className="text-sm font-medium">Xin chào, Thiếu chủ An</div>
          </nav>
        </div>
      </div>
    </header>
  );
}