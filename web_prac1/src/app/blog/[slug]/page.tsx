import { getPostBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Không tìm thấy bài viết',
    };
  }
  
  return {
    title: `${post.title} | An Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article className="container max-w-3xl py-6 lg:py-10 mx-auto px-4">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Quay lại trang chủ
      </Link>
      
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <time dateTime={post.date} className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {format(new Date(post.date), 'dd/MM/yyyy')}
          </time>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readTimeMinutes} phút đọc
          </span>
        </div>
        
        <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl font-bold">
          {post.title}
        </h1>
        
        <div className="mt-4 flex items-center gap-4">
          {post.author.avatarUrl && (
            <Image
              src={post.author.avatarUrl}
              alt={post.author.name}
              width={42}
              height={42}
              className="rounded-full bg-muted"
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium">{post.author.name}</span>
            <span className="text-xs text-muted-foreground">Tác giả</span>
          </div>
        </div>
      </div>
      
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted mt-8">
        <Image
          src={post.coverImage}
          alt={`Ảnh bìa bài viết ${post.title}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      
      <div className="prose dark:prose-invert max-w-none mt-10 lg:prose-lg leading-7">
        <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>
        
        {/* Placeholder cho nội dung thực tế (trong bài lab dùng mảng dummy) */}
        <div className="text-foreground/90">
          <p>{post.content}</p>
          <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Phần 1: Giới thiệu</h2>
          <p>Ut tristique nisi. Curabitur convallis, sem vel auctor aliquam, risus arcu pellentesque lacus, nec tincidunt augue elit id arcu. Sed eget nisl non diam pretium pellentesque vel eget orci.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Phần 2: Ứng dụng thực tế</h2>
          <p>Phasellus egestas quam in lectus ullamcorper tincidunt. Suspendisse eu purus libero. Curabitur vitae purus lorem.</p>
        </div>
      </div>
      
      <div className="mt-10 border-t pt-8">
        <h3 className="font-semibold mb-4">Thẻ tags:</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag.id} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground">
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}