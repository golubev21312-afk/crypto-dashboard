import { render, screen } from '@testing-library/react';
import { Badge, PriceChangeBadge } from '@/components/ui';

describe('Badge', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders with default variant', () => {
      render(<Badge>Default</Badge>);
      expect(screen.getByText('Default')).toHaveClass('bg-dark-100');
    });

    it('renders different variants', () => {
      const { rerender } = render(<Badge variant="primary">Primary</Badge>);
      expect(screen.getByText('Primary')).toHaveClass('bg-primary-100');

      rerender(<Badge variant="success">Success</Badge>);
      expect(screen.getByText('Success')).toHaveClass('bg-success-100');

      rerender(<Badge variant="danger">Danger</Badge>);
      expect(screen.getByText('Danger')).toHaveClass('bg-danger-100');

      rerender(<Badge variant="warning">Warning</Badge>);
      expect(screen.getByText('Warning')).toHaveClass('bg-amber-100');
    });

    it('renders different sizes', () => {
      const { rerender } = render(<Badge size="sm">Small</Badge>);
      expect(screen.getByText('Small')).toHaveClass('text-xs');

      rerender(<Badge size="lg">Large</Badge>);
      expect(screen.getByText('Large')).toHaveClass('text-sm');
    });
  });

  describe('icons', () => {
    it('renders left icon', () => {
      render(
        <Badge leftIcon={<span data-testid="icon">★</span>}>
          With Icon
        </Badge>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('custom className', () => {
    it('applies custom className', () => {
      render(<Badge className="custom-class">Custom</Badge>);
      expect(screen.getByText('Custom')).toHaveClass('custom-class');
    });
  });
});

describe('PriceChangeBadge', () => {
  describe('positive values', () => {
    it('shows success variant for positive values', () => {
      render(<PriceChangeBadge value={5.25} />);
      const badge = screen.getByText('+5.25%');
      expect(badge).toHaveClass('bg-success-100');
    });

    it('includes plus sign for positive values', () => {
      render(<PriceChangeBadge value={10} />);
      expect(screen.getByText('+10.00%')).toBeInTheDocument();
    });
  });

  describe('negative values', () => {
    it('shows danger variant for negative values', () => {
      render(<PriceChangeBadge value={-3.5} />);
      const badge = screen.getByText('-3.50%');
      expect(badge).toHaveClass('bg-danger-100');
    });

    it('does not include plus sign for negative values', () => {
      render(<PriceChangeBadge value={-7.89} />);
      expect(screen.getByText('-7.89%')).toBeInTheDocument();
    });
  });

  describe('zero value', () => {
    it('shows default variant for zero', () => {
      render(<PriceChangeBadge value={0} />);
      // Для нуля не добавляем знак + (только для положительных)
      const badge = screen.getByText('0.00%');
      expect(badge).toHaveClass('bg-dark-100');
    });
  });

  describe('formatting', () => {
    it('formats to 2 decimal places', () => {
      render(<PriceChangeBadge value={5.555} />);
      // toFixed(2) обрезает, а не округляет: 5.555 -> 5.55
      expect(screen.getByText('+5.55%')).toBeInTheDocument();
    });

    it('adds trailing zeros if needed', () => {
      render(<PriceChangeBadge value={5} />);
      expect(screen.getByText('+5.00%')).toBeInTheDocument();
    });
  });

  describe('size prop', () => {
    it('accepts size prop', () => {
      render(<PriceChangeBadge value={5} size="lg" />);
      expect(screen.getByText('+5.00%')).toHaveClass('text-sm');
    });
  });
});
