import { BlogPost } from '@/types/blog';

// Dữ liệu mẫu thay thế cho API
export const dummyPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Hiểu về Server Actions trong Next.js 14',
    slug: 'hieu-ve-server-actions-nextjs-14',
    excerpt: 'Server Actions là một tính năng mạnh mẽ giúp đơn giản hóa việc xử lý form và mutation data trong Next.js. Hãy cùng tìm hiểu cách hoạt động của chúng.',
    content: 'Đây là nội dung chi tiết của bài viết về Server Actions...',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2024-03-15T08:00:00Z',
    author: {
      name: 'Phạm Quốc An',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=An',
    },
    tags: [
      { id: 't1', name: 'Next.js', slug: 'nextjs' },
      { id: 't2', name: 'React', slug: 'react' },
    ],
    readTimeMinutes: 5,
  },
  {
    id: '2',
    title: 'Tối ưu hóa hiệu năng React Application',
    slug: 'toi-uu-hoa-hieu-nang-react',
    excerpt: 'Các kỹ thuật và best practices để làm cho ứng dụng React của bạn chạy mượt mà và nhanh hơn.',
    content: 'Nội dung chi tiết về các kỹ thuật tối ưu hóa React...',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2024-03-10T10:30:00Z',
    author: {
      name: 'Nguyễn Văn A',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=A',
    },
    tags: [
      { id: 't2', name: 'React', slug: 'react' },
      { id: 't3', name: 'Performance', slug: 'performance' },
    ],
    readTimeMinutes: 8,
  },
  {
    id: '3',
    title: 'Tailwind CSS: Xây dựng UI nhanh chóng',
    slug: 'tailwind-css-xay-dung-ui',
    excerpt: 'Tại sao Tailwind CSS lại được yêu thích và cách bắt đầu xây dựng giao diện hiệu quả với nó.',
    content: 'Hướng dẫn chi tiết về Tailwind CSS...',
    coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2024-03-05T14:15:00Z',
    author: {
      name: 'Trần Thị B',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=B',
    },
    tags: [
      { id: 't4', name: 'CSS', slug: 'css' },
      { id: 't5', name: 'Tailwind', slug: 'tailwind' },
    ],
    readTimeMinutes: 4,
  }
];

export async function getPosts(): Promise<BlogPost[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return dummyPosts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyPosts.find(post => post.slug === slug);
}