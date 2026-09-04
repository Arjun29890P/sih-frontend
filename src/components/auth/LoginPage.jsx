import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, Shield, Heart, Leaf } from 'lucide-react';

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
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    // Simulate authentication delay
    await new Promise((r) => setTimeout(r, 1200));

    // For demo: accept any credentials
    onLogin({ email: email.trim(), role });
  };

  return (
    <div style={styles.wrapper}>
      {/* Animated Background */}
      <div style={styles.bgLayer}>
        <div style={styles.gradientOrb1} />
        <div style={styles.gradientOrb2} />
        <div style={styles.gradientOrb3} />
      </div>

      {/* Floating Decorative Elements */}
      <div style={styles.floatingLeaf1}><Leaf size={20} /></div>
      <div style={styles.floatingLeaf2}><Leaf size={16} /></div>
      <div style={styles.floatingLeaf3}><Leaf size={24} /></div>

      {/* Login Card */}
      <div style={styles.card}>
        {/* Brand Header */}
        <div style={styles.brandHeader}>
          <div style={styles.logoContainer}>
            <span style={styles.logoEmoji}>🌿</span>
          </div>
          <h1 style={styles.brandTitle}>Aeterna NER</h1>
          <p style={styles.brandSubtitle}>
            AI-Enabled Cognitive & Dementia Care Platform
          </p>
          <div style={styles.mdoTag}>
            <Shield size={12} />
            <span>Ministry of DoNER • SIH26003</span>
          </div>
        </div>

        {/* Role Selector */}
        <div style={styles.roleSelector}>
          <button
            type="button"
            style={{
              ...styles.roleBtn,
              ...(role === 'elder' ? styles.roleBtnActive : {}),
            }}
            onClick={() => setRole('elder')}
          >
            <Heart
              size={18}
              style={{
                color: role === 'elder' ? '#fff' : 'var(--ner-terracotta)',
              }}
            />
            <span>Elder</span>
          </button>
          <button
            type="button"
            style={{
              ...styles.roleBtn,
              ...(role === 'caregiver' ? styles.roleBtnActiveCaregiver : {}),
            }}
            onClick={() => setRole('caregiver')}
          >
            <Shield
              size={18}
              style={{
                color:
                  role === 'caregiver' ? '#fff' : 'var(--ner-teal)',
              }}
            />
            <span>Caregiver</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Field */}
          <div style={styles.fieldGroup}>
            <label
              htmlFor="login-email"
              style={{
                ...styles.label,
                ...(focusedField === 'email' ? styles.labelFocused : {}),
              }}
            >
              Email Address
            </label>
            <div
              style={{
                ...styles.inputWrapper,
                ...(focusedField === 'email' ? styles.inputWrapperFocused : {}),
              }}
            >
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="your@email.com"
                style={styles.input}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={styles.fieldGroup}>
            <label
              htmlFor="login-password"
              style={{
                ...styles.label,
                ...(focusedField === 'password' ? styles.labelFocused : {}),
              }}
            >
              Password
            </label>
            <div
              style={{
                ...styles.inputWrapper,
                ...(focusedField === 'password'
                  ? styles.inputWrapperFocused
                  : {}),
              }}
            >
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your password"
                style={styles.input}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff size={18} color="var(--text-muted)" />
                ) : (
                  <Eye size={18} color="var(--text-muted)" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={styles.errorBox}>
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.submitBtn,
              ...(role === 'caregiver'
                ? styles.submitBtnCaregiver
                : styles.submitBtnElder),
              ...(isLoading ? styles.submitBtnLoading : {}),
            }}
          >
            {isLoading ? (
              <div style={styles.spinner} />
            ) : (
              <>
                <LogIn size={20} />
                <span>
                  Sign In as{' '}
                  {role === 'elder' ? 'Elder' : 'Caregiver'}
                </span>
              </>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div style={styles.footerLinks}>
          <button type="button" style={styles.linkBtn}>
            Forgot Password?
          </button>
          <span style={styles.dividerDot}>•</span>
          <button type="button" style={styles.linkBtn}>
            Register Account
          </button>
        </div>

        {/* Trust Badges */}
        <div style={styles.trustBadges}>
          <span style={styles.badge}>🔒 256-bit Encrypted</span>
          <span style={styles.badge}>🏔️ Offline Capable</span>
          <span style={styles.badge}>🏥 HIPAA Compliant</span>
        </div>
      </div>

      {/* Bottom Attribution */}
      <div style={styles.bottomAttrib}>
        Developed for North Eastern Region • India 🇮🇳
      </div>

      {/* Inline Keyframe Animations */}
      <style>{`
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
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.18; }
          50% { transform: translate(15px, -20px) rotate(25deg); opacity: 0.3; }
        }
        @keyframes loginLeafDrift2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.12; }
          50% { transform: translate(-12px, 18px) rotate(-20deg); opacity: 0.25; }
        }
        @keyframes loginLeafDrift3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.15; }
          50% { transform: translate(20px, 10px) rotate(15deg); opacity: 0.28; }
        }
        @keyframes loginCardEntry {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes loginSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes loginPulseGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(26, 64, 49, 0.15); }
          50% { box-shadow: 0 0 50px rgba(26, 64, 49, 0.25); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: 'linear-gradient(145deg, #0D1F17 0%, #132E22 30%, #184E55 70%, #1A4031 100%)',
    overflow: 'hidden',
    fontFamily: "'Outfit', 'Noto Sans', system-ui, sans-serif",
    zIndex: 10000,
  },

  // Background Orbs
  bgLayer: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  gradientOrb1: {
    position: 'absolute',
    top: '10%',
    left: '15%',
    width: 350,
    height: 350,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201, 138, 44, 0.25) 0%, transparent 70%)',
    filter: 'blur(60px)',
    animation: 'loginOrbFloat1 12s ease-in-out infinite',
  },
  gradientOrb2: {
    position: 'absolute',
    bottom: '15%',
    right: '10%',
    width: 400,
    height: 400,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(35, 107, 115, 0.3) 0%, transparent 70%)',
    filter: 'blur(60px)',
    animation: 'loginOrbFloat2 15s ease-in-out infinite',
  },
  gradientOrb3: {
    position: 'absolute',
    top: '50%',
    left: '60%',
    width: 250,
    height: 250,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(42, 90, 70, 0.25) 0%, transparent 70%)',
    filter: 'blur(50px)',
    animation: 'loginOrbFloat3 10s ease-in-out infinite',
  },

  // Floating Leaves
  floatingLeaf1: {
    position: 'absolute',
    top: '20%',
    right: '22%',
    color: 'rgba(255,255,255,0.18)',
    animation: 'loginLeafDrift1 8s ease-in-out infinite',
    pointerEvents: 'none',
  },
  floatingLeaf2: {
    position: 'absolute',
    bottom: '25%',
    left: '18%',
    color: 'rgba(255,255,255,0.12)',
    animation: 'loginLeafDrift2 10s ease-in-out infinite',
    pointerEvents: 'none',
  },
  floatingLeaf3: {
    position: 'absolute',
    top: '60%',
    right: '12%',
    color: 'rgba(255,255,255,0.15)',
    animation: 'loginLeafDrift3 9s ease-in-out infinite',
    pointerEvents: 'none',
  },

  // Card
  card: {
    position: 'relative',
    width: '100%',
    maxWidth: 440,
    padding: '40px 36px 32px',
    background: 'rgba(255, 255, 255, 0.07)',
    backdropFilter: 'blur(24px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
    borderRadius: 28,
    border: '1px solid rgba(255, 255, 255, 0.12)',
    animation: 'loginCardEntry 0.6s cubic-bezier(0.22, 1, 0.36, 1), loginPulseGlow 4s ease-in-out infinite',
    margin: '0 20px',
  },

  // Brand
  brandHeader: {
    textAlign: 'center',
    marginBottom: 28,
  },
  logoContainer: {
    width: 68,
    height: 68,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(201, 138, 44, 0.3), rgba(42, 90, 70, 0.3))',
    border: '2px solid rgba(255, 255, 255, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 14px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  logoEmoji: {
    fontSize: 32,
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
  },
  brandTitle: {
    fontSize: '1.7em',
    fontWeight: 900,
    color: '#FFFFFF',
    margin: '0 0 4px',
    letterSpacing: '-0.02em',
    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
  brandSubtitle: {
    fontSize: '0.82em',
    color: 'rgba(255, 255, 255, 0.55)',
    margin: '0 0 10px',
    fontWeight: 500,
  },
  mdoTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    fontSize: '0.7em',
    color: 'rgba(255, 255, 255, 0.45)',
    background: 'rgba(255, 255, 255, 0.06)',
    padding: '4px 12px',
    borderRadius: 20,
    fontWeight: 600,
  },

  // Role Selector
  roleSelector: {
    display: 'flex',
    gap: 10,
    marginBottom: 24,
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
    padding: 5,
  },
  roleBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '12px 16px',
    borderRadius: 12,
    border: 'none',
    background: 'transparent',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.95em',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    fontFamily: 'inherit',
  },
  roleBtnActive: {
    background: 'linear-gradient(135deg, #C45532, #D4724A)',
    color: '#FFFFFF',
    boxShadow: '0 4px 16px rgba(196, 85, 50, 0.4)',
  },
  roleBtnActiveCaregiver: {
    background: 'linear-gradient(135deg, #1A4031, #236B73)',
    color: '#FFFFFF',
    boxShadow: '0 4px 16px rgba(35, 107, 115, 0.4)',
  },

  // Form
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: '0.82em',
    fontWeight: 700,
    color: 'rgba(255, 255, 255, 0.55)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    transition: 'color 0.2s ease',
  },
  labelFocused: {
    color: 'rgba(201, 138, 44, 0.9)',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 14,
    border: '1.5px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.25s ease',
    overflow: 'hidden',
  },
  inputWrapperFocused: {
    borderColor: 'rgba(201, 138, 44, 0.6)',
    boxShadow: '0 0 0 3px rgba(201, 138, 44, 0.12)',
    background: 'rgba(0, 0, 0, 0.3)',
  },
  input: {
    flex: 1,
    padding: '14px 16px',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#FFFFFF',
    fontSize: '1em',
    fontFamily: 'inherit',
    fontWeight: 500,
  },
  eyeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 14px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    height: '100%',
  },

  // Error
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 14px',
    background: 'rgba(196, 85, 50, 0.15)',
    border: '1px solid rgba(196, 85, 50, 0.3)',
    borderRadius: 12,
    color: '#F9A68C',
    fontSize: '0.88em',
    fontWeight: 600,
  },

  // Submit
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: '16px 24px',
    borderRadius: 16,
    border: 'none',
    fontSize: '1.05em',
    fontWeight: 800,
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    fontFamily: 'inherit',
    marginTop: 4,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 54,
  },
  submitBtnElder: {
    background: 'linear-gradient(135deg, #C45532, #D4724A)',
    boxShadow: '0 6px 24px rgba(196, 85, 50, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
  },
  submitBtnCaregiver: {
    background: 'linear-gradient(135deg, #1A4031, #236B73)',
    boxShadow: '0 6px 24px rgba(35, 107, 115, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
  },
  submitBtnLoading: {
    opacity: 0.8,
    pointerEvents: 'none',
  },
  spinner: {
    width: 22,
    height: 22,
    border: '3px solid rgba(255,255,255,0.25)',
    borderTopColor: '#FFFFFF',
    borderRadius: '50%',
    animation: 'loginSpin 0.7s linear infinite',
  },

  // Footer
  footerLinks: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 20,
  },
  linkBtn: {
    background: 'transparent',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.45)',
    fontSize: '0.82em',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'color 0.2s',
    padding: 0,
  },
  dividerDot: {
    color: 'rgba(255, 255, 255, 0.2)',
    fontSize: '0.8em',
  },

  // Trust Badges
  trustBadges: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    marginTop: 18,
    flexWrap: 'wrap',
  },
  badge: {
    fontSize: '0.68em',
    color: 'rgba(255, 255, 255, 0.35)',
    fontWeight: 600,
    letterSpacing: '0.02em',
  },

  // Bottom
  bottomAttrib: {
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    fontSize: '0.75em',
    color: 'rgba(255, 255, 255, 0.25)',
    fontWeight: 500,
  },
};
