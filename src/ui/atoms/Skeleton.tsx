import React from 'react';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  rounded?: boolean;
};

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ rounded = false, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={[
          props.className,
          'bg-gray-100',
          rounded ? 'rounded-xl' : '',
        ].join(' ')}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';
