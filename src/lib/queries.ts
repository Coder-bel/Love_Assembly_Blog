import { supabase } from '@/lib/supabase';
import type { EventItem, Sermon, BlogPost, Leader, Parish, Ministry, Testimony, RccgLegend, GalleryImage } from '@/lib/types';

export async function fetchUpcomingEvents(limit = 10): Promise<EventItem[]> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('date', now)
    .order('date', { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function fetchAllEvents(): Promise<EventItem[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchSermons(limit = 20): Promise<Sermon[]> {
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .order('date', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function fetchSermonById(id: string): Promise<Sermon | null> {
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchBlogPosts(limit = 20, category?: string): Promise<BlogPost[]> {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });
  if (category && category !== 'all') {
    query = query.eq('category', category);
  }
  const { data, error } = await query.limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchLeaders(limit = 100): Promise<Leader[]> {
  const { data, error } = await supabase
    .from('leadership')
    .select('*')
    .order('display_order', { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function fetchParishes(): Promise<Parish[]> {
  const { data, error } = await supabase
    .from('parishes')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchMinistries(limit = 100): Promise<Ministry[]> {
  const { data, error } = await supabase
    .from('ministries')
    .select('*')
    .order('display_order', { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function fetchTestimonies(limit = 20): Promise<Testimony[]> {
  const { data, error } = await supabase
    .from('testimonies')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function fetchLegends(): Promise<RccgLegend[]> {
  const { data, error } = await supabase
    .from('rccg_legends')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchGalleryImages(category?: string): Promise<GalleryImage[]> {
  let query = supabase
    .from('gallery_images')
    .select('*')
    .order('display_order', { ascending: true });
  if (category && category !== 'all') {
    query = query.eq('category', category);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
