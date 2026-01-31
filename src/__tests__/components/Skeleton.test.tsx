import { render, screen } from '@testing-library/react';
import {
  Skeleton,
  SkeletonCard,
  SkeletonTableRow,
  SkeletonMetric,
} from '@/components/ui';

/**
 * Тесты для Skeleton
 * Tests for Skeleton
 */
describe('Skeleton', () => {
  /**
   * Рендерит с дефолтными стилями
   * Renders with default styles
   */
  it('renders with default styles', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild;

    expect(skeleton).toHaveClass('animate-pulse', 'bg-dark-200');
  });

  /**
   * Применяет вариант text
   * Applies text variant
   */
  it('applies text variant', () => {
    const { container } = render(<Skeleton variant="text" />);
    expect(container.firstChild).toHaveClass('rounded');
  });

  /**
   * Применяет вариант circular
   * Applies circular variant
   */
  it('applies circular variant', () => {
    const { container } = render(<Skeleton variant="circular" />);
    expect(container.firstChild).toHaveClass('rounded-full');
  });

  /**
   * Применяет вариант rectangular
   * Applies rectangular variant
   */
  it('applies rectangular variant', () => {
    const { container } = render(<Skeleton variant="rectangular" />);
    expect(container.firstChild).toHaveClass('rounded-lg');
  });

  /**
   * Применяет ширину и высоту числами
   * Applies width and height as numbers
   */
  it('applies width and height as numbers', () => {
    const { container } = render(<Skeleton width={100} height={50} />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton.style.width).toBe('100px');
    expect(skeleton.style.height).toBe('50px');
  });

  /**
   * Применяет ширину и высоту строками
   * Applies width and height as strings
   */
  it('applies width and height as strings', () => {
    const { container } = render(<Skeleton width="50%" height="2rem" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton.style.width).toBe('50%');
    expect(skeleton.style.height).toBe('2rem');
  });

  /**
   * Рендерит несколько скелетонов с count
   * Renders multiple skeletons with count
   */
  it('renders multiple skeletons with count', () => {
    const { container } = render(<Skeleton count={3} />);
    const skeletons = container.querySelectorAll('.animate-pulse');

    expect(skeletons).toHaveLength(3);
  });

  /**
   * Применяет кастомный className
   * Applies custom className
   */
  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  /**
   * Скрыт от screen readers
   * Hidden from screen readers
   */
  it('is hidden from screen readers', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});

/**
 * Тесты для SkeletonCard
 * Tests for SkeletonCard
 */
describe('SkeletonCard', () => {
  /**
   * Рендерит карточку-скелетон
   * Renders skeleton card
   */
  it('renders skeleton card', () => {
    const { container } = render(<SkeletonCard />);

    // Должен содержать несколько скелетонов
    // Should contain multiple skeletons
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  /**
   * Имеет border и padding
   * Has border and padding
   */
  it('has card styling', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.firstChild).toHaveClass('rounded-xl', 'border', 'p-6');
  });
});

/**
 * Тесты для SkeletonTableRow
 * Tests for SkeletonTableRow
 */
describe('SkeletonTableRow', () => {
  /**
   * Рендерит с дефолтным количеством колонок
   * Renders with default column count
   */
  it('renders with default column count', () => {
    const { container } = render(<SkeletonTableRow />);
    const skeletons = container.querySelectorAll('.animate-pulse');

    expect(skeletons).toHaveLength(4);
  });

  /**
   * Рендерит с кастомным количеством колонок
   * Renders with custom column count
   */
  it('renders with custom column count', () => {
    const { container } = render(<SkeletonTableRow columns={6} />);
    const skeletons = container.querySelectorAll('.animate-pulse');

    expect(skeletons).toHaveLength(6);
  });
});

/**
 * Тесты для SkeletonMetric
 * Tests for SkeletonMetric
 */
describe('SkeletonMetric', () => {
  /**
   * Рендерит скелетон метрики
   * Renders metric skeleton
   */
  it('renders metric skeleton', () => {
    const { container } = render(<SkeletonMetric />);
    const skeletons = container.querySelectorAll('.animate-pulse');

    // Должен быть label, value, change
    // Should have label, value, change
    expect(skeletons).toHaveLength(3);
  });
});
