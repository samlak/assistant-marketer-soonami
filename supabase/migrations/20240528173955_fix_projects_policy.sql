DROP POLICY IF EXISTS "Users can update their own projects" ON projects;

-- Create the updated policy
CREATE POLICY "Users can update their own projects"
ON projects FOR UPDATE TO authenticated
USING (
  auth.uid() = created_by
);

-- Grant the update privilege to the authenticated role
GRANT UPDATE ON projects TO authenticated;
