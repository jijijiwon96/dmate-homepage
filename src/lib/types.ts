export type Category = 'IMC' | '런칭' | 'Issue-up' | 'Sales-up';

export type Work = {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: Category;
  thumbnail_url: string;
  video_url?: string;
  description?: string;
  year: number;
  sort_order: number;
  published: boolean;
  created_at: string;
};

export type ClientLogo = {
  id: string;
  name: string;
  logo_url: string;
};

export type Leader = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url?: string;
};
