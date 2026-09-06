import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, Shield, Heart, Leaf, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState('elder');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in both your email and password to continue.');
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    onLogin({ email: email.trim(), role });
  };

  return (
    <div className="login-page-wrapper">
      {/* Soft decorative background */}
      <div className="login-bg-decor">
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
        <div className="login-orb login-orb-3" />
      </div>

      {/* Floating leaves */}
      <div className="login-leaf login-leaf-1"><Leaf size={22} /></div>
      <div className="login-leaf login-leaf-2"><Leaf size={16} /></div>
      <div className="login-leaf login-leaf-3"><Leaf size={28} /></div>

      {/* Login card */}
      <div className="login-card">
        {/* Brand header */}
        <div className="login-brand">
          <div className="login-logo-badge">🌿</div>
          <h1 className="login-brand-title">Aeterna NER</h1>
          <p className="login-brand-subtitle">
            AI-Enabled Cognitive & Dementia Care Platform
          </p>
          <div className="login-mdo-tag">
            <Shield size={13} />
            <span>Ministry of DoNER • SIH26003</span>
          </div>
        </div>

        {/* Role selector */}
        <div className="login-role-selector">
          <button
            type="button"
            className={`login-role-btn ${role === 'elder' ? 'active elder' : ''}`}
            onClick={() => setRole('elder')}
          >
            <Heart size={20} />
            <span>Elder</span>
          </button>
          <button
            type="button"
            className={`login-role-btn ${role === 'caregiver' ? 'active caregiver' : ''}`}
            onClick={() => setRole('caregiver')}
          >
            <Shield size={20} />
            <span>Caregiver</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email */}
          <div className="login-field">
            <label
              htmlFor="login-email"
              className={`login-label ${focusedField === 'email' ? 'focused' : ''}`}
            >
              Email Address
            </label>
            <div className={`login-input-wrapper ${focusedField === 'email' ? 'focused' : ''}`}>
              <Mail size={20} className="login-input-icon" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="your@email.com"
                className="login-input"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-field">
            <label
              htmlFor="login-password"
              className={`login-label ${focusedField === 'password' ? 'focused' : ''}`}
            >
              Password
            </label>
            <div className={`login-input-wrapper ${focusedField === 'password' ? 'focused' : ''}`}>
              <Lock size={20} className="login-input-icon" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your password"
                className="login-input"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-eye-btn"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="login-error">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`login-submit-btn ${role} ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? (
              <div className="login-spinner" />
            ) : (
              <>
                <LogIn size={22} />
                <span>Sign In as {role === 'elder' ? 'Elder' : 'Caregiver'}</span>
                <ArrowRight size={20} style={{ marginLeft: 'auto' }} />
              </>
            )}
          </button>
        </form>

        {/* Footer links */}
        <div className="login-footer-links">
          <button type="button" className="login-link-btn">
            Forgot Password?
          </button>
          <span className="login-divider">•</span>
          <button type="button" className="login-link-btn">
            Register Account
          </button>
        </div>

        {/* Trust badges */}
        <div className="login-trust-badges">
          <span className="login-badge">🔒 256-bit Encrypted</span>
          <span className="login-badge">🏔️ Offline Capable</span>
          <span className="login-badge">🏥 HIPAA Compliant</span>
        </div>
      </div>

      {/* Bottom attribution */}
      <div className="login-bottom-attrib">
        Developed for North Eastern Region • India 🇮🇳
      </div>

      <style>{`
        .login-page-wrapper {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background: linear-gradient(160deg, #F8F6EE 0%, #EBF3EE 40%, #F7EBD2 100%);
          overflow: hidden;
          font-family: 'Outfit', 'Noto Sans Bengali', 'Noto Sans', system-ui, sans-serif;
          z-index: 10000;
          padding: 20px;
        }

        /* Decorative orbs */
        .login-bg-decor {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .login-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
        }
        .login-orb-1 {
          top: 8%;
          left: 10%;
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, rgba(26, 64, 49, 0.12) 0%, transparent 70%);
          animation: loginOrbFloat1 14s ease-in-out infinite;
        }
        .login-orb-2 {
          bottom: 10%;
          right: 8%;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(35, 107, 115, 0.12) 0%, transparent 70%);
          animation: loginOrbFloat2 17s ease-in-out infinite;
        }
        .login-orb-3 {
          top: 45%;
          left: 55%;
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(201, 138, 44, 0.1) 0%, transparent 70%);
          animation: loginOrbFloat3 11s ease-in-out infinite;
        }

        /* Floating leaves */
        .login-leaf {
          position: absolute;
          pointer-events: none;
        }
        .login-leaf-1 {
          top: 18%;
          right: 20%;
          color: rgba(26, 64, 49, 0.15);
          animation: loginLeafDrift1 9s ease-in-out infinite;
        }
        .login-leaf-2 {
          bottom: 22%;
          left: 16%;
          color: rgba(35, 107, 115, 0.12);
          animation: loginLeafDrift2 11s ease-in-out infinite;
        }
        .login-leaf-3 {
          top: 55%;
          right: 10%;
          color: rgba(201, 138, 44, 0.15);
          animation: loginLeafDrift3 10s ease-in-out infinite;
        }

        /* Card */
        .login-card {
          position: relative;
          width: 100%;
          max-width: 460px;
          padding: 40px 36px 32px;
          background: #FFFFFF;
          border-radius: 32px;
          border: 2px solid rgba(26, 64, 49, 0.1);
          box-shadow: 0 16px 40px rgba(19, 46, 34, 0.12);
          animation: loginCardEntry 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Brand */
        .login-brand {
          text-align: center;
          margin-bottom: 28px;
        }
        .login-logo-badge {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          background: linear-gradient(135deg, #1A4031, #236B73);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 34px;
          margin: 0 auto 14px;
          box-shadow: 0 8px 24px rgba(26, 64, 49, 0.25);
        }
        .login-brand-title {
          font-size: 1.75em;
          font-weight: 800;
          color: #132E22;
          margin: 0 0 4px;
          letter-spacing: -0.02em;
        }
        .login-brand-subtitle {
          font-size: 0.88em;
          color: #5E7568;
          margin: 0 0 12px;
          font-weight: 500;
        }
        .login-mdo-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72em;
          color: #236B73;
          background: #E6F3F4;
          padding: 5px 14px;
          border-radius: 9999px;
          font-weight: 700;
        }

        /* Role selector */
        .login-role-selector {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          background: #F1EFE6;
          border-radius: 20px;
          padding: 5px;
        }
        .login-role-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 16px;
          border-radius: 14px;
          border: none;
          background: transparent;
          color: #5E7568;
          font-size: 1em;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          font-family: inherit;
          min-height: 52px;
        }
        .login-role-btn.active {
          color: #FFFFFF;
          transform: translateY(-1px);
        }
        .login-role-btn.active.elder {
          background: linear-gradient(135deg, #C45532, #D4724A);
          box-shadow: 0 6px 18px rgba(196, 85, 50, 0.3);
        }
        .login-role-btn.active.caregiver {
          background: linear-gradient(135deg, #1A4031, #236B73);
          box-shadow: 0 6px 18px rgba(35, 107, 115, 0.3);
        }

        /* Form */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .login-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .login-label {
          font-size: 0.88em;
          font-weight: 700;
          color: #3D5245;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.2s ease;
        }
        .login-label.focused {
          color: #C98A2C;
        }
        .login-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: #F8F6EE;
          border-radius: 16px;
          border: 2px solid rgba(26, 64, 49, 0.12);
          transition: all 0.25s ease;
        }
        .login-input-wrapper.focused {
          border-color: #C98A2C;
          box-shadow: 0 0 0 4px rgba(201, 138, 44, 0.12);
          background: #FFFFFF;
        }
        .login-input-icon {
          color: #5E7568;
          margin-left: 16px;
          flex-shrink: 0;
        }
        .login-input-wrapper.focused .login-input-icon {
          color: #C98A2C;
        }
        .login-input {
          flex: 1;
          padding: 16px 12px 16px 12px;
          background: transparent;
          border: none;
          outline: none;
          color: #15241C;
          font-size: 1.05em;
          font-family: inherit;
          font-weight: 500;
        }
        .login-input::placeholder {
          color: #9AAEA0;
        }
        .login-eye-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          background: transparent;
          border: none;
          cursor: pointer;
          height: 100%;
          color: #5E7568;
        }
        .login-eye-btn:hover {
          color: #236B73;
        }

        /* Error */
        .login-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: #FBECE7;
          border: 2px solid rgba(196, 85, 50, 0.3);
          border-radius: 14px;
          color: #C45532;
          font-size: 0.92em;
          font-weight: 600;
        }

        /* Submit */
        .login-submit-btn {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
          padding: 16px 24px;
          border-radius: 20px;
          border: none;
          font-size: 1.1em;
          font-weight: 800;
          color: #FFFFFF;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          font-family: inherit;
          margin-top: 4px;
          min-height: 60px;
          box-shadow: 0 8px 24px rgba(26, 64, 49, 0.2);
        }
        .login-submit-btn.elder {
          background: linear-gradient(135deg, #C45532, #D4724A);
          box-shadow: 0 8px 24px rgba(196, 85, 50, 0.3);
        }
        .login-submit-btn.caregiver {
          background: linear-gradient(135deg, #1A4031, #236B73);
          box-shadow: 0 8px 24px rgba(35, 107, 115, 0.3);
        }
        .login-submit-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
        }
        .login-submit-btn:active {
          transform: translateY(2px);
        }
        .login-submit-btn.loading {
          opacity: 0.8;
          pointer-events: none;
          justify-content: center;
        }
        .login-spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: loginSpin 0.7s linear infinite;
        }

        /* Footer links */
        .login-footer-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 22px;
        }
        .login-link-btn {
          background: transparent;
          border: none;
          color: #236B73;
          font-size: 0.88em;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: color 0.2s;
          padding: 0;
        }
        .login-link-btn:hover {
          color: #C98A2C;
        }
        .login-divider {
          color: rgba(26, 64, 49, 0.2);
          font-size: 0.85em;
        }

        /* Trust badges */
        .login-trust-badges {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        .login-badge {
          font-size: 0.72em;
          color: #5E7568;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        /* Bottom attribution */
        .login-bottom-attrib {
          position: absolute;
          bottom: 20px;
          text-align: center;
          font-size: 0.8em;
          color: #5E7568;
          font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .login-card {
            padding: 32px 24px 24px;
            border-radius: 24px;
          }
          .login-brand-title {
            font-size: 1.5em;
          }
        }

        /* Animations */
        @keyframes loginOrbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
        }
        @keyframes loginOrbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 50px) scale(1.05); }
          66% { transform: translate(40px, -20px) scale(0.9); }
        }
        @keyframes loginOrbFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 40px) scale(1.08); }
        }
        @keyframes loginLeafDrift1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.15; }
          50% { transform: translate(15px, -20px) rotate(25deg); opacity: 0.25; }
        }
        @keyframes loginLeafDrift2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.12; }
          50% { transform: translate(-12px, 18px) rotate(-20deg); opacity: 0.22; }
        }
        @keyframes loginLeafDrift3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.15; }
          50% { transform: translate(20px, 10px) rotate(15deg); opacity: 0.25; }
        }
        @keyframes loginCardEntry {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes loginSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
