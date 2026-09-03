export type ContentStatus = "draft" | "published";

export interface NewsImageRecord {
  id: string;
  news_id: string;
  image_url: string;
  storage_path: string | null;
  sort_order: number;
  created_at: string;
}

export interface NewsRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string | null;
  news_images: NewsImageRecord[];
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  source?: "fallback" | "supabase";
}

export interface NewsFormState {
  error: string | null;
}

export interface DocumentRecord {
  id: string;
  title: string;
  slug: string;
  document_type: string;
  summary: string;
  file_url: string | null;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AgreementRecord {
  id: string;
  title: string;
  slug: string;
  summary: string;
  details: string;
  image_url: string | null;
  file_url: string | null;
  promo_code: string | null;
  valid_from: string | null;
  valid_until: string | null;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CommunicationRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  attachment_url: string | null;
  attachment_name: string | null;
  attachment_storage_path: string | null;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CommunicationFormState {
  error: string | null;
}
