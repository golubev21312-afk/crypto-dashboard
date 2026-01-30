import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/ui';

describe('Input', () => {
  describe('rendering', () => {
    it('renders input element', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders label when provided', () => {
      render(<Input label="Email" />);
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('associates label with input', () => {
      render(<Input label="Email" />);
      const input = screen.getByLabelText('Email');
      expect(input).toBeInTheDocument();
    });

    it('renders different sizes', () => {
      const { rerender } = render(<Input size="sm" placeholder="small" />);
      expect(screen.getByPlaceholderText('small')).toHaveClass('h-8');

      rerender(<Input size="md" placeholder="medium" />);
      expect(screen.getByPlaceholderText('medium')).toHaveClass('h-10');

      rerender(<Input size="lg" placeholder="large" />);
      expect(screen.getByPlaceholderText('large')).toHaveClass('h-12');
    });
  });

  describe('error state', () => {
    it('displays error message', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('has error styling', () => {
      render(<Input error="Error" placeholder="input" />);
      expect(screen.getByPlaceholderText('input')).toHaveClass('border-danger-500');
    });

    it('has aria-invalid when error present', () => {
      render(<Input error="Error" placeholder="input" />);
      expect(screen.getByPlaceholderText('input')).toHaveAttribute('aria-invalid', 'true');
    });

    it('links error message with aria-describedby', () => {
      render(<Input error="Error message" placeholder="input" />);
      const input = screen.getByPlaceholderText('input');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(screen.getByRole('alert')).toHaveAttribute('id', describedBy);
    });
  });

  describe('helper text', () => {
    it('displays helper text', () => {
      render(<Input helperText="Enter your email address" />);
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    it('hides helper text when error is present', () => {
      render(
        <Input
          helperText="Helper text"
          error="Error message"
        />
      );
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  describe('elements', () => {
    it('renders left element', () => {
      render(
        <Input
          leftElement={<span data-testid="left-element">$</span>}
          placeholder="input"
        />
      );
      expect(screen.getByTestId('left-element')).toBeInTheDocument();
    });

    it('renders right element', () => {
      render(
        <Input
          rightElement={<span data-testid="right-element">👁</span>}
          placeholder="input"
        />
      );
      expect(screen.getByTestId('right-element')).toBeInTheDocument();
    });
  });

  describe('behavior', () => {
    it('calls onChange when typing', () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} placeholder="input" />);

      fireEvent.change(screen.getByPlaceholderText('input'), {
        target: { value: 'test' },
      });

      expect(handleChange).toHaveBeenCalled();
    });

    it('is disabled when disabled prop is true', () => {
      render(<Input disabled placeholder="input" />);
      expect(screen.getByPlaceholderText('input')).toBeDisabled();
    });

    it('accepts value prop for controlled input', () => {
      render(<Input value="test value" onChange={() => {}} placeholder="input" />);
      expect(screen.getByPlaceholderText('input')).toHaveValue('test value');
    });
  });

  describe('fullWidth', () => {
    it('applies full width to container', () => {
      const { container } = render(<Input fullWidth placeholder="input" />);
      expect(container.firstChild).toHaveClass('w-full');
    });
  });

  describe('accessibility', () => {
    it('can receive focus', () => {
      render(<Input placeholder="input" />);
      const input = screen.getByPlaceholderText('input');
      input.focus();
      expect(input).toHaveFocus();
    });

    it('supports custom id', () => {
      render(<Input id="custom-id" placeholder="input" />);
      expect(screen.getByPlaceholderText('input')).toHaveAttribute('id', 'custom-id');
    });
  });
});
