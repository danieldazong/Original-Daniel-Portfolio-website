/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, FormEvent } from 'react';
import { X, ArrowUpRight, Check, Loader2 } from 'lucide-react';
import { Resource } from '../types';
import emailjs from '@emailjs/browser';


const EMAILJS_SERVICE_ID = 'service_cueozue';
const EMAILJS_TEMPLATE_ID = 'template_ew27j28';        // sends file to visitor
const EMAILJS_LEAD_TEMPLATE_ID = 'template_jpu5bda';   // sends lead info to you
const EMAILJS_PUBLIC_KEY = 'OjDw08WIifrTMqLIf';




type Status = 'idle' | 'submitting' | 'success' | 'error';

interface Props {
  resource: Resource | null;
  onClose: () => void;
}

export default function ResourceDownloadModal({ resource, onClose }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [emailError, setEmailError] = useState('');

  // Reset on open + lock body scroll while modal is open
  useEffect(() => {
    if (resource) {
      setStatus('idle');
      setErrorMsg('');
      setEmailError('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [resource]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const isValidEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!re.test(email)) return false;
    const domain = email.split('@')[1]?.toLowerCase() ?? '';
    if (domain.includes('..') || domain.startsWith('.') || domain.endsWith('.')) return false;
    const typos = ['gmial.com', 'gmai.com', 'gnail.com', 'hotmial.com', 'yahho.com', 'outlok.com'];
    if (typos.includes(domain)) return false;
    return true;
  };

  if (!resource) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = (formData.get('email') as string) || '';
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid, existing email address.');
      return;
    }
    setEmailError('');

       const firstName = (formData.get('first_name') as string) || 'there';

    setStatus('submitting');
    setErrorMsg('');

    try {
  // 1. Email the download link to the visitor
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      to_email: email,
      first_name: firstName,
      resource_title: resource.title,
      download_link: resource.fileUrl,
      brand_name: 'Daniel Dazong',
    },
    { publicKey: EMAILJS_PUBLIC_KEY }
  );

  // 2. Email the lead info to you
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_LEAD_TEMPLATE_ID,
    {
      first_name: firstName,
      lead_email: email,
      resource_title: resource.title,
    },
    { publicKey: EMAILJS_PUBLIC_KEY }
  );

  setStatus('success');
} catch {
  setStatus('error');
  setErrorMsg('Something went wrong sending the email. Please try again.');
}
  };


   



  const inputClass =
    'w-full rounded-xl border border-border-custom bg-surface px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-text-primary transition-colors';
  const labelClass = 'block font-sans text-sm font-medium text-text-primary mb-2';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border-custom bg-surface p-6 md:p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-full text-text-secondary hover:text-text-primary hover:bg-bg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

                {status === 'success' ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-text-primary text-surface">
              <Check className="w-7 h-7" />
            </div>
                        <h3 className="font-space text-2xl font-bold text-text-primary mb-2">Check your inbox</h3>
            <p className="font-sans text-sm text-text-secondary mb-6 max-w-sm mx-auto leading-relaxed">
              I've emailed your download link for{' '}
              <span className="font-semibold text-text-primary">{resource.title}</span>. It should arrive shortly —
              please check your spam folder if you don't see it.
            </p>
            <button
              onClick={onClose}
              className="group/cta relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-text-primary text-surface font-sans text-sm font-semibold overflow-hidden border border-transparent hover:border-text-primary transition-colors duration-300"
            >
              <span aria-hidden="true" className="absolute inset-0 z-0 bg-surface translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
              <span className="relative z-10 transition-colors duration-300 group-hover/cta:text-text-primary">
                Done
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 transition-colors duration-300 group-hover/cta:text-text-primary" />
            </button>

          </div>
        ) : (

          <>
            <h3 className="font-space text-xl font-bold text-text-primary pr-8">{resource.title}</h3>
                        <p className="font-sans text-sm text-text-secondary mt-1.5 mb-6">
              Enter your details and your download will start instantly.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass} htmlFor="dl_first_name">
                    First name <span className="text-text-primary">*</span>
                  </label>
                  <input id="dl_first_name" name="first_name" type="text" required placeholder="Jane" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="dl_last_name">Last name</label>
                  <input id="dl_last_name" name="last_name" type="text" placeholder="Doe" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="dl_email">
                  Email <span className="text-text-primary">*</span>
                </label>
                <input
                  id="dl_email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className={inputClass}
                  onChange={() => emailError && setEmailError('')}
                />
                {emailError && (
                  <p className="font-sans text-[12px] text-red-600 font-medium mt-1.5">{emailError}</p>
                )}
              </div>

              {status === 'error' && (
                <p className="font-sans text-sm text-red-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group/cta relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-text-primary text-surface font-sans text-sm md:text-base font-semibold overflow-hidden border border-transparent hover:border-text-primary transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span aria-hidden="true" className="absolute inset-0 z-0 bg-surface translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
                <span className="relative z-10 transition-colors duration-300 group-hover/cta:text-text-primary">
                  {status === 'submitting' ? 'Sending...' : 'Get download link'}
                </span>
                {status === 'submitting' ? (
                  <Loader2 className="relative z-10 w-4 h-4 animate-spin group-hover/cta:text-text-primary" />
                ) : (
                  <ArrowUpRight className="relative z-10 w-4 h-4 transition-colors duration-300 group-hover/cta:text-text-primary" />
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
