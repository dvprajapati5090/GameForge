# Contributing to GameForge

Thank you for considering contributing to GameForge! We welcome all kinds of contributions — bug fixes, features, documentation improvements, and more.

## 🛠 Development Setup

Follow the [Getting Started](README.md#-getting-started) guide in the README to set up your local environment.

## 🌿 Branching Strategy

We use a simple feature-branch workflow:

- `main` — stable, production-ready code
- `dev` — integration branch for features
- `feature/<name>` — individual feature branches
- `fix/<name>` — bug fix branches
- `docs/<name>` — documentation-only changes

## 📝 Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

Examples:
feat(tournament): add double elimination bracket support
fix(auth): resolve refresh token cookie expiry issue
docs(readme): update API reference table
style(client): fix navbar alignment on mobile
refactor(team): extract invitation logic into service
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 🔄 Pull Request Process

1. Fork the repository and create your branch from `dev`
2. Make your changes with meaningful commits
3. Ensure your code follows the existing style and conventions
4. Test your changes manually (and add tests if applicable)
5. Update documentation if your changes affect public APIs or features
6. Open a Pull Request against the `dev` branch
7. Fill in the PR template with a clear description of your changes

## ✅ Code Style Guidelines

### General
- Use meaningful variable and function names
- Keep functions small and focused (single responsibility)
- Comment complex logic, not obvious code

### Backend (Server)
- Follow the existing controller → service → model layered architecture
- Use `async/await` with proper try/catch or error propagation
- Always throw `ApiError` (not native Error) in service/controller layers
- Validate all incoming request data before processing

### Frontend (Client)
- Use functional components with hooks
- Keep components focused; extract shared logic into custom hooks
- Use TanStack Query for all server data fetching
- Keep Zustand store minimal — only for truly global auth state
- Prefer named exports for components

## 🐛 Reporting Bugs

Open a GitHub Issue with:
- A clear, descriptive title
- Steps to reproduce the bug
- Expected vs. actual behavior
- Screenshots (if applicable)
- Browser / Node.js version

## 💡 Suggesting Features

Open a GitHub Issue with the `enhancement` label:
- Describe the problem your feature solves
- Describe the proposed solution
- Any alternatives you've considered

## 📄 License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
