CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  description TEXT,
  stage TEXT,
  overview TEXT,
  tagline TEXT,
  mission TEXT,
  vision TEXT,
  values JSONB,
  voice TEXT,
  audience TEXT,
  personas JSONB,
  strategy JSONB,
  summary TEXT,
  created_by UUID NOT NULL REFERENCES auth.users (id) DEFAULT auth.uid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert projects"
ON projects FOR INSERT TO authenticated WITH CHECK (
  auth.uid() = created_by
);

CREATE POLICY "Users can query their own projects"
ON projects FOR SELECT TO authenticated USING (
  auth.uid() = created_by
);

CREATE POLICY "Users can update their own projects"
ON projects FOR UPDATE TO authenticated WITH CHECK (
  auth.uid() = created_by
);

CREATE POLICY "Users can delete their own projects"
ON projects FOR DELETE TO authenticated USING (
  auth.uid() = created_by
);
