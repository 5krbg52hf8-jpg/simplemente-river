-- Agregar la columna 'plays' a la tabla 'metrics'
ALTER TABLE metrics ADD COLUMN IF NOT EXISTS plays integer DEFAULT 0;
