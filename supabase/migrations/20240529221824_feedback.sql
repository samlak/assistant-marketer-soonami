CREATE TABLE feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  improvement TEXT,
  suggestion TEXT,
  created_by UUID NOT NULL REFERENCES auth.users (id) DEFAULT auth.uid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert feedbacks"
ON feedbacks FOR INSERT TO authenticated WITH CHECK (
  auth.uid() = created_by
);

CREATE POLICY "Users can query their own feedbacks"
ON feedbacks FOR SELECT TO authenticated USING (
  auth.uid() = created_by
);

CREATE POLICY "Users can update their own feedbacks"
ON feedbacks FOR UPDATE TO authenticated USING (
  auth.uid() = created_by
);

CREATE POLICY "Users can delete their own feedbacks"
ON feedbacks FOR DELETE TO authenticated USING (
  auth.uid() = created_by
);

GRANT UPDATE ON feedbacks TO authenticated;
