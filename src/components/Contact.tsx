'use client';

import { FormEvent, useState } from 'react';

const LIMITS = { name: 100, email: 254, details: 1000 };
const PROJECT_TYPES = ['Radio commercial', 'Audio imaging', 'Event recording', 'Other'] as const;
const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const HEADER_UNSAFE = /[\u0000-\u001F\u007F\u2028\u2029]/;
const FALLBACK_MAIL =
  'mailto:creative@mpdee.co.uk?subject=Audio%20production%20enquiry';
const FALLBACK_MESSAGE =
  'Your message could not be sent. Please try again or email creative@mpdee.co.uk.';

type FieldName = 'name' | 'email' | 'projectType' | 'details';
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = 'idle' | 'pending' | 'success' | 'error';

type FormValues = {
  name: string;
  email: string;
  projectType: string;
  details: string;
  hp: string;
};

const emptyValues: FormValues = {
  name: '',
  email: '',
  projectType: '',
  details: '',
  hp: '',
};

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const details = values.details.trim();

  if (!name) errors.name = 'Name is required.';
  else if (name.length > LIMITS.name || HEADER_UNSAFE.test(name)) {
    errors.name = 'Name must be 100 characters or fewer.';
  }

  if (!email) errors.email = 'Email is required.';
  else if (email.length > LIMITS.email || HEADER_UNSAFE.test(email) || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!PROJECT_TYPES.includes(values.projectType as (typeof PROJECT_TYPES)[number])) {
    errors.projectType = 'Choose a project type.';
  }

  if (!details) errors.details = 'Tell us what you need recorded.';
  else if (details.length > LIMITS.details) {
    errors.details = 'Details must be 1000 characters or fewer.';
  }

  return errors;
}

function Arrow() {
  return (
    <svg className="arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19 19 5M5 5h14v14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Contact() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function update(field: keyof FormValues, value: string) {
    setValues(current => ({ ...current, [field]: value }));
    if (field !== 'hp' && fieldErrors[field]) {
      setFieldErrors(current => ({ ...current, [field]: undefined }));
    }
    if (status === 'success' || status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setStatus('error');
      setErrorMessage('Check the highlighted fields and try again.');
      return;
    }

    setFieldErrors({});
    setStatus('pending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          projectType: values.projectType,
          details: values.details.trim(),
          mpdee_hp: values.hp,
        }),
      });

      let payload: unknown = null;
      try {
        payload = await response.json();
      } catch {
        payload = null;
      }

      if (!response.ok || !payload || typeof payload !== 'object' ||
          !('message' in payload) || typeof payload.message !== 'string' || !payload.message.trim()) {
        const serverError =
          payload &&
          typeof payload === 'object' &&
          'error' in payload &&
          typeof (payload as { error?: unknown }).error === 'string'
            ? (payload as { error: string }).error
            : FALLBACK_MESSAGE;
        setStatus('error');
        setErrorMessage(serverError);
        return;
      }

      setStatus('success');
      setErrorMessage('');
    } catch {
      setStatus('error');
      setErrorMessage(FALLBACK_MESSAGE);
    }
  }

  const pending = status === 'pending';

  return (
    <form className="contact-form" aria-labelledby="contact-heading" noValidate onSubmit={handleSubmit}>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="mpdee_hp">Company website</label>
        <input
          id="mpdee_hp"
          name="mpdee_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.hp}
          onChange={event => update('hp', event.target.value)}
        />
      </div>

      <div className="contact-row">
        <div className="contact-field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            value={values.name}
            disabled={pending}
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
            onChange={event => update('name', event.target.value)}
          />
          {fieldErrors.name ? (
            <p id="contact-name-error" className="field-error">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={LIMITS.email}
            value={values.email}
            disabled={pending}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
            onChange={event => update('email', event.target.value)}
          />
          {fieldErrors.email ? (
            <p id="contact-email-error" className="field-error">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="contact-project-type">Project type</label>
        <select
          id="contact-project-type"
          name="projectType"
          required
          value={values.projectType}
          disabled={pending}
          aria-invalid={fieldErrors.projectType ? true : undefined}
          aria-describedby={fieldErrors.projectType ? 'contact-project-type-error' : undefined}
          onChange={event => update('projectType', event.target.value)}
        >
          <option value="">Select a project type</option>
          {PROJECT_TYPES.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {fieldErrors.projectType ? (
          <p id="contact-project-type-error" className="field-error">
            {fieldErrors.projectType}
          </p>
        ) : null}
      </div>

      <div className="contact-field">
        <label htmlFor="contact-details">Details</label>
        <textarea
          id="contact-details"
          name="details"
          required
          rows={6}
          maxLength={LIMITS.details}
          value={values.details}
          disabled={pending}
          aria-invalid={fieldErrors.details ? true : undefined}
          aria-describedby={fieldErrors.details ? 'contact-details-error' : undefined}
          onChange={event => update('details', event.target.value)}
        />
        {fieldErrors.details ? (
          <p id="contact-details-error" className="field-error">
            {fieldErrors.details}
          </p>
        ) : null}
      </div>

      <div className="form-status" aria-live="polite">
        {status === 'pending' ? <p role="status">Sending your brief.</p> : null}
        {status === 'success' ? (
          <p role="status">Message sent. We will reply by email.</p>
        ) : null}
        {status === 'error' ? (
          <p role="alert" className="is-error">
            {errorMessage}
          </p>
        ) : null}
      </div>

      <button className="button button-dark" type="submit" disabled={pending || status === 'success'} aria-busy={pending}>
        {pending ? 'Sending…' : status === 'success' ? 'Message sent' : 'Send the brief'}
        <Arrow />
      </button>

      <p className="contact-fallback">
        If the form does not send, email{' '}
        <a href={FALLBACK_MAIL}>creative@mpdee.co.uk</a>.
      </p>
    </form>
  );
}
