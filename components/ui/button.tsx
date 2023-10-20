import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

export const buttonVariants = cva(
  'inline-block text-center px-6 py-3 rounded-xl border eq font-medium active:scale-105 disabled:border-shred disabled:bg-sherd disabled:text-white disabled:cursor-not-allowed whitespace-nowrap uppercase',
  {
    variants: {
      variant: {
        primary:
          'border-envy bg-envy text-black hover:border-envy/90 hover:bg-envy/90',
        secondary:
          'border-envy bg-transparent text-black hover:border-envy/90 hover:bg-envy/90',
        danger:
          'border-sherd bg-sherd text-white hover:border-sherd/90 hover:bg-sherd/90',
      },
      size: {
        auto: 'w-auto',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'auto',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  disabled,
  onClick,
  variant,
  size,
  isLoading,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        buttonVariants({ variant, size }),
        isLoading && 'flex items-center justify-center gap-2'
      )}
    >
      {isLoading && <Loader2 size={20} className='animate-spin' />}
      {children}
    </button>
  );
};

export default Button;
