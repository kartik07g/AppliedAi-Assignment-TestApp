#!/bin/bash

echo "Waiting for database connection..."
until mysqladmin ping -h db --silent; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "Database is up - seeding data..."
python /app/seed_db.py  # Run the seed script

exec uvicorn api:app --host=0.0.0.0 --port=5000 --reload
