# atomic-pm

Atomic PM is react-admin demo application that showcases:
- Custom layouts
- Supabase integration
- React-admin Enterprise Edition 

There are two versions:
- One that uses FakeRest, suitable for public demos
- One that uses Supabase

## Installation

Install the application dependencies by running:

```sh
bun install
```

If you want to use the local version of Supabase, run:
```sh
bunx supabase start
```

If you plan to use a hosted instance of Supabase, you'll have to update the `.env` file to provide your instance URL and API keys.

## Development

Start the application in development mode by running:

```sh
bun run dev
# or with Supabase
bun run dev-supabase
```

## Production

Build the application in production mode by running:

```sh
bun run build
```

If you plan to build for a remote Supabase instance:
- Copy your `.env` file to `.env.production` and adjust its variables (set `VITE_SUPABASE_URL`, `VITE_SUPAPASE_ANON_KEY`, `VITE_ENABLE_MSW=false` and `VITE_PROVIDER=supabase`)
- Run `bun run build`
