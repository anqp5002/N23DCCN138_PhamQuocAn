import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPost } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col space-y-4 overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Đọc bài viết: {post.title}</span>
      </Link>
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-muted">
        <Image
          src={post.coverImage}
          alt={`Ảnh bìa bài viết ${post.title}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-4 p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <time dateTime={post.date}>
              {format(new Date(post.date), 'dd/MM/yyyy')}
            </time>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{post.readTimeMinutes} phút đọc</span>
          </div>
        </div>
        
        <h2 className="line-clamp-2 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        
        <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 mt-auto">
          <div className="flex items-center gap-2">
            {post.author.avatarUrl && (
              <Image
                src={post.author.avatarUrl}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full bg-muted"
              />
            )}
            <span className="text-sm font-medium text-foreground">{post.author.name}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map(tag => (
            <Badge key={tag.id} variant="secondary" className="relative z-20">
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}