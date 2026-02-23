# Black Apple React

A modern Apple Store clone built with React 19 and Vite. Features product showcases with smooth animations, responsive design, and a component-driven architecture.

## Tech Stack

- **React 19** — UI framework
- **Vite 7** — Build tool & dev server
- **Styled Components** — CSS-in-JS styling
- **Framer Motion** — Animation library
- **ESLint + Prettier** — Code quality & formatting

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/black-apple-react.git
cd black-apple-react
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── assets/
│   ├── data/         # Product data & route definitions
│   └── images/       # Static images
├── components/       # Reusable UI components
├── main.jsx          # App entry point
└── main.css          # Global styles
```

## Path Aliases

| Alias          | Path               |
| -------------- | ------------------ |
| `@`            | `src/`             |
| `@components`  | `src/components/`  |
| `~img`         | `src/assets/images/`|
| `#types`       | `src/types/`       |

## Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start development server     |
| `npm run build`   | Build for production         |
| `npm run preview` | Preview production build     |
| `npm run lint`    | Run ESLint                   |

## License

MIT
