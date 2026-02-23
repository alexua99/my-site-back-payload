-- Add generate_slug column to open_jobs table
ALTER TABLE open_jobs ADD COLUMN IF NOT EXISTS generate_slug boolean DEFAULT true;
