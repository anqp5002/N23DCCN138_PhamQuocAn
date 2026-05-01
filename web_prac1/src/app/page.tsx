import { getPosts } from '@/lib/data';
import { BlogCard } from '@/components/ui/blog-card';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-12">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            Blog Thực Hành Lab 1
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Xây dựng trang blog cá nhân hoàn chỉnh với Next.js App Router, Tailwind CSS, TypeScript. Giao diện mượt mà và tối ưu hiệu năng.
          </p>
          <div className="space-x-4">
            <a href="#posts" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-2">
              Khám phá bài viết
            </a>
          </div>
        </div>
      </section>
      
      <section id="posts" className="container space-y-6 bg-slate-50 py-8 md:py-12 lg:py-24 rounded-[2.5rem] px-4 mx-auto mb-16">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold text-foreground">
            Bài viết mới nhất
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Chia sẻ kiến thức, kinh nghiệm về lập trình và công nghệ web hiện đại.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 pt-10">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}