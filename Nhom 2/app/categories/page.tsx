export default function CategoriesList() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.875rem", marginBottom: "1rem", fontWeight: "bold" }}>
        Danh mục bài viết
      </h1>
      <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem" }}>
        <li style={{ marginBottom: "0.5rem" }}>Công nghệ</li>
        <li style={{ marginBottom: "0.5rem" }}>Lập trình</li>
        <li style={{ marginBottom: "0.5rem" }}>Cuộc sống</li>
      </ul>
    </main>
  );
}
