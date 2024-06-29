CREATE TABLE contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project UUID NOT NULL REFERENCES projects (id),
  channel TEXT,
  note TEXT,
  text TEXT,
  created_by UUID NOT NULL REFERENCES auth.users (id) DEFAULT auth.uid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE contents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert contents"
ON contents FOR INSERT TO authenticated WITH CHECK (
  auth.uid() = created_by
);

CREATE POLICY "Users can query their own contents"
ON contents FOR SELECT TO authenticated USING (
  auth.uid() = created_by
);

CREATE POLICY "Users can update their own contents"
ON contents FOR UPDATE TO authenticated
USING (
  auth.uid() = created_by
);

CREATE POLICY "Users can delete their own contents"
ON contents FOR DELETE TO authenticated USING (
  auth.uid() = created_by
);

GRANT UPDATE ON contents TO authenticated;
