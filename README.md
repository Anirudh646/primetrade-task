# Task Management Dashboard

A modern task management application built with React, TypeScript, and Supabase. Features user authentication, task creation, Kanban board, and responsive design.

## Features

- User authentication and profiles
- Create, edit, and delete tasks
- Kanban board view with drag-and-drop
- Task filtering and search
- Dashboard with statistics
- Responsive design with dark mode support

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **UI**: shadcn-ui, Tailwind CSS, Radix UI
- **Backend**: Supabase
- **State Management**: React Query, Context API
- **Forms**: React Hook Form, Zod validation
- **Drag & Drop**: @dnd-kit

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd build-your-first-app-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components
│   └── dashboard/   # Dashboard-specific components
├── contexts/        # React contexts
├── hooks/           # Custom hooks
├── integrations/    # External service integrations
├── lib/             # Utilities
├── pages/           # Page components
└── main.tsx         # App entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
