import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "N23DCCN138 - Blog Mini",
  description: "Trang blog của N23DCCN138",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
