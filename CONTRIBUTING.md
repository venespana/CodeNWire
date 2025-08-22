# Contributing to CodeNWire

Thank you for your interest in contributing to CodeNWire! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git
- VSCode (recommended)

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/CodeNWire.git
   cd CodeNWire
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 How to Contribute

### Reporting Bugs

1. Check existing issues to avoid duplicates
2. Use the bug report template
3. Include detailed reproduction steps
4. Provide environment information
5. Add screenshots if applicable

### Suggesting Features

1. Check existing feature requests
2. Use the feature request template
3. Explain the use case and benefits
4. Consider implementation complexity

### Code Contributions

1. **Pick an issue** from our GitHub Issues
2. **Comment on the issue** to let others know you're working on it
3. **Follow our coding standards** (see below)
4. **Write tests** for new functionality
5. **Update documentation** if needed
6. **Submit a pull request**

## 🛠️ Development Guidelines

### Code Style

We use ESLint and Prettier for consistent code formatting:

```bash
# Lint code
npm run lint

# Format code
npm run format
```

### Commit Messages

Follow conventional commits format:

```
type(scope): description

feat(frontend): add circuit component drag and drop
fix(backend): resolve WebSocket connection issue
docs(readme): update installation instructions
test(simulator): add GPIO state tests
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Testing

- Write unit tests for new functions
- Add integration tests for API endpoints
- Include E2E tests for critical user flows
- Ensure all tests pass before submitting PR

```bash
# Run all tests
npm run test

# Run tests for specific package
npm run test --workspace=packages/frontend
```

## 📁 Project Structure

### Frontend (React)
```
packages/frontend/src/
├── components/     # Reusable React components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── store/         # Zustand state management
├── services/      # API service functions
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

### Backend (Node.js)
```
packages/backend/src/
├── routes/        # Express route handlers
├── services/      # Business logic
├── models/        # Data models
├── middleware/    # Express middleware
├── socket/        # WebSocket event handlers
└── utils/         # Utility functions
```

### VSCode Extension
```
packages/vscode-extension/src/
├── commands/      # Extension commands
├── providers/     # Tree data providers
├── webview/       # Webview integration
└── utils/         # Utility functions
```

## 🎯 Component Guidelines

### React Components

- Use functional components with hooks
- Follow the single responsibility principle
- Use TypeScript for all components
- Include JSDoc comments for complex logic
- Use Material-UI components when possible

```typescript
interface ComponentProps {
  title: string;
  onAction: () => void;
}

/**
 * Example component with proper TypeScript and documentation
 */
export const ExampleComponent: React.FC<ComponentProps> = ({ 
  title, 
  onAction 
}) => {
  return (
    <Button onClick={onAction}>
      {title}
    </Button>
  );
};
```

### API Endpoints

- Use RESTful conventions
- Include proper error handling
- Validate input with Zod schemas
- Document with JSDoc comments

```typescript
/**
 * Create a new project
 * POST /api/projects
 */
router.post('/projects', async (req, res) => {
  try {
    const projectData = ProjectSchema.parse(req.body);
    const project = await projectService.create(projectData);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

## 🧪 Testing Guidelines

### Unit Tests

- Test individual functions and components
- Mock external dependencies
- Use descriptive test names
- Aim for >80% code coverage

```typescript
describe('CircuitComponent', () => {
  it('should render LED component with correct props', () => {
    const props = { type: 'led', color: 'red' };
    render(<CircuitComponent {...props} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Integration Tests

- Test API endpoints with real database
- Test WebSocket communication
- Test component interactions

### E2E Tests

- Test complete user workflows
- Use Playwright for browser automation
- Test critical paths only

## 📚 Documentation

### Code Documentation

- Use JSDoc for functions and classes
- Include parameter and return type descriptions
- Add usage examples for complex functions

### README Updates

- Update README.md for new features
- Include code examples
- Update installation instructions if needed

### API Documentation

- Document all endpoints
- Include request/response examples
- Update OpenAPI specification

## 🔄 Pull Request Process

1. **Ensure your branch is up to date**
   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main
   ```

2. **Run the full test suite**
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

3. **Create a pull request**
   - Use a descriptive title
   - Reference related issues
   - Include screenshots for UI changes
   - Add testing instructions

4. **Address review feedback**
   - Respond to all comments
   - Make requested changes
   - Re-request review when ready

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `task` - Development task
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `frontend` - React frontend related
- `backend` - Node.js backend related
- `vscode-extension` - VSCode extension related
- `testing` - Testing related
- `performance` - Performance improvements

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

### Communication

- Use GitHub Issues for bug reports and feature requests
- Use GitHub Discussions for questions and ideas
- Be patient with response times
- Provide clear and detailed information

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributor graphs
- Special mentions in project updates

## 📞 Getting Help

- Check existing documentation
- Search GitHub Issues
- Ask in GitHub Discussions
- Join our Discord community (coming soon)

Thank you for contributing to CodeNWire! 🚀
