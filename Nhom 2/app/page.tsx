import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.875rem", marginBottom: "1rem", fontWeight: "bold" }}>
        Trang chủ Blog
      </h1>
      <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem" }}>
        <li style={{ marginBottom: "0.5rem" }}>
          <Link href="/blog" style={{ color: "#2563eb" }}>
            Danh sách bài viết
          </Link>
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          <Link href="/categories" style={{ color: "#2563eb" }}>
            Danh mục bài viết
          </Link>
        </li>
      </ul>
    </main>
  );
}
