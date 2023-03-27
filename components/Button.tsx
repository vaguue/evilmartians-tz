import Link from 'next/link';
import React, { forwardRef } from 'react';

import classnames from 'classnames';

const classes = [
  'items-center',
  'relative',
  'transition-colors',
  'dark:text-black',
  'h-9',
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-brand-500',
  'dark:hover:bg-darkgray-600',
  'dark:bg-darkgray-900',
  'flex',
  'w-full',
  'justify-center',
  'rounded-sm',
  'border',
  'border-transparent',
  'bg-gray-900',
  'px-4',
  'py-2',
  'text-sm',
  'font-medium',
  'text-white',
  'shadow-sm',
  'hover:bg-gray-800',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-gray-900',
  'focus:ring-offset-2',
];

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, any>(function Button(
  props: any,
  forwardedRef
) {
  const {
    loading = false,
    className = '',
    ...passThroughProps
  } = props;

  return <button ref={forwardedRef} className={classnames(...classes, loading ? 'cursor-wait bg-gray-100' : '', className)} {...passThroughProps}>{props.children}</button>;
});
