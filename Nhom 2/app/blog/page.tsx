const posts = [
  { title: "Bài viết 1", slug: "bai-viet-1" },
  { title: "Bài viết 2", slug: "bai-viet-2" },
];

export default function BlogList() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.875rem", marginBottom: "1rem", fontWeight: "bold" }}>
        Danh sách bài viết
      </h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {posts.map((p) => (
          <li key={p.slug} style={{ marginBottom: "0.5rem" }}>
            <a href={`/blog/${p.slug}`} style={{ color: "#3b82f6", textDecoration: "none" }}>
              {p.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
