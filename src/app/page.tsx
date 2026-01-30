'use client';

import { useState } from 'react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Modal,
  Badge,
  PriceChangeBadge,
  Skeleton,
  SkeletonCard,
  Spinner,
} from '@/components/ui';

/**
 * Демо-страница для показа всех UI компонентов
 * Это помогает проверить работу компонентов и показать их потенциальному работодателю
 */
export default function HomePage() {
  // Состояние для модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Состояние для демо загрузки
  const [isLoading, setIsLoading] = useState(false);

  // Демо функция загрузки
  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <main className="container-app py-8">
      <div className="animate-in">
        {/* Заголовок */}
        <div className="mb-12">
          <h1 className="mb-2 text-4xl font-bold text-dark-900 dark:text-dark-50">
            Crypto Dashboard
          </h1>
          <p className="text-lg text-dark-500 dark:text-dark-400">
            UI Component Library Demo
          </p>
        </div>

        {/* Секция: Buttons */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-dark-900 dark:text-dark-50">
            Buttons
          </h2>

          <Card>
            <CardContent>
              {/* Варианты */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-medium text-dark-500">
                  Variants
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="success">Success</Button>
                </div>
              </div>

              {/* Размеры */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-medium text-dark-500">Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* Состояния */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-dark-500">
                  States
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button isLoading>Loading</Button>
                  <Button onClick={handleLoadingDemo} isLoading={isLoading}>
                    {isLoading ? 'Processing...' : 'Click to Load'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Секция: Inputs */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-dark-900 dark:text-dark-50">
            Inputs
          </h2>

          <Card>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Input label="Default Input" placeholder="Enter text..." />

                <Input
                  label="With Helper Text"
                  placeholder="Enter email..."
                  helperText="We'll never share your email"
                />

                <Input
                  label="With Error"
                  placeholder="Enter password..."
                  error="Password must be at least 8 characters"
                />

                <Input
                  label="Disabled"
                  placeholder="Cannot edit..."
                  disabled
                />

                <Input
                  label="With Icon"
                  placeholder="Search..."
                  leftElement={
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  }
                />

                <Input
                  label="Different Sizes"
                  placeholder="Large input"
                  size="lg"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Секция: Cards */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-dark-900 dark:text-dark-50">
            Cards
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader title="Default Card" subtitle="With header and content" />
              <CardContent>
                <p className="text-dark-600 dark:text-dark-300">
                  This is a basic card with header and content sections.
                </p>
              </CardContent>
            </Card>

            <Card variant="outline">
              <CardHeader title="Outline Variant" />
              <CardContent>
                <p className="text-dark-600 dark:text-dark-300">
                  Card with border only, no shadow.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader
                title="Elevated"
                action={<Badge variant="success">New</Badge>}
              />
              <CardContent>
                <p className="text-dark-600 dark:text-dark-300">
                  Card with stronger shadow for emphasis.
                </p>
              </CardContent>
            </Card>

            <Card hoverable className="md:col-span-2 lg:col-span-1">
              <CardHeader title="Hoverable Card" />
              <CardContent>
                <p className="text-dark-600 dark:text-dark-300">
                  Hover over me to see the effect!
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Confirm</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Секция: Badges */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-dark-900 dark:text-dark-50">
            Badges
          </h2>

          <Card>
            <CardContent>
              {/* Варианты */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-medium text-dark-500">
                  Variants
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="warning">Warning</Badge>
                </div>
              </div>

              {/* Price Change */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-dark-500">
                  Price Change (Crypto)
                </h3>
                <div className="flex flex-wrap gap-2">
                  <PriceChangeBadge value={5.25} />
                  <PriceChangeBadge value={-3.12} />
                  <PriceChangeBadge value={0} />
                  <PriceChangeBadge value={12.5} size="lg" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Секция: Modal */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-dark-900 dark:text-dark-50">
            Modal
          </h2>

          <Card>
            <CardContent>
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Confirm Transaction"
                description="Please review your transaction details"
              >
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-dark-500">Amount</span>
                    <span className="font-medium">0.5 BTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-500">Price</span>
                    <span className="font-medium">$21,500.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-500">Total</span>
                    <span className="font-bold text-lg">$10,750.00</span>
                  </div>
                </div>

                <Modal.Footer>
                  <Button
                    variant="ghost"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setIsModalOpen(false)}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
            </CardContent>
          </Card>
        </section>

        {/* Секция: Loading States */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-dark-900 dark:text-dark-50">
            Loading States
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Spinners */}
            <Card>
              <CardHeader title="Spinners" />
              <CardContent>
                <div className="flex items-center gap-6">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <Spinner size="xl" color="text-success-500" />
                </div>
              </CardContent>
            </Card>

            {/* Skeletons */}
            <Card>
              <CardHeader title="Skeletons" />
              <CardContent>
                <div className="space-y-4">
                  <Skeleton width="60%" height={20} />
                  <Skeleton width="100%" height={16} />
                  <Skeleton width="80%" height={16} />
                  <div className="flex items-center gap-3 pt-2">
                    <Skeleton variant="circular" width={40} height={40} />
                    <div className="flex-1 space-y-2">
                      <Skeleton width="50%" height={14} />
                      <Skeleton width="30%" height={12} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skeleton Card Preset */}
            <Card className="md:col-span-2">
              <CardHeader title="Skeleton Card Preset" />
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Статус */}
        <div className="rounded-lg border border-success-200 bg-success-50 p-4 dark:border-success-800 dark:bg-success-950">
          <p className="text-sm text-success-700 dark:text-success-300">
            ✅ Stage 2 complete! All UI components are ready for use.
          </p>
        </div>
      </div>
    </main>
  );
}
