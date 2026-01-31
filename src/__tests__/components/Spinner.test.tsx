import { render, screen } from '@testing-library/react';
import { Spinner, SpinnerOverlay, SpinnerContainer } from '@/components/ui';

/**
 * Тесты для Spinner
 * Tests for Spinner
 */
describe('Spinner', () => {
  /**
   * Рендерит спиннер
   * Renders spinner
   */
  it('renders spinner', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  /**
   * Имеет дефолтный label для accessibility
   * Has default label for accessibility
   */
  it('has default aria-label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Loading...'
    );
  });

  /**
   * Применяет кастомный label
   * Applies custom label
   */
  it('applies custom label', () => {
    render(<Spinner label="Загрузка данных..." />);
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Загрузка данных...'
    );
  });

  /**
   * Показывает текст label когда showLabel=true
   * Shows label text when showLabel=true
   */
  it('shows label text when showLabel is true', () => {
    render(<Spinner showLabel label="Loading data" />);
    expect(screen.getByText('Loading data')).toBeInTheDocument();
  });

  /**
   * Скрывает текст label по умолчанию
   * Hides label text by default
   */
  it('hides label text by default', () => {
    render(<Spinner label="Loading" />);
    // Текст должен быть в sr-only
    // Text should be in sr-only
    expect(screen.getByText('Loading')).toHaveClass('sr-only');
  });

  /**
   * Применяет разные размеры
   * Applies different sizes
   */
  it('applies different sizes', () => {
    const { rerender, container } = render(<Spinner size="sm" />);
    expect(container.querySelector('svg')).toHaveClass('h-4', 'w-4');

    rerender(<Spinner size="md" />);
    expect(container.querySelector('svg')).toHaveClass('h-6', 'w-6');

    rerender(<Spinner size="lg" />);
    expect(container.querySelector('svg')).toHaveClass('h-8', 'w-8');

    rerender(<Spinner size="xl" />);
    expect(container.querySelector('svg')).toHaveClass('h-12', 'w-12');
  });

  /**
   * Применяет кастомный цвет
   * Applies custom color
   */
  it('applies custom color', () => {
    const { container } = render(<Spinner color="text-success-500" />);
    expect(container.querySelector('svg')).toHaveClass('text-success-500');
  });

  /**
   * Имеет анимацию вращения
   * Has spin animation
   */
  it('has spin animation', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('svg')).toHaveClass('animate-spin');
  });
});

/**
 * Тесты для SpinnerOverlay
 * Tests for SpinnerOverlay
 */
describe('SpinnerOverlay', () => {
  /**
   * Рендерит оверлей
   * Renders overlay
   */
  it('renders overlay', () => {
    const { container } = render(<SpinnerOverlay />);
    expect(container.firstChild).toHaveClass('fixed', 'inset-0', 'z-50');
  });

  /**
   * Показывает спиннер с label
   * Shows spinner with label
   */
  it('shows spinner with label', () => {
    render(<SpinnerOverlay label="Processing..." />);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  /**
   * Имеет backdrop blur
   * Has backdrop blur
   */
  it('has backdrop blur', () => {
    const { container } = render(<SpinnerOverlay />);
    expect(container.firstChild).toHaveClass('backdrop-blur-sm');
  });
});

/**
 * Тесты для SpinnerContainer
 * Tests for SpinnerContainer
 */
describe('SpinnerContainer', () => {
  /**
   * Рендерит контейнер со спиннером
   * Renders container with spinner
   */
  it('renders container with spinner', () => {
    render(<SpinnerContainer />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  /**
   * Имеет минимальную высоту
   * Has minimum height
   */
  it('has minimum height', () => {
    const { container } = render(<SpinnerContainer />);
    expect(container.firstChild).toHaveClass('min-h-[200px]');
  });

  /**
   * Применяет кастомный размер
   * Applies custom size
   */
  it('applies custom size', () => {
    const { container } = render(<SpinnerContainer size="xl" />);
    expect(container.querySelector('svg')).toHaveClass('h-12', 'w-12');
  });

  /**
   * Применяет кастомный className
   * Applies custom className
   */
  it('applies custom className', () => {
    const { container } = render(
      <SpinnerContainer className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
