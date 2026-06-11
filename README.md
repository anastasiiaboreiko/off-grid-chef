# Off-Grid_Chef

Off-Grid Chef is a recipe discovery web application designed to help users find suitable meals based on electricity availability, cooking time, meal type, and recipe difficulty. The platform was inspired by real-life situations where access to electricity may be limited, making meal planning more challenging.

🔗 **Live Demo:** [Off-Grid_Chef](https://anastasiiaboreiko.github.io/off-grid-chef/)  
🎨 **Design:** [Off-Grid_Chef_Figma Design](https://www.figma.com/design/kFtngTSFurXaOWIluGSNOK/Team-Project?node-id=1968-2308&p=f&t=9jQLknT8yJDIuIIH-0)  

## Features
- Browse a collection of recipes
- Filter recipes by:
  -- Electricity availability
  -- Cooking time
  -- Meal type
  -- Difficulty level
- View detailed recipe information
- Add ingredients to a shopping cart
- Manage cart contents
- Demo checkout functionality
- Responsive design for mobile, tablet, and desktop devices
  
## Technologies
- React
- TypeScript
- React Router
- REST API
- Vite
- GitHub Pages
  
## Development Principles
- Component-based architecture
- Responsive and mobile-friendly design
- Reusable UI components
- Type-safe development with TypeScript
- Clean and maintainable codebase
- Modern React practices and hooks
- Client-side routing with React Router
- API integration and asynchronous data handling

---
### Local React + Django application for browsing recipes that work with or without power.

## Requirements

- Node.js 20+
- npm
- Docker Desktop

## Environment files

Create the frontend env file from the example:

```bash
cp .env_example .env
```

Create the backend env file from the example:

```bash
cp backend/recipes_kitchen/.env_example backend/recipes_kitchen/.env
```

The default local API URL is:

```text
http://127.0.0.1:8001/api
```

## Start the backend

From the backend folder:

```bash
cd backend/recipes_kitchen
docker compose up --build
```

The backend runs at:

```text
http://127.0.0.1:8001
```

The API docs are available at:

```text
http://127.0.0.1:8001/api/docs/
```

The Docker command automatically runs migrations before starting Django.

It is safe to run this command every time you start working locally. If you did
not change backend dependencies or Docker configuration, you can use the faster
command:

```bash
docker compose up
```

Use `--build` when you change files such as:

- `backend/recipes_kitchen/requirements.txt`
- `backend/recipes_kitchen/Dockerfile`
- `backend/recipes_kitchen/docker-compose.yml`

## Load fixture data

In a second terminal, from `backend/recipes_kitchen`:

```bash
docker compose exec web python manage.py loaddata fixtures/db.json
```

You do not need to run `loaddata` every time. Run it only when the database is
empty or when you intentionally want to reload the fixture data.

You can verify the data with:

```bash
docker compose exec web python manage.py shell -c "from catalog.models import Recipes; print(Recipes.objects.count())"
```

## Start the frontend

From the project root:

```bash
npm install
npm run dev
```

The frontend runs at:

```text
http://127.0.0.1:5173/blackout-helper-js/
```

If you change `.env`, restart the Vite dev server.

## Useful commands

Run frontend production build:

```bash
npm run build
```

Check Django migrations:

```bash
cd backend/recipes_kitchen
docker compose exec web python manage.py makemigrations --check --dry-run
docker compose exec web python manage.py showmigrations
```

Run Django system checks:

```bash
cd backend/recipes_kitchen
docker compose exec web python manage.py check
```
