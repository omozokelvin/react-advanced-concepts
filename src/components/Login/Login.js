import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import AuthContext from 'store/auth-context';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import classes from './Login.module.css';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.includes('@') };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }

  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: '', isValid: false };
};

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);

  const authCtx = useContext(AuthContext);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  useEffect(() => {
    console.log('EFFECT RUNNING');
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking form validity');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT',
      value: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'USER_INPUT',
      value: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: 'INPUT_BLUR',
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: 'INPUT_BLUR',
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!emailIsValid) {
      emailInputRef.current.focus();
      return;
    }

    if (!passwordIsValid) {
      passwordInputRef.current.focus();
      return;
    }

    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
