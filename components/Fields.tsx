import { useId } from '@/lib/hooks';
import type { ReactElement, ReactNode, Ref } from 'react';
import React, { forwardRef } from 'react';
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { FormProvider, useFormContext } from 'react-hook-form';

import classnames from 'classnames';
import { useTranslation } from 'next-i18next';

import { Alert } from '@/components';

type InputProps = Omit<JSX.IntrinsicElements['input'], 'name'> & { name: string };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className={classnames(
        'block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-800 sm:text-sm',
        props.className
      )}
    />
  );
});

export function Label(props: JSX.IntrinsicElements['label']) {
  return (
    <label {...props} className={classnames('block text-sm font-medium text-gray-700', props.className)}>
      {props.children}
    </label>
  );
}

type InputFieldProps = {
  label?: ReactNode;
  hint?: ReactNode;
  addOnLeading?: ReactNode;
} & React.ComponentProps<typeof Input> & {
    labelProps?: React.ComponentProps<typeof Label>;
  };

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(props, ref) {
  const id = useId();
  const { t } = useTranslation('common', { keyPrefix: 'translation' });
  const methods = useFormContext();
  const {
    label = t(props.name),
    labelProps,
    placeholder = t(props.name + '-placeholder') !== props.name + '-placeholder'
      ? t(props.name + '-placeholder')
      : '',
    className,
    addOnLeading,
    hint,
    ...passThrough
  } = props;
  return (
    <div>
      {!!props.name && (
        <Label htmlFor={id} {...labelProps}>
          {label}
        </Label>
      )}
      {addOnLeading ? (
        <div className='mt-1 flex rounded-md shadow-sm'>
          <div className='flex min-h-full addon-wrapper border border-gray-300 px-3 bg-gray-100 ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0 items-center'>
            <span className='inline-flex rounded-none text-sm text-gray-500'>
              {addOnLeading}
            </span>
          </div>
          <Input
            id={id}
            placeholder={placeholder as string}
            className={classnames('mt-0', props.addOnLeading && 'rounded-l-none', className)}
            {...passThrough}
            ref={ref}
          />
        </div>
      ) : (
        <Input id={id} placeholder={placeholder as string} className={className} {...passThrough} ref={ref} />
      )}
      {hint}
      {methods?.formState?.errors[props.name]?.message && (
        <Alert
          className='mt-1'
          severity='error'
          message={<>{methods.formState.errors[props.name]!.message}</>}
        />
      )}
    </div>
  );
});

export const TextField = forwardRef<HTMLInputElement, InputFieldProps>(function TextField(props, ref) {
  return <InputField ref={ref} {...props} />;
});

export const PasswordField = forwardRef<HTMLInputElement, InputFieldProps>(function PasswordField(
  props,
  ref
) {
  return (
    <InputField data-testid='password' type='password' placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;' ref={ref} {...props} />
  );
});

export const EmailInput = forwardRef<HTMLInputElement, InputFieldProps>(function EmailInput(props, ref) {
  return (
    <Input
      ref={ref}
      type='email'
      autoCapitalize='none'
      autoComplete='email'
      autoCorrect='off'
      inputMode='email'
      {...props}
    />
  );
});

export const EmailField = forwardRef<HTMLInputElement, InputFieldProps>(function EmailField(props, ref) {
  return (
    <InputField
      ref={ref}
      type='email'
      autoCapitalize='none'
      autoComplete='email'
      autoCorrect='off'
      inputMode='email'
      {...props}
    />
  );
});
