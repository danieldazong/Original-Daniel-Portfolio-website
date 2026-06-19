/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const WEB3FORMS_ACCESS_KEY = '15587d8e-29f8-439c-a86d-1bef7b9f0244';

const REFERRAL_OPTIONS = [
  'LinkedIn',
  'Facebook',
  'YouTube',
  'Instagram',
  'Friend / Referral',
  'Other',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'New lead from Daniel Dazong portfolio');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  const inputClass =
    'w-full rounded-xl border border-border-custom bg-surface px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-text-primary transition-colors';
  const labelClass = 'block font-sans text-sm font-medium text-text-primary mb-2';

  return (
    <div className="min-h-screen bg-bg text-text-primary antialiased font-sans">
      <Header />

      <main>
        <section className="pt-28 pb-20 md:pt-36 md:pb-32 hero-grid-bg relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative">

            <Link
              to="/"
              className="group inline-flex items-center gap-2 mb-8 font-sans text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to home
            </Link>

            <div className="relative flex items-center justify-center mb-12 h-[120px] md:h-[160px]">
              <span className="portfolio-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                CONTACT
              </span>
              <h2 className="portfolio-heading relative z-10 text-text-primary text-4xl md:text-6xl lg:text-7xl text-center">
                /LET&apos;S TALK
              </h2>
            </div>

            <p className="font-sans text-base md:text-lg text-text-secondary max-w-xl mx-auto text-center mb-12 leading-relaxed">
              Tell me a little about you and your project. I will get back to you shortly.
            </p>

                              <div id="contact-form" className="max-w-2xl mx-auto">
              {status === 'success' ? (
                <div className="rounded-2xl border border-border-custom bg-surface p-10 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-text-primary text-surface">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-space text-2xl font-bold text-text-primary mb-2">
                    Message sent
                  </h3>
                  <p className="font-sans text-sm text-text-secondary mb-6">
                    Thanks for reaching out. I will be in touch soon.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-text-primary hover:underline"
                  >
                    Back to home
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-border-custom bg-surface p-6 md:p-8 flex flex-col gap-5"
                >
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass} htmlFor="first_name">
                        First name <span className="text-text-primary">*</span>
                      </label>
                      <input id="first_name" name="first_name" type="text" required placeholder="Jane" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="last_name">Last name</label>
                      <input id="last_name" name="last_name" type="text" placeholder="Doe" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="company">Company name</label>
                    <input id="company" name="company" type="text" placeholder="Acme Inc." className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass} htmlFor="email">
                        Email <span className="text-text-primary">*</span>
                      </label>
                      <input id="email" name="email" type="email" required placeholder="jane@company.com" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="phone">Phone number</label>
                      <input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="referral">How did you find me?</label>
                    <select id="referral" name="referral" defaultValue="" required className={inputClass + " cursor-pointer"}>
                      <option value="" disabled>Select an option</option>
                      {REFERRAL_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows={4} placeholder="Tell me about your project..." className={inputClass + " resize-none"} />
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
                      {status === 'submitting' ? 'Sending...' : 'Send message'}
                    </span>
                    {status === 'submitting' ? (
                      <Loader2 className="relative z-10 w-4 h-4 animate-spin group-hover/cta:text-text-primary" />
                    ) : (
                      <ArrowUpRight className="relative z-10 w-4 h-4 transition-colors duration-300 group-hover/cta:text-text-primary" />
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}