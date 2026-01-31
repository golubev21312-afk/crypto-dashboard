import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui';

/**
 * Тесты для Card
 * Tests for Card
 */
describe('Card', () => {
  /**
   * Рендерит содержимое
   * Renders children
   */
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  /**
   * Применяет вариант default по умолчанию
   * Applies default variant by default
   */
  it('applies default variant', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('border', 'shadow-sm');
  });

  /**
   * Применяет вариант outline
   * Applies outline variant
   */
  it('applies outline variant', () => {
    const { container } = render(<Card variant="outline">Content</Card>);
    expect(container.firstChild).toHaveClass('border-2');
  });

  /**
   * Применяет вариант elevated
   * Applies elevated variant
   */
  it('applies elevated variant', () => {
    const { container } = render(<Card variant="elevated">Content</Card>);
    expect(container.firstChild).toHaveClass('shadow-lg');
  });

  /**
   * Применяет hover эффекты
   * Applies hover effects
   */
  it('applies hoverable styles', () => {
    const { container } = render(<Card hoverable>Content</Card>);
    expect(container.firstChild).toHaveClass('cursor-pointer');
  });

  /**
   * Применяет кастомный className
   * Applies custom className
   */
  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">Content</Card>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

/**
 * Тесты для CardHeader
 * Tests for CardHeader
 */
describe('CardHeader', () => {
  /**
   * Рендерит title
   * Renders title
   */
  it('renders title', () => {
    render(<CardHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  /**
   * Рендерит subtitle
   * Renders subtitle
   */
  it('renders subtitle', () => {
    render(<CardHeader title="Title" subtitle="Subtitle text" />);
    expect(screen.getByText('Subtitle text')).toBeInTheDocument();
  });

  /**
   * Рендерит action
   * Renders action
   */
  it('renders action', () => {
    render(
      <CardHeader
        title="Title"
        action={<button>Action</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  /**
   * Рендерит children вместо title/subtitle
   * Renders children instead of title/subtitle
   */
  it('renders children instead of title/subtitle', () => {
    render(
      <CardHeader>
        <span>Custom Header</span>
      </CardHeader>
    );
    expect(screen.getByText('Custom Header')).toBeInTheDocument();
  });
});

/**
 * Тесты для CardContent
 * Tests for CardContent
 */
describe('CardContent', () => {
  /**
   * Рендерит содержимое
   * Renders children
   */
  it('renders children', () => {
    render(<CardContent>Content text</CardContent>);
    expect(screen.getByText('Content text')).toBeInTheDocument();
  });

  /**
   * Применяет padding
   * Applies padding
   */
  it('applies padding class', () => {
    const { container } = render(<CardContent>Content</CardContent>);
    expect(container.firstChild).toHaveClass('p-6');
  });
});

/**
 * Тесты для CardFooter
 * Tests for CardFooter
 */
describe('CardFooter', () => {
  /**
   * Рендерит содержимое
   * Renders children
   */
  it('renders children', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  /**
   * Применяет border-top
   * Applies border-top
   */
  it('applies border class', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    expect(container.firstChild).toHaveClass('border-t');
  });
});

/**
 * Тесты для составного Card
 * Tests for composed Card
 */
describe('Composed Card', () => {
  /**
   * Рендерит полную карточку
   * Renders full card
   */
  it('renders full card with all parts', () => {
    render(
      <Card>
        <CardHeader title="Card Title" subtitle="Card subtitle" />
        <CardContent>Main content</CardContent>
        <CardFooter>
          <button>Cancel</button>
          <button>Save</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card subtitle')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });
});
