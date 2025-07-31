import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Recycle, 
  ArrowRight, 
  Shield, 
  Globe,
  Github,
  Twitter,
  Linkedin,
  Apple,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [language, setLanguage] = useState('en');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  
  const navigate = useNavigate();

  // Generate CAPTCHA
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Check for lockout
  useEffect(() => {
    const lockoutEnd = localStorage.getItem('lockoutEnd');
    if (lockoutEnd && Date.now() < parseInt(lockoutEnd)) {
      setIsLocked(true);
      setLockoutTime(parseInt(lockoutEnd));
    }
  }, []);

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaValue(result);
  };

  const translations = {
    en: {
      welcomeBack: 'Welcome Back',
      createAccount: 'Create Account',
      signInContinue: 'Sign in to continue your eco-journey',
      startSustainable: 'Start your sustainable lifestyle today',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign In',
      createAccountBtn: 'Create Account',
      signingIn: 'Signing in...',
      creatingAccount: 'Creating account...',
      orContinueWith: 'or continue with',
      noAccount: "Don't have an account? ",
      haveAccount: "Already have an account? ",
      signUp: 'Sign up',
      signInLink: 'Sign in',
      captchaPlaceholder: 'Enter the code above',
      captchaError: 'Please enter the correct CAPTCHA code',
      accountLocked: 'Account temporarily locked due to multiple failed attempts',
      unlockIn: 'Unlock in',
      minutes: 'minutes',
      seconds: 'seconds'
    },
    es: {
      welcomeBack: 'Bienvenido de Vuelta',
      createAccount: 'Crear Cuenta',
      signInContinue: 'Inicia sesión para continuar tu viaje ecológico',
      startSustainable: 'Comienza tu estilo de vida sostenible hoy',
      fullName: 'Nombre Completo',
      emailAddress: 'Dirección de Email',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      rememberMe: 'Recordarme',
      forgotPassword: '¿Olvidaste tu contraseña?',
      signIn: 'Iniciar Sesión',
      createAccountBtn: 'Crear Cuenta',
      signingIn: 'Iniciando sesión...',
      creatingAccount: 'Creando cuenta...',
      orContinueWith: 'o continuar con',
      noAccount: '¿No tienes una cuenta? ',
      haveAccount: '¿Ya tienes una cuenta? ',
      signUp: 'Registrarse',
      signInLink: 'Iniciar sesión',
      captchaPlaceholder: 'Ingresa el código de arriba',
      captchaError: 'Por favor ingresa el código CAPTCHA correcto',
      accountLocked: 'Cuenta bloqueada temporalmente por múltiples intentos fallidos',
      unlockIn: 'Desbloquear en',
      minutes: 'minutos',
      seconds: 'segundos'
    }
  };

  const t = translations[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = language === 'en' ? 'Name is required' : 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = language === 'en' ? 'Email is required' : 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'en' ? 'Email is invalid' : 'El email es inválido';
    }

    if (!formData.password) {
      newErrors.password = language === 'en' ? 'Password is required' : 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = language === 'en' ? 'Password must be at least 8 characters' : 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = language === 'en' ? 'Password must contain uppercase, lowercase, and number' : 'La contraseña debe contener mayúscula, minúscula y número';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = language === 'en' ? 'Passwords do not match' : 'Las contraseñas no coinciden';
    }

    if (isLogin && captchaInput !== captchaValue) {
      newErrors.captcha = t.captchaError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLocked) {
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate failed login attempts
      if (isLogin && Math.random() < 0.3) { // 30% chance of failure for demo
        setLoginAttempts(prev => {
          const newAttempts = prev + 1;
          if (newAttempts >= 3) {
            const lockoutEnd = Date.now() + (5 * 60 * 1000); // 5 minutes
            localStorage.setItem('lockoutEnd', lockoutEnd.toString());
            setIsLocked(true);
            setLockoutTime(lockoutEnd);
          }
          return newAttempts;
        });
        
        setErrors({
          general: language === 'en' ? 'Invalid email or password' : 'Email o contraseña inválidos'
        });
        generateCaptcha();
        return;
      }

      // Success
      setLoginAttempts(0);
      localStorage.removeItem('lockoutEnd');
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      
      localStorage.setItem('user', JSON.stringify({
        name: formData.name || 'User',
        email: formData.email,
        language: language
      }));
      
      navigate('/profile');
    }, 1500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    generateCaptcha();
  };

  const handleSocialLogin = (provider) => {
    // Simulate social login
    console.log(`Logging in with ${provider}`);
    // In real app, this would redirect to OAuth provider
  };

  const formatTimeRemaining = () => {
    const remaining = Math.max(0, lockoutTime - Date.now());
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isLocked) {
      const timer = setInterval(() => {
        const remaining = lockoutTime - Date.now();
        if (remaining <= 0) {
          setIsLocked(false);
          setLoginAttempts(0);
          localStorage.removeItem('lockoutEnd');
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLocked, lockoutTime]);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          {/* Left Side - Branding */}
          <div className="login-branding">
            <div className="brand-content">
              <div className="language-switcher">
                <Globe size={16} />
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="language-select"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
              
              <div className="brand-logo">
                <Recycle className="brand-icon" />
                <h2>Greenify</h2>
              </div>
              <h3>Join the Green Revolution</h3>
              <p>
                Connect with a community of eco-warriors making a difference. 
                Track your impact, share DIY projects, and learn sustainable practices.
              </p>
              <div className="brand-features">
                <div className="feature">
                  <div className="feature-icon">📊</div>
                  <span>Track your recycling impact</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">🎨</div>
                  <span>Share DIY upcycling projects</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">🌍</div>
                  <span>Connect with eco-community</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">🏆</div>
                  <span>Earn sustainability badges</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="login-form-section">
            <div className="form-container">
              <div className="form-header">
                <h1>{isLogin ? t.welcomeBack : t.createAccount}</h1>
                <p>
                  {isLogin ? t.signInContinue : t.startSustainable}
                </p>
              </div>

              {isLocked && (
                <div className="lockout-message">
                  <AlertCircle size={20} />
                  <div>
                    <p>{t.accountLocked}</p>
                    <p>{t.unlockIn} {formatTimeRemaining()}</p>
                  </div>
                </div>
              )}

              {errors.general && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="login-form">
                {!isLogin && (
                  <div className="form-group">
                    <label htmlFor="name">{t.fullName}</label>
                    <div className="input-wrapper">
                      <User className="input-icon" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t.fullName}
                        className={errors.name ? 'error' : ''}
                        disabled={isLocked}
                      />
                    </div>
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="email">{t.emailAddress}</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.emailAddress}
                      className={errors.email ? 'error' : ''}
                      disabled={isLocked}
                    />
                  </div>
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="password">{t.password}</label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder={t.password}
                      className={errors.password ? 'error' : ''}
                      disabled={isLocked}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLocked}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                {!isLogin && (
                  <div className="form-group">
                    <label htmlFor="confirmPassword">{t.confirmPassword}</label>
                    <div className="input-wrapper">
                      <Lock className="input-icon" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder={t.confirmPassword}
                        className={errors.confirmPassword ? 'error' : ''}
                        disabled={isLocked}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLocked}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                  </div>
                )}

                {isLogin && (
                  <div className="captcha-section">
                    <label>Security Verification</label>
                    <div className="captcha-container">
                      <div className="captcha-display">
                        <span className="captcha-text">{captchaValue}</span>
                        <button 
                          type="button" 
                          className="refresh-captcha"
                          onClick={generateCaptcha}
                          disabled={isLocked}
                        >
                          ↻
                        </button>
                      </div>
                      <input
                        type="text"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        placeholder={t.captchaPlaceholder}
                        className={errors.captcha ? 'error' : ''}
                        disabled={isLocked}
                      />
                    </div>
                    {errors.captcha && <span className="error-text">{errors.captcha}</span>}
                  </div>
                )}

                {isLogin && (
                  <div className="form-options">
                    <label className="checkbox-wrapper">
                      <input 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={isLocked}
                      />
                      <span className="checkmark"></span>
                      {t.rememberMe}
                    </label>
                    <Link to="/forgot-password" className="forgot-link">
                      {t.forgotPassword}
                    </Link>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isLoading || isLocked}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      {isLogin ? t.signingIn : t.creatingAccount}
                    </>
                  ) : (
                    <>
                      {isLogin ? t.signIn : t.createAccountBtn}
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <div className="form-divider">
                  <span>{t.orContinueWith}</span>
                </div>

                <div className="social-buttons">
                  <button 
                    type="button" 
                    className="social-btn google"
                    onClick={() => handleSocialLogin('Google')}
                    disabled={isLocked}
                  >
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
                    Google
                  </button>
                  <button 
                    type="button" 
                    className="social-btn facebook"
                    onClick={() => handleSocialLogin('Facebook')}
                    disabled={isLocked}
                  >
                    <div className="facebook-icon">f</div>
                    Facebook
                  </button>
                  <button 
                    type="button" 
                    className="social-btn github"
                    onClick={() => handleSocialLogin('GitHub')}
                    disabled={isLocked}
                  >
                    <Github size={20} />
                    GitHub
                  </button>
                  <button 
                    type="button" 
                    className="social-btn twitter"
                    onClick={() => handleSocialLogin('Twitter')}
                    disabled={isLocked}
                  >
                    <Twitter size={20} />
                    Twitter
                  </button>
                  <button 
                    type="button" 
                    className="social-btn linkedin"
                    onClick={() => handleSocialLogin('LinkedIn')}
                    disabled={isLocked}
                  >
                    <Linkedin size={20} />
                    LinkedIn
                  </button>
                  <button 
                    type="button" 
                    className="social-btn apple"
                    onClick={() => handleSocialLogin('Apple')}
                    disabled={isLocked}
                  >
                    <Apple size={20} />
                    Apple
                  </button>
                </div>

                <div className="form-footer">
                  <p>
                    {isLogin ? t.noAccount : t.haveAccount}
                    <button 
                      type="button" 
                      className="toggle-btn"
                      onClick={toggleMode}
                      disabled={isLocked}
                    >
                      {isLogin ? t.signUp : t.signInLink}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
