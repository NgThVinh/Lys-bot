#!/bin/sh
# Entrypoint script - initializes database.yml if not exists

if [ ! -f "/app/database.yml" ]; then
  echo "database.yml not found, creating with default content..."
  cat > /app/database.yml << 'EOF'
# Database file - auto-generated
# This file is managed by the bot
---
{}
EOF
  echo "database.yml created successfully."
else
  echo "database.yml found, skipping initialization."
fi

exec "$@"
