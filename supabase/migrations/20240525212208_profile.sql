CREATE TABLE profile (
  user_id UUID NOT NULL,
  email TEXT NULL,
  name TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);

CREATE TYPE user_role AS ENUM ('ADMIN', 'SUBSCRIBER');

CREATE TABLE user_roles (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User roles visibility" ON user_roles
USING (auth.uid() = user_id);

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create profile" 
ON profile FOR INSERT TO authenticated WITH CHECK (
  auth.uid() = user_id
);

CREATE POLICY "User and Admin can select profile" 
ON profile FOR SELECT 
USING (
  auth.uid() = user_id 
  OR 
  EXISTS (
    SELECT 1 
    FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('ADMIN')
  )
);

CREATE POLICY "User and Admin can update profile" 
ON profile FOR UPDATE 
USING (
  auth.uid() = user_id 
  OR 
  EXISTS (
    SELECT 1 
    FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('ADMIN')
  )
);

CREATE POLICY "User and Admin can delete profile" 
ON profile FOR DELETE 
USING (
  auth.uid() = user_id 
  OR 
  EXISTS (
    SELECT 1 
    FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('ADMIN')
  )
);

CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER 
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.profile (user_id, email, name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'name');

    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'SUBSCRIBER');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_new_user
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();
