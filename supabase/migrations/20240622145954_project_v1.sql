ALTER TABLE projects
ADD COLUMN url TEXT,
ADD COLUMN model TEXT,
ADD COLUMN competitor TEXT,
ADD COLUMN competitor_analysis JSONB,
ADD COLUMN version NUMERIC;
