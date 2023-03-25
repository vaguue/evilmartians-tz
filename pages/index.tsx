import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

import { useRouter } from 'next/router';

import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

import { MdCircle } from 'react-icons/md';
import { RxTriangleDown } from 'react-icons/rx';

import { Alert, Button, EmailField, PasswordField, TextField } from '@/components';

type FormValues = {
  username: string;
  email: string;
  password: string;
  passwordcheck: string;
  apiError: string;
};

type ServerSideProps = {
  locale: string;
};

type PageProps = {
  prepopulateFormValues: {
    email?: string;
  };
};

export const getServerSideProps = async ({ locale }: ServerSideProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});

export default function Home({ prepopulateFormValues = {} }: PageProps) {
  const { t } = useTranslation('common', { keyPrefix: 'translation' });

  const router = useRouter();

  const methods = useForm<FormValues>({
    defaultValues: prepopulateFormValues,
  });

  const {
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const handleErrors = async (resp: Response) => {
    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.message);
    }
  };

  const signUp: SubmitHandler<FormValues> = async (data) => {
    await fetch('/api/auth/signup', {
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(handleErrors)
      .catch((err) => {
        methods.setError('apiError', { message: err.message });
      });
  };

  return (
    <>
      <NextSeo title={t('sign-up') as string} description={t('sign-up') as string} />
      <main>
        <div
          className='flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8'
          aria-labelledby='modal-title'
          role='dialog'
          aria-modal='true'>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='mx-2 bg-white px-4 py-8 shadow sm:rounded-t-lg sm:px-10'>
              <div className='sm:mx-auto sm:w-full sm:max-w-md mb-8'>
                <h2 className='text-center text-3xl font-extrabold text-gray-900'>
                  {t('create-your-account')}
                </h2>
              </div>
              <p className='text-sm text-gray-400'>{t('description.0')}<br/><br/>{t('description.1')}</p>
              <div className='relative mt-4'>
                <div className='absolute inset-0 flex items-center' aria-hidden='true'>
                  <div className='w-full border-t border-gray-300'>
                  </div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='bg-white px-2 text-gray-500'>
                    <RxTriangleDown/>
                  </span>
                </div>
              </div>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(signUp)} className='space-y-6 bg-white'>
                  {errors.apiError && <Alert severity='error' message={t('error.api')} />}
                  <div className='space-y-2'>
                    <TextField
                      addOnLeading={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/`}
                      {...register('username')}
                      required
                    />
                    <EmailField
                      {...register('email')}
                      disabled={Boolean(prepopulateFormValues?.email)}
                      className='disabled:bg-gray-200 disabled:hover:cursor-not-allowed'
                      required
                    />
                    <PasswordField
                      labelProps={{
                        className: 'block text-sm font-medium text-gray-700',
                      }}
                      {...register('password')}
                      className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
                      required
                    />
                    <PasswordField
                      label={t('confirm-password')}
                      {...register('passwordcheck', {
                        validate: (value) =>
                          value === methods.watch('password') || (t('error.password-mismatch') as string),
                      })}
                    />
                    <div className='text-gray mt-2 flex items-center text-sm text-gray-700'>
                      <ul className='ml-2'>
                        <li>
                          <MdCircle className='inline-block ltr:mr-2 rtl:ml-2 w-2'/>
                          {t('password-rules.0')}
                        </li>
                        <li>
                          <MdCircle className='inline-block ltr:mr-2 rtl:ml-2 w-2'/>
                          {t('password-rules.1')}
                        </li>
                        <li>
                          <MdCircle className='inline-block ltr:mr-2 rtl:ml-2 w-2'/>
                          {t('password-rules.2')}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='flex space-x-2 rtl:space-x-reverse'>
                    <Button type='submit' loading={isSubmitting} className='w-7/12 justify-center'>
                      {t('create-account')}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
            <div className='mx-2 border border-gray-300 bg-gray-100 px-4 py-6 sm:px-10 rounded-b-lg'>
              <p className='text-xs leading-5 text-gray-500'>
                {t('terms.0')}<a className='font-medium text-gray-900 hover:underline' href='#'>{t('terms.1')}</a>{t('terms.2')}<a className='font-medium text-gray-900 hover:underline' href='#'>{t('terms.3')}</a>{t('terms.4')}<a className='font-medium text-gray-900 hover:underline' href='mailto:support@mail.com'>{t('terms.5')}</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
