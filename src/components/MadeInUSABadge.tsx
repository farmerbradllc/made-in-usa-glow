
import React from 'react';
import { cn } from '@/lib/utils';
import { Flag } from 'lucide-react';

export type BadgeStyle = 'standard' | 'round' | 'ribbon' | 'flag';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

export interface MadeInUSABadgeProps {
  style?: BadgeStyle;
  size?: BadgeSize;
  position?: BadgePosition;
  animated?: boolean;
  glowing?: boolean;
  showIcon?: boolean;
  className?: string;
  customText?: string;
  onClick?: () => void;
}

const MadeInUSABadge: React.FC<MadeInUSABadgeProps> = ({
  style = 'standard',
  size = 'md',
  position = 'top-right',
  animated = true,
  glowing = true,
  showIcon = true,
  className,
  customText,
  onClick,
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-1.5 px-3',
    lg: 'text-base py-2 px-4',
  };

  // Position classes (for when badge is used in a positioned container)
  const positionClasses = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  // Style classes
  const styleClasses = {
    standard: 'bg-usa-blue text-usa-white border-2 border-usa-white',
    round: 'bg-usa-blue text-usa-white rounded-full border-2 border-usa-white',
    ribbon: 'bg-usa-red text-usa-white before:content-[""] before:absolute before:top-0 before:border-t-transparent before:border-r-usa-blue',
    flag: 'usa-stripes-bg text-usa-blue font-bold',
  };

  // Animation classes
  const animationClasses = animated ? {
    standard: 'hover:scale-105 transition-transform',
    round: 'hover:scale-105 transition-transform',
    ribbon: 'hover:skew-x-1 transition-transform',
    flag: 'animate-flag-wave',
  } : {
    standard: '',
    round: '',
    ribbon: '',
    flag: '',
  };

  // Glow effect
  const glowClass = glowing ? 'animate-pulse-glow usa-badge-shadow' : '';

  return (
    <div
      className={cn(
        'font-bold shadow-md inline-flex items-center gap-1.5 relative z-10 transition-all duration-300',
        styleClasses[style],
        sizeClasses[size],
        animationClasses[style],
        glowClass,
        style === 'standard' || style === 'flag' ? 'rounded-md' : '',
        style === 'ribbon' ? 'pl-3 pr-5 rounded-r-md' : '',
        className
      )}
      onClick={onClick}
    >
      {showIcon && (
        <Flag 
          className={cn(
            "stroke-current", 
            size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5',
            animated ? 'animate-star-shine' : ''
          )}
        />
      )}
      <span>{customText || 'MADE IN USA'}</span>
    </div>
  );
};

export const MadeInUSAPositioned: React.FC<MadeInUSABadgeProps> = (props) => {
  const { position = 'top-right' } = props;
  
  return (
    <div className={cn('absolute', positionClasses[position])}>
      <MadeInUSABadge {...props} />
    </div>
  );
};

export default MadeInUSABadge;
