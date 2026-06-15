import React, { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// FIELD CONFIGS (Strategy Pattern)
// Each country declares an ordered list of fields. The `type` on each field is
// the discriminator the renderer uses to choose an input control. Note: a field
// with no `type` (like zipCode below) falls back to a plain text input.
// ─────────────────────────────────────────────────────────────────────────────

const US_FORM_FIELDS = [
  { label: 'Address Line 1', key: 'addressLine1', type: 'text' },
  { label: 'Address Line 2', key: 'addressLine2', type: 'text' },
  { label: 'City',           key: 'city',         type: 'text' },
  { label: 'State',          key: 'state',        type: 'us_state' },
  { label: 'Zip Code',       key: 'zipCode' },
];

const AUS_FORM_FIELDS = [
  { label: 'Address Line 1', key: 'addressLine1', type: 'text' },
  { label: 'Address Line 2', key: 'addressLine2', type: 'text' },
  { label: 'Suburb',         key: 'suburb',       type: 'text' },
  { label: 'State',          key: 'state',        type: 'aus_state' },
  { label: 'Zip Code',       key: 'zipCode' },
];

const COUNTRY_FIELDS = {
  US:  US_FORM_FIELDS,
  AUS: AUS_FORM_FIELDS,
};

// ─────────────────────────────────────────────────────────────────────────────
// MOCK API
// Stands in for a real endpoint. Swap fetchStateOptions's body for a real
// `fetch()` call — the components don't care where the data comes from.
// A module-level cache prevents re-fetching the same list repeatedly.
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_DB = {
  us_state: [
    { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' }, { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' }, { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' }, { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' }, { value: 'WA', label: 'Washington' },
  ],
  aus_state: [
    { value: 'NSW', label: 'New South Wales' }, { value: 'VIC', label: 'Victoria' },
    { value: 'QLD', label: 'Queensland' }, { value: 'WA', label: 'Western Australia' },
    { value: 'SA', label: 'South Australia' }, { value: 'TAS', label: 'Tasmania' },
    { value: 'ACT', label: 'Australian Capital Territory' }, { value: 'NT', label: 'Northern Territory' },
  ],
};

const optionsCache = {};

function fetchStateOptions(type) {
  // Real version:
  //   return fetch(`/api/regions/${type}`).then(r => r.json()).then(j => j.data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = MOCK_DB[type];
      if (data) resolve(data);
      else reject(new Error(`No options found for "${type}"`));
    }, 700); // simulate network latency
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// INPUT CONTROLS
// Every control shares the same contract: it receives `field`, `value`, and
// `onChange(key, value)`. That uniform interface is what lets the parent form
// treat a text box and an async dropdown identically.
// ─────────────────────────────────────────────────────────────────────────────

function TextInput({ field, value, onChange }) {
  return (
    <input
      id={field.key}
      type="text"
      className="ctrl"
      value={value}
      placeholder={field.placeholder || ''}
      onChange={(e) => onChange(field.key, e.target.value)}
    />
  );
}

// A select that fetches its own options from the API based on field.type.
// Used for both us_state and aus_state — the `type` decides which list loads.
function AsyncStateSelect({ field, value, onChange }) {
  const [options, setOptions] = useState(optionsCache[field.type] || []);
  const [status, setStatus]   = useState(optionsCache[field.type] ? 'ready' : 'loading');

  useEffect(() => {
    let cancelled = false;

    // Serve from cache if we've fetched this type before
    if (optionsCache[field.type]) {
      setOptions(optionsCache[field.type]);
      setStatus('ready');
      return;
    }

    setStatus('loading');
    fetchStateOptions(field.type)
      .then((data) => {
        if (cancelled) return;
        optionsCache[field.type] = data; // cache for next time
        setOptions(data);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    // Avoid setting state if the field unmounts mid-fetch (e.g. country switch)
    return () => { cancelled = true; };
  }, [field.type]);

  if (status === 'error') {
    return (
      <div className="ctrl ctrl-error-box">
        Couldn’t load options.{' '}
        <button type="button" className="retry" onClick={() => {
          delete optionsCache[field.type];
          setStatus('loading');
          fetchStateOptions(field.type)
            .then((data) => { optionsCache[field.type] = data; setOptions(data); setStatus('ready'); })
            .catch(() => setStatus('error'));
        }}>Retry</button>
      </div>
    );
  }

  return (
    <select
      id={field.key}
      className="ctrl"
      value={value}
      disabled={status === 'loading'}
      onChange={(e) => onChange(field.key, e.target.value)}
    >
      <option value="">
        {status === 'loading' ? 'Loading…' : `Select ${field.label}`}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTROL REGISTRY
// Maps a field.type → the component that renders it. Adding a new input type
// means writing one component and adding one line here. Anything not in the map
// (including a field with no type, like zipCode) falls back to TextInput.
// ─────────────────────────────────────────────────────────────────────────────

const CONTROL_REGISTRY = {
  text:      TextInput,
  us_state:  AsyncStateSelect,
  aus_state: AsyncStateSelect,
};

function FormField({ field, value, onChange }) {
  const Control = CONTROL_REGISTRY[field.type] || TextInput;
  return (
    <div className="field">
      <label className="field-label" htmlFor={field.key}>{field.label}</label>
      <Control field={field} value={value} onChange={onChange} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC FORM (parent)
// Owns the <form>, the values state, and submission. Renders whatever field
// list the selected country maps to. When the country changes, values reset so
// stale fields from the previous country don't leak into the next submission.
// ─────────────────────────────────────────────────────────────────────────────

function DynamicAddressForm({ country }) {
  const fields = COUNTRY_FIELDS[country] || [];
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(null);

  // Reset form data whenever the country changes
  useEffect(() => {
    setValues({});
    setSubmitted(null);
  }, [country]);

  const handleChange = (key, value) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted({ country, ...values });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FormField
          key={field.key}
          field={field}
          value={values[field.key] || ''}
          onChange={handleChange}
        />
      ))}

      <button type="submit" className="submit">Save Address</button>

      {submitted && (
        <pre className="result">{JSON.stringify(submitted, null, 2)}</pre>
      )}
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DEMO WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [country, setCountry] = useState('US');

  return (
    <div className="page">
      <style>{CSS}</style>

      <div className="card">
        <header className="head">
          <h1>Address</h1>
          <p>Fields adapt to the selected country. State lists load from an API.</p>
        </header>

        <div className="field">
          <label className="field-label" htmlFor="country">Country</label>
          <select
            id="country"
            className="ctrl"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="US">United States</option>
            <option value="AUS">Australia</option>
          </select>
        </div>

        <hr className="rule" />

        <DynamicAddressForm country={country} />
      </div>
    </div>
  );
}

const CSS = `
  * { box-sizing: border-box; }
  .page {
    min-height: 100%;
    padding: 32px 16px;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #1a1a2e;
  }
  .card {
    max-width: 460px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #e6e6ef;
    border-radius: 14px;
    padding: 28px;
    box-shadow: 0 1px 2px rgba(20,20,50,.04), 0 12px 32px rgba(20,20,50,.06);
  }
  .head h1 { margin: 0; font-size: 1.4rem; font-weight: 700; letter-spacing: -.02em; }
  .head p  { margin: 6px 0 0; font-size: .85rem; color: #6b6b80; line-height: 1.5; }
  .rule { border: none; border-top: 1px solid #eeeef4; margin: 22px 0; }
  .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .field-label { font-size: .8rem; font-weight: 600; color: #3a3a52; }
  .ctrl {
    width: 100%;
    padding: 10px 12px;
    font-size: .9rem;
    font-family: inherit;
    color: #1a1a2e;
    background: #fff;
    border: 1.5px solid #e0e0ec;
    border-radius: 9px;
    transition: border-color .15s, box-shadow .15s;
    appearance: none;
  }
  .ctrl:focus {
    outline: none;
    border-color: #5b5bd6;
    box-shadow: 0 0 0 3px rgba(91,91,214,.14);
  }
  .ctrl:disabled { background: #f5f5fa; color: #9a9ab0; cursor: wait; }
  select.ctrl {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b6b80' d='M6 8 0 0h12z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 32px;
  }
  .ctrl-error-box {
    display: flex; align-items: center; gap: 8px;
    color: #c0392b; font-size: .82rem; border-color: #f0c0bb; background: #fdf3f2;
  }
  .retry {
    border: none; background: #c0392b; color: #fff;
    padding: 4px 10px; border-radius: 6px; font-size: .78rem; cursor: pointer;
  }
  .submit {
    width: 100%; margin-top: 6px; padding: 12px;
    font-size: .92rem; font-weight: 600; font-family: inherit;
    color: #fff; background: #5b5bd6; border: none; border-radius: 9px;
    cursor: pointer; transition: background .15s;
  }
  .submit:hover { background: #4a4ac4; }
  .result {
    margin-top: 18px; padding: 14px; background: #1a1a2e; color: #c8f7c5;
    border-radius: 9px; font-size: .78rem; overflow-x: auto;
    font-family: 'SF Mono', Menlo, monospace;
  }
`;
