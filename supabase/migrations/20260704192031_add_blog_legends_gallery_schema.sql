/*
# Add preacher_name to blog_posts, create rccg_legends and gallery_images tables

1. Changes
   - Add `preacher_name` (text) column to `blog_posts` for storing the name of the preacher on message-type posts.
   - Create `rccg_legends` table for short biography profiles of notable RCCG figures.
   - Create `gallery_images` table for the photo gallery.

2. New Tables
   - `rccg_legends` — id, name, title, era, photo_url, bio, display_order, created_at
   - `gallery_images` — id, image_url, caption, category ('event'|'general'), event_name, display_order, created_at

3. Security
   - RLS enabled on both new tables.
   - Public read (anon) for both — content is intentionally public.
   - Writes restricted to authenticated (admin) users.

4. Notes
   - Idempotent: uses IF NOT EXISTS / ADD COLUMN IF NOT EXISTS.
   - Policies dropped before create for idempotency.
*/

-- Add preacher_name to blog_posts
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS preacher_name text;

-- rccg_legends table
CREATE TABLE IF NOT EXISTS rccg_legends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text,
  era text,
  photo_url text,
  bio text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE rccg_legends ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_rccg_legends" ON rccg_legends;
CREATE POLICY "public_read_rccg_legends" ON rccg_legends
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_rccg_legends" ON rccg_legends;
CREATE POLICY "auth_insert_rccg_legends" ON rccg_legends
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_rccg_legends" ON rccg_legends;
CREATE POLICY "auth_update_rccg_legends" ON rccg_legends
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_rccg_legends" ON rccg_legends;
CREATE POLICY "auth_delete_rccg_legends" ON rccg_legends
  FOR DELETE TO authenticated USING (true);

-- gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  category text NOT NULL DEFAULT 'general',
  event_name text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_gallery_images" ON gallery_images;
CREATE POLICY "public_read_gallery_images" ON gallery_images
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_gallery_images" ON gallery_images;
CREATE POLICY "auth_insert_gallery_images" ON gallery_images
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_gallery_images" ON gallery_images;
CREATE POLICY "auth_update_gallery_images" ON gallery_images
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_gallery_images" ON gallery_images;
CREATE POLICY "auth_delete_gallery_images" ON gallery_images
  FOR DELETE TO authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_rccg_legends_display_order ON rccg_legends(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_images_display_order ON gallery_images(display_order);
