CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE marketing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project UUID NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
  twitter JSONB,
  linkedin JSONB,
  seo JSONB,
  shorts JSONB,
  youtube JSONB,
  community JSONB,
  created_by UUID NOT NULL REFERENCES auth.users (id) DEFAULT auth.uid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE marketing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert marketing strategy"
ON marketing FOR INSERT TO authenticated WITH CHECK (
  auth.uid() = created_by
);

CREATE POLICY "Users can query their own marketing strategy"
ON marketing FOR SELECT TO authenticated USING (
  auth.uid() = created_by
);

CREATE POLICY "Users can update their own marketing strategy"
ON marketing FOR UPDATE TO authenticated USING (
  auth.uid() = created_by
);

CREATE POLICY "Users can delete their own marketing strategy"
ON marketing FOR DELETE TO authenticated USING (
  auth.uid() = created_by
);

GRANT UPDATE ON marketing TO authenticated;