export interface EventItem {
  id: string;
  title: string;
  description: string | null;
  date: string;
  end_date: string | null;
  venue: string | null;
  banner_url: string | null;
  is_featured: boolean;
  created_at: string;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  scripture_reference: string | null;
  description: string | null;
  video_url: string | null;
  audio_url: string | null;
  thumbnail_url: string | null;
  series: string | null;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  excerpt: string | null;
  author: string;
  preacher_name: string | null;
  category: string;
  image_url: string | null;
  published: boolean;
  published_at: string;
  created_at: string;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  email: string | null;
  phone: string | null;
  display_order: number;
  created_at: string;
}

export interface Parish {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  latitude: number | null;
  longitude: number | null;
  service_times: string | null;
  pastor_name: string | null;
  created_at: string;
}

export interface Ministry {
  id: string;
  name: string;
  description: string | null;
  lead_name: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
}

export interface Testimony {
  id: string;
  name: string;
  title: string;
  body: string;
  approved: boolean;
  created_at: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  request: string;
  is_private: boolean;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}

export interface RccgLegend {
  id: string;
  name: string;
  title: string | null;
  era: string | null;
  photo_url: string | null;
  bio: string;
  display_order: number;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
  category: string;
  event_name: string | null;
  display_order: number;
  created_at: string;
}
