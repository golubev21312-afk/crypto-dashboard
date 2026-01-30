import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui';

describe('Button', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders with default variant (primary)', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary-600');
    });

    it('renders different variants', () => {
      const { rerender } = render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-dark-100');

      rerender(<Button variant="danger">Danger</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-danger-500');

      rerender(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-transparent');
    });

    it('renders different sizes', () => {
      const { rerender } = render(<Button size="sm">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('h-8');

      rerender(<Button size="md">Medium</Button>);
      expect(screen.getByRole('button')).toHaveClass('h-10');

      rerender(<Button size="lg">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('h-12');
    });
  });

  describe('behavior', () => {
    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Disabled</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} isLoading>Loading</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    it('shows spinner when loading', () => {
      render(<Button isLoading>Loading</Button>);
      // Spinner имеет класс animate-spin
      expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('is disabled when loading', () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('icons', () => {
    it('renders left icon', () => {
      render(
        <Button leftIcon={<span data-testid="left-icon">←</span>}>
          With Icon
        </Button>
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders right icon', () => {
      render(
        <Button rightIcon={<span data-testid="right-icon">→</span>}>
          With Icon
        </Button>
      );
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('hides left icon when loading', () => {
      render(
        <Button isLoading leftIcon={<span data-testid="left-icon">←</span>}>
          Loading
        </Button>
      );
      expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
    });
  });

  describe('fullWidth', () => {
    it('applies full width class', () => {
      render(<Button fullWidth>Full Width</Button>);
      expect(screen.getByRole('button')).toHaveClass('w-full');
    });
  });

  describe('accessibility', () => {
    it('can receive focus', () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('cannot receive focus when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });
});
