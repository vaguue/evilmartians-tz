import { CheckCircleIcon, ExclamationIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import classnames from 'classnames';
import type { ReactNode } from 'react';

import { FiInfo } from 'react-icons/fi';

export interface AlertProps {
  title?: ReactNode;
  message?: ReactNode;
  actions?: ReactNode;
  className?: string;
  iconClassName?: string;
  severity: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}
export function Alert(props: AlertProps) {
  const { severity, iconClassName } = props;

  return (
    <div
      className={classnames(
        'rounded-md border border-opacity-20 p-3',
        props.className,
        severity === 'error' && 'border-red-900 bg-red-50 text-red-800',
        severity === 'warning' && 'border-yellow-700 bg-yellow-50 text-yellow-700',
        severity === 'info' && 'border-sky-700 bg-sky-50 text-sky-700',
        severity === 'success' && 'bg-gray-900 text-white',
        severity === 'neutral' && 'border-none bg-gray-100'
      )}>
      <div className='relative flex flex-row'>
        <div className='flex-shrink-0 w-5'>
          {severity === 'error' && (
            <XCircleIcon className={classnames('h-5 w-5 text-red-400', iconClassName)} aria-hidden='true' />
          )}
          {severity === 'warning' && (
            <ExclamationIcon
              className={classnames('h-5 w-5 text-yellow-400', iconClassName)}
              aria-hidden='true'
            />
          )}
          {severity === 'info' && (
            <InformationCircleIcon
              className={classnames('h-5 w-5 text-sky-400', iconClassName)}
              aria-hidden='true'
            />
          )}
          {severity === 'neutral' && (
            <FiInfo className={classnames('h-5 w-5 text-gray-800', iconClassName)} aria-hidden='true' />
          )}
          {severity === 'success' && (
            <CheckCircleIcon
              className={classnames('h-5 w-5 text-gray-400', iconClassName)}
              aria-hidden='true'
            />
          )}
        </div>
        <div className='ml-3 flex-grow'>
          <h3 className='text-sm font-medium'>{props.title}</h3>
          <div className='text-sm'>{props.message}</div>
        </div>
        {props.actions && <div className='absolute top-1 right-1 text-sm md:relative'>{props.actions}</div>}
      </div>
    </div>
  );
}
