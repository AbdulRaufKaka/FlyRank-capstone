import { useState, type FormEvent } from 'react'
import './App.css'

type AuthMode = 'signup' | 'login'
type PasswordRule = 'length' | 'capital' | 'numbers' | 'special'

const passwordRules: { id: PasswordRule; label: string; test: (value: string) => boolean }[] = [
  { id: 'length', label: 'At least 8 characters', test: (value) => value.length >= 8 },
  { id: 'capital', label: 'One uppercase letter', test: (value) => /[A-Z]/.test(value) },
  { id: 'numbers', label: 'Two numbers', test: (value) => (value.match(/\d/g)?.length ?? 0) >= 2 },
  { id: 'special', label: 'One special character', test: (value) => /[^A-Za-z0-9]/.test(value) },
]

function App() {
  const [mode, setMode] = useState<AuthMode>('signup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode)
    setErrors({})
    setMessage('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}

    if (mode === 'signup' && !name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }
    if (!/^[^\s@]+@gmail\.com$/i.test(email.trim())) {
      nextErrors.email = 'Enter a valid Gmail address ending in @gmail.com.'
    }
    if (mode === 'signup') {
      if (!passwordRules.every((rule) => rule.test(password))) {
        nextErrors.password = 'Your password does not meet all the requirements.'
      }
    } else if (!password) {
      nextErrors.password = 'Please enter your password.'
    }

    setErrors(nextErrors)
    setMessage('')
    if (Object.keys(nextErrors).length === 0) {
      setMessage(
        mode === 'signup'
          ? 'Details validated. Account creation is not connected yet.'
          : 'Details validated. Sign-in is not connected yet.',
      )
    }
  }

  const updateEmail = (value: string) => {
    setEmail(value)
    setErrors((current) => ({ ...current, email: '' }))
    setMessage('')
  }

  const updatePassword = (value: string) => {
    setPassword(value)
    setErrors((current) => ({ ...current, password: '' }))
    setMessage('')
  }

  return (
    <main className="auth-page">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="/" aria-label="Northstar home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M16 3.5 19.2 12.8 28.5 16l-9.3 3.2L16 28.5l-3.2-9.3L3.5 16l9.3-3.2L16 3.5Z" />
              <path d="m24.8 4.7.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z" />
            </svg>
          </span>
          <span>northstar</span>
        </a>
        <div className="topbar-note"><span className="status-dot" /> A clearer path starts here</div>
      </header>

      <section className="auth-layout" aria-label="Account access">
        <div className="intro">
          <div className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT CHAPTER</div>
          <h1>Make room for<br /><span>what’s next.</span></h1>
          <p className="intro-copy">
            A little space to focus, find your rhythm, and make meaningful progress — one day at a time.
          </p>
          <div className="orbit-art" aria-hidden="true">
            <div className="orbit orbit-outer" />
            <div className="orbit orbit-inner" />
            <div className="orbit-core"><span className="orbit-star">✳</span></div>
            <span className="orbit-point point-one" />
            <span className="orbit-point point-two" />
            <span className="orbit-point point-three" />
            <div className="orbit-caption"><span>01</span> A fresh start, on your terms</div>
          </div>
          <div className="trust-note">
            <span className="trust-icon" aria-hidden="true">✦</span>
            <span>Thoughtfully made for your everyday.</span>
          </div>
        </div>

        <section className="auth-card" aria-labelledby="form-title">
          <div className="card-top">
            <div className="card-kicker">WELCOME TO NORTHSTAR</div>
            <div className="mode-switch" role="tablist" aria-label="Choose account action">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'signup'}
                className={mode === 'signup' ? 'mode-tab active' : 'mode-tab'}
                onClick={() => changeMode('signup')}
              >
                Sign up
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'login'}
                className={mode === 'login' ? 'mode-tab active' : 'mode-tab'}
                onClick={() => changeMode('login')}
              >
                Log in
              </button>
            </div>
          </div>

          <div className="form-heading">
            <h2 id="form-title">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h2>
            <p>{mode === 'signup' ? 'Your journey begins with a few simple details.' : 'Pick up right where you left off.'}</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {mode === 'signup' && (
              <div className="field-group">
                <label htmlFor="full-name">Your name</label>
                <div className="input-wrap">
                  <svg className="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 20c.4-3.6 3.2-5.5 7-5.5s6.6 1.9 7 5.5" />
                  </svg>
                  <input
                    id="full-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value)
                      setErrors((current) => ({ ...current, name: '' }))
                      setMessage('')
                    }}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                </div>
                {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
              </div>
            )}

            <div className="field-group">
              <label htmlFor="email">Email address</label>
              <div className="input-wrap">
                <svg className="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
                  <path d="m5 7 7 5.5L19 7" />
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@gmail.com"
                  value={email}
                  onChange={(event) => updateEmail(event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : mode === 'signup' ? 'email-hint' : undefined}
                />
              </div>
              {errors.email
                ? <span className="field-error" id="email-error">{errors.email}</span>
                : mode === 'signup' && <span className="field-hint" id="email-hint">Please use your @gmail.com address.</span>}
            </div>

            <div className="field-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                {mode === 'login' && <span className="secure-label"><span /> SECURE</span>}
              </div>
              <div className="input-wrap">
                <svg className="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="4.5" y="10" width="15" height="10" rx="2.5" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v2" />
                </svg>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  placeholder={mode === 'signup' ? 'Create a strong password' : 'Enter your password'}
                  value={password}
                  onChange={(event) => updatePassword(event.target.value)}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : mode === 'signup' ? 'password-rules' : undefined}
                />
                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <span className="field-error" id="password-error">{errors.password}</span>}
              {mode === 'signup' && (
                <ul className="password-rules" id="password-rules" aria-label="Password requirements">
                  {passwordRules.map((rule) => {
                    const passed = rule.test(password)
                    return (
                      <li className={passed ? 'rule passed' : 'rule'} key={rule.id}>
                        <span className="rule-check" aria-hidden="true">{passed ? '✓' : ''}</span>
                        {rule.label}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {mode === 'login' && (
              <label className="remember-option">
                <input type="checkbox" />
                <span className="custom-checkbox" aria-hidden="true" />
                <span>Keep me signed in</span>
              </label>
            )}

            {message && <div className="success-message" role="status"><span>✓</span>{message}</div>}

            <button className="submit-button" type="submit">
              <span>{mode === 'signup' ? 'Create account' : 'Log in to your account'}</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </button>
          </form>

          <div className="card-footer">
            {mode === 'signup' ? (
              <>Already have an account? <button type="button" onClick={() => changeMode('login')}>Log in</button></>
            ) : (
              <>New to Northstar? <button type="button" onClick={() => changeMode('signup')}>Create an account</button></>
            )}
          </div>
          <div className="privacy-note">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.8 13 4v3.8c0 3.1-2.1 5.3-5 6.4-2.9-1.1-5-3.3-5-6.4V4l5-2.2Z" /><path d="m5.7 7.9 1.5 1.5 3-3.2" /></svg>
            Your details stay yours. Always.
          </div>
        </section>
      </section>
      <footer className="page-footer">
        <span>© 2026 NORTHSTAR STUDIO</span>
        <span className="footer-center"><span /> MADE FOR THE WAY FORWARD</span>
        <span>TAKE IT ONE DAY AT A TIME</span>
      </footer>
    </main>
  )
}

export default App
