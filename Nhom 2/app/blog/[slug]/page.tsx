// `app/blog/[slug]/page.tsx`
// Trang chi tiết bài viết (Sử dụng Dynamic Routing)

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.875rem", marginBottom: "1rem", fontWeight: "bold" }}>
        Chi tiết bài viết: {slug}
      </h1>
      <p>Nội dung chi tiết của bài blog...</p>
    </main>
  );
}

