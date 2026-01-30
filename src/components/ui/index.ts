/**
 * UI Components Library
 *
 * Переиспользуемые компоненты для Crypto Dashboard.
 * Все компоненты поддерживают тёмную тему и полностью типизированы.
 */

// Button
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

// Input
export { Input } from './Input';
export type { InputProps, InputSize } from './Input';

// Card
export { Card, CardHeader, CardContent, CardFooter } from './Card';
export type {
  CardProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
  CardVariant,
  CardPadding,
} from './Card';

// Modal
export { Modal, ModalFooter } from './Modal';
export type { ModalProps, ModalFooterProps, ModalSize } from './Modal';

// Table
export { Table } from './Table';
export type {
  TableProps,
  TableColumn,
  SortDirection,
  TableAlign,
} from './Table';

// Skeleton
export {
  Skeleton,
  SkeletonCard,
  SkeletonTableRow,
  SkeletonMetric,
} from './Skeleton';
export type { SkeletonProps, SkeletonVariant } from './Skeleton';

// Badge
export { Badge, PriceChangeBadge } from './Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './Badge';

// Spinner
export { Spinner, SpinnerOverlay, SpinnerContainer } from './Spinner';
export type { SpinnerProps, SpinnerSize } from './Spinner';
