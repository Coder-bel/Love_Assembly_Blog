/*
# Love Assembly RCCG Zonal HQ — Full Schema

1. Purpose
   Creates the complete data model for the Love Assembly (RCCG Zonal HQ) website:
   events, sermons, blog posts, leadership team, parishes under the zone,
   ministries/departments, testimonies, prayer requests, and newsletter signups.

2. New Tables
   - `events` — upcoming and past zonal events (title, date, venue, banner, description)
   - `sermons` — audio/video message archive (title, speaker, date, media url, scripture)
   - `blog_posts` — devotionals, testimonies, teachings (title, body, author, category, image)
   - `leadership` — zonal pastor, assistant pastors, provincial pastors, exco (name, role, bio, photo)
   - `parishes` — parishes under the zone (name, address, phone, email, lat/lng, service times)
   - `ministries` — departments (choir, media, ushers, etc.) with description and lead
   - `testimonies` — public testimony wall (name, title, body, approved flag)
   - `prayer_requests` — submitted prayer requests (name, request, contact, privacy)
   - `newsletter_subscribers` — email signups (email, created_at)

3. Security
   - This is a public-facing church website with NO sign-in screen.
   - RLS enabled on every table.
   - Public content (events, sermons, blog, leadership, parishes, ministries, approved testimonies)
     is readable by anon + authenticated.
   - User-submitted content (prayer requests, testimonies, newsletter) is insertable by anon.
   - Testimonies are only publicly readable once `approved = true`.
   - All writes/updates/deletes are restricted to authenticated (admin/media team) users.

4. Notes
   - All tables use `gen_random_uuid()` for primary keys.
   - Timestamps default to `now()`.
   - Idempotent: uses IF NOT EXISTS for tables and DROP IF EXISTS before CREATE POLICY.
*/

-- EVENTS
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date timestamptz NOT NULL,
  end_date timestamptz,
  venue text,
  banner_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_events" ON events;
CREATE POLICY "public_read_events" ON events FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_events" ON events;
CREATE POLICY "auth_insert_events" ON events FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_events" ON events;
CREATE POLICY "auth_update_events" ON events FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_events" ON events;
CREATE POLICY "auth_delete_events" ON events FOR DELETE TO authenticated USING (true);

-- SERMONS
CREATE TABLE IF NOT EXISTS sermons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  speaker text NOT NULL,
  date timestamptz NOT NULL,
  scripture_reference text,
  description text,
  video_url text,
  audio_url text,
  thumbnail_url text,
  series text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_sermons" ON sermons;
CREATE POLICY "public_read_sermons" ON sermons FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_sermons" ON sermons;
CREATE POLICY "auth_insert_sermons" ON sermons FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_sermons" ON sermons;
CREATE POLICY "auth_update_sermons" ON sermons FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_sermons" ON sermons;
CREATE POLICY "auth_delete_sermons" ON sermons FOR DELETE TO authenticated USING (true);

-- BLOG POSTS
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  body text NOT NULL,
  excerpt text,
  author text NOT NULL,
  category text NOT NULL DEFAULT 'devotional',
  image_url text,
  published boolean DEFAULT true,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_blog_posts" ON blog_posts;
CREATE POLICY "public_read_blog_posts" ON blog_posts FOR SELECT TO anon, authenticated USING (published = true);
DROP POLICY IF EXISTS "auth_insert_blog_posts" ON blog_posts;
CREATE POLICY "auth_insert_blog_posts" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_blog_posts" ON blog_posts;
CREATE POLICY "auth_update_blog_posts" ON blog_posts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_blog_posts" ON blog_posts;
CREATE POLICY "auth_delete_blog_posts" ON blog_posts FOR DELETE TO authenticated USING (true);

-- LEADERSHIP
CREATE TABLE IF NOT EXISTS leadership (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  photo_url text,
  email text,
  phone text,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_leadership" ON leadership;
CREATE POLICY "public_read_leadership" ON leadership FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_leadership" ON leadership;
CREATE POLICY "auth_insert_leadership" ON leadership FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_leadership" ON leadership;
CREATE POLICY "auth_update_leadership" ON leadership FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_leadership" ON leadership;
CREATE POLICY "auth_delete_leadership" ON leadership FOR DELETE TO authenticated USING (true);

-- PARISHES
CREATE TABLE IF NOT EXISTS parishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  phone text,
  email text,
  latitude double precision,
  longitude double precision,
  service_times text,
  pastor_name text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE parishes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_parishes" ON parishes;
CREATE POLICY "public_read_parishes" ON parishes FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_parishes" ON parishes;
CREATE POLICY "auth_insert_parishes" ON parishes FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_parishes" ON parishes;
CREATE POLICY "auth_update_parishes" ON parishes FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_parishes" ON parishes;
CREATE POLICY "auth_delete_parishes" ON parishes FOR DELETE TO authenticated USING (true);

-- MINISTRIES
CREATE TABLE IF NOT EXISTS ministries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  lead_name text,
  icon text,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE ministries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_ministries" ON ministries;
CREATE POLICY "public_read_ministries" ON ministries FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_ministries" ON ministries;
CREATE POLICY "auth_insert_ministries" ON ministries FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_ministries" ON ministries;
CREATE POLICY "auth_update_ministries" ON ministries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_ministries" ON ministries;
CREATE POLICY "auth_delete_ministries" ON ministries FOR DELETE TO authenticated USING (true);

-- TESTIMONIES
CREATE TABLE IF NOT EXISTS testimonies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE testimonies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_approved_testimonies" ON testimonies;
CREATE POLICY "public_read_approved_testimonies" ON testimonies FOR SELECT TO anon, authenticated USING (approved = true);
DROP POLICY IF EXISTS "anon_insert_testimonies" ON testimonies;
CREATE POLICY "anon_insert_testimonies" ON testimonies FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_testimonies" ON testimonies;
CREATE POLICY "auth_update_testimonies" ON testimonies FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_testimonies" ON testimonies;
CREATE POLICY "auth_delete_testimonies" ON testimonies FOR DELETE TO authenticated USING (true);

-- PRAYER REQUESTS
CREATE TABLE IF NOT EXISTS prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  request text NOT NULL,
  is_private boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_prayer_requests" ON prayer_requests;
CREATE POLICY "anon_insert_prayer_requests" ON prayer_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_read_prayer_requests" ON prayer_requests;
CREATE POLICY "auth_read_prayer_requests" ON prayer_requests FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_update_prayer_requests" ON prayer_requests;
CREATE POLICY "auth_update_prayer_requests" ON prayer_requests FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_prayer_requests" ON prayer_requests;
CREATE POLICY "auth_delete_prayer_requests" ON prayer_requests FOR DELETE TO authenticated USING (true);

-- NEWSLETTER SUBSCRIBERS
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_read_newsletter" ON newsletter_subscribers;
CREATE POLICY "auth_read_newsletter" ON newsletter_subscribers FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_delete_newsletter" ON newsletter_subscribers;
CREATE POLICY "auth_delete_newsletter" ON newsletter_subscribers FOR DELETE TO authenticated USING (true);

-- INDEXES for performance
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_sermons_date ON sermons(date);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_leadership_display_order ON leadership(display_order);
CREATE INDEX IF NOT EXISTS idx_ministries_display_order ON ministries(display_order);
