export type ContentStatus = "draft" | "published";

export interface NewsRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string | null;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
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
