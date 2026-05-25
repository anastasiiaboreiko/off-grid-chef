import { useContext, useState } from "react"
import { AuthContext } from "../../shared/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../shared/ui/logo/Logo";
import styles from './AuthPage.module.scss';
import eyeOffIcon from "../../img/icons/eye-off-light.svg";
import eyeIcon from "../../img/icons/eye-light.svg";

type Errors = {
  email?: string;
  password?: string;
  full_name?: string;
  detail?: string;
}

export const AuthPage = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [full_name, setFull_Name] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const {login, signup} = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoginValid = email.trim() !== '' && password.trim() !== '';

  const isRegistrationValid = 
    full_name.trim() !== '' && 
    email.trim() !== '' && 
    password.trim() !== '' && 
    isChecked;

  const isSubmitDisabled = 
  mode === 'login' 
    ? !isLoginValid 
    : !isRegistrationValid;

  const getFieldErrors = (error: unknown) => {
    if (typeof error !== 'object' || error === null ) {
      return { detail: 'Something went wrong' };
    }

    const errors: Errors = {};

    if (
      typeof error === 'object' && 
      error !== null &&
      'detail' in error) {
        errors.detail = 'Invalid email or password';
    }

    if (
      typeof error === 'object' && 
      error !== null &&
      'email' in error) {
        errors.email = 'This email is already registered.';
    }

    if (
      typeof error === 'object' && 
      error !== null &&
      'password' in error) {
        errors.password = 'Ensure this field has at least 6 characters.';
    }

    if (
      typeof error === 'object' && 
      error !== null &&
      'full_name' in error) {
        errors.full_name = 'This field is required.';
    }
    return errors;
  }

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});

    try {
      if (mode === 'login') {
        await login({
          email, 
          password
        });
      } 
      if (mode === 'signup') {
        await signup({
          email,
          password, 
          full_name,
        })
      }
      navigate('/');
    } catch (error) {
      setFieldErrors(getFieldErrors(error));
    }
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authPage__backgroundImage} />
      <div className={styles.authPage__container}>
        <Logo option="default" />
        <h1 className={styles.title}>Welcome to Web App</h1>
        {mode === 'login' 
          ? <h2 className={styles.subTitle}>Log in to your account</h2>
          : <h2 className={styles.subTitle}>Create an account</h2>
        }

        {fieldErrors.detail && (
          <p className={`small-text ${styles.error}`}>{fieldErrors.detail}</p>
        )}

        <form 
          onSubmit={handleSubmit}
          className={styles.form}
        >
        {mode === 'signup' && (
            <label className={`main-text ${styles.form__label}`}>
              Full name
              <input 
                className={styles.form__input}
                name="full_name" 
                type="text" 
                value={full_name}
                onChange={(event) => setFull_Name(event.target.value)}
                required
                placeholder="Albert Flores"
              />
               {fieldErrors.full_name && (
                 <p className={`small-text ${styles.error}`}>{fieldErrors.full_name}</p>
               )}
            </label>
          )}
      

          <label className={`main-text ${styles.form__label}`}>
            Email
            <input 
              className={styles.form__input}
              id="email"
              name="email" 
              type="email" 
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="Enter your email"
            />
            {fieldErrors.email && (
              <p className={`small-text ${styles.error}`}>{fieldErrors.email}</p>
            )}
          </label>
          <label className={`main-text ${styles.form__label}`}>
            Password
            <div className={styles.form__passwordWrapper}>
              <input
                className={styles.form__input}
                name="password" 
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder="Enter your password"
              />
              <button 
                type="button"
                className={styles.form__eyeButton}
                onClick={() => setIsPasswordVisible(prev => ! prev)}
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              >
                <img  
                  className={styles.form__eyeImage}
                  src={isPasswordVisible ? eyeIcon : eyeOffIcon} 
                  alt="password button"
                />
              </button>
            </div>
            {fieldErrors.password && (
              <p className={`small-text ${styles.error}`}>{fieldErrors.password}</p>
            )}
          </label>

          {mode === 'signup' 
            && (
              <label className={styles.form__checkbox}>
                <input 
                  type="checkbox"
                  checked={isChecked}
                  className={styles.form__checkbox_input}
                  onChange={() => setIsChecked(prev => !prev)}
                />
                <span className={`small-text ${styles.form__checkbox_text}`}>I accept the Terms of Use and Privacy Policy.</span>
              </label>
            ) 
            
              // <p className={`body-text ${styles.form__question}`}>Forgot Password?</p>
        
          }

          <button 
            type="submit" 
            className={`button-text ${styles.form__submitButton}`}
            disabled={isSubmitDisabled}
          >
            {mode === 'login' ? 'Login' : 'Sign up'}
          </button>
        
        </form>

        {mode === 'login' 
          ? (
            <div className={styles.modeChoosing}>
              <p className={`small-text ${styles.modeChoosing__text}`}>
                Don't have an account?
              </p>
              <button 
                type="button" 
                onClick={() => {
                  setMode('signup'); 
                  setFieldErrors({});
                }}
                className={`body-text ${styles.modeChoosing__button}`}
              >
                Sign up
              </button>
            </div>
          )
          : ( 
            <div className={styles.modeChoosing}> 
              <p className={`small-text ${styles.modeChoosing__text}`}>
                Already have an account?
              </p>
              <button 
                type="button" 
                onClick={() => {
                  setMode('login');
                  setFieldErrors({});
                }}
                className={`body-text ${styles.modeChoosing__button}`}
              >
                Login
              </button>
            </div> 
          )
        }
      </div>
    </div>
    
  )
}