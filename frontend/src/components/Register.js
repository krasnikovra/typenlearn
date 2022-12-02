import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import postRegisterRequest from './api/postRegisterRequest';

import styles from "./app.module.css";
import ButtonLink from './ButtonLink';

export default function Register(props) {
  const isFirstRenderOf = React.useRef({
    username: true,
    email: true,
    password: true,
    passwordRepeat: true,
  })

  const [values, setValues] = React.useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const [errors, setErrors] = React.useState({
    usernameErrors: [],
    emailErrors: [],
    passwordErrors: [],
    passwordRepeatErrors: [],
  })

  const [networkErrors, setNetworkErrors] = React.useState({
    usernameErrors: [],
    emailErrors: [],
    passwordErrors: [],
    errors: [],
  })

  const [loading, setLoading] = React.useState(false)
  const [validated, setValidated] = React.useState(false)

  const navigate = useNavigate()

  const [searchParams,] = useSearchParams();
  const next = searchParams.get('next');

  const handleValueChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  }

  const handleButtonClick = async (e) => {
    if (validated) {
      // Sending a register request
      const { url, opt } = postRegisterRequest(values.username, values.email, values.password)

      try {
        setLoading(true)
        const response = await fetch(url, opt);
        const response_json = await response.json();

        if (response.status === 400) {
          const response_errors = response_json.errors;
          setNetworkErrors({
            usernameErrors: response_errors.username || [],
            passwordErrors: response_errors.password || [],
            emailErrors: response_errors.email || [],
            errors: response_errors.error || [],
          })
        }
        else if (response.status > 400) {
          throw new Error(response.statusText);
        }
        else {
          // saving JWT token in local storage
          localStorage.setItem('jwt_token', response_json.user.token);
          setNetworkErrors({
            usernameErrors: [],
            emailErrors: [],
            passwordErrors: [],
            errors: [],
          })
          // and redirecting to the page needed authorization
          navigate(next || props.defaultNext);
        }
      }
      catch (error) {
        console.log(error)
        setErrors({
          ...errors,
          errors: ['Something went wrong, please try again later.'],
        })
      }
      finally {
        setLoading(false)
      }
    }
  }

  // Warning: kind of complicated code further.
  // validate is a function of validator --
  // -- object contains an error string and 
  // regex to test and/or a callback to test
  // if all provided checks (test and callback)
  // return true we do nothing, otherwise pushing
  // back a corresponding error to the <value>Errors

  const validate = (validator) => {
    if (isFirstRenderOf.current[validator.value]) {
      isFirstRenderOf.current[validator.value] = false
    }
    else {
      let errorsContainer = []

      if (values[validator.value] === "") {
        errorsContainer = [...errorsContainer, "This field should not be empty"]
      }

      for (const rule of validator.rules) {
        if (rule.regExp?.test(values[validator.value]) === false ||
          rule.callback?.test(values[validator.value]) === false) {
          errorsContainer = [...errorsContainer, rule.error]
        }
      }

      setErrors((errors) => {
        return {
          ...errors,
          [`${validator.value}Errors`]: errorsContainer,
        }
      })
    }
  }

  const validators = {
    username: {
      value: 'username',
      rules: []
    },
    email: {
      value: 'email',
      rules: [
        {
          // magic (:
          regExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          error: "Current email is not the valid email",
        },
      ],
    },
    password: {
      value: 'password',
      rules: [
        {
          regExp: /^(?=.*[0-9])/,
          error: "A password should contain at least one number of 0-9",
        },
        {
          regExp: /^(?=.*[a-z])/,
          error: "A password should contain at least one small letter of a-z",
        },
        {
          regExp: /^(?=.*[A-Z])/,
          error: "A password should contain at least one capital letter of A-Z",
        },
        {
          regExp: /^(?=.*[@#$%^&+=])/,
          error: "A password should contain at least one special character of @#$%^&+=",
        },
        {
          regExp: /^.{8,}$/,
          error: "A password should consist of at least 8 characters",
        },
        {
          regExp: /^(?!.*[^a-zA-Z0-9@#$%^&+=]+)/,
          error: "A password should consist of 0-9, a-z, A-Z, @#$%^&+= and no other characters",
        },
      ],
    },
    passwordRepeat: {
      value: 'passwordRepeat',
      rules: [
        {
          callback: {
            test: (passwordRepeat) => passwordRepeat === values.password,
          },
          error: "Passwords are not the same",
        },
      ],
    },
  }

  // The next code is kinda messy because React doesn't
  // allow us to use React.useEffect in a callback param
  // for validators.forEach

  React.useEffect(() => {
    validate(validators.username)
    // validators and validate are constants so this should be fine
    // eslint-disable-next-line
  }, [values.username])

  React.useEffect(() => {
    validate(validators.email)
    // validators and validate are constants so this should be fine
    // eslint-disable-next-line
  }, [values.email])

  React.useEffect(() => {
    validate(validators.password)
    validate(validators.passwordRepeat)
    // validators and validate are constants so this should be fine
    // eslint-disable-next-line
  }, [values.password, values.passwordRepeat])

  // validation on every value change
  React.useEffect(() => {
    const noErrors = Object.values(errors).every(list => list.length === 0)
    const noEmptyValues = Object.values(values).every(value => value !== "")
    setValidated(noErrors && noEmptyValues)
  }, [errors, values])

  return (
    <form>
    <ButtonLink to='/' text="Type'n'learn" />

      <div className={`${styles.center} ${styles.column}`}>
        <label htmlFor="username" className={`${styles.mainText}`}><b>Username</b></label>
        <input className={`${styles.input}`} type="text" name="username" placeholder="Username" onChange={handleValueChange("username")} />
        {errors.usernameErrors.map((err, idx) => <span key={idx}>{err}</span>)}
        {networkErrors.usernameErrors.map((err, idx) => <span key={idx}>{err}</span>)}

        <label htmlFor="email" className={`${styles.mainText}`}><b>Email</b></label>
        <input className={`${styles.input}`} type="text" name="email" placeholder="example@gmail.com" onChange={handleValueChange("email")} />
        {errors.emailErrors.map((err, idx) => <span key={idx}>{err}</span>)}
        {networkErrors.emailErrors.map((err, idx) => <span key={idx}>{err}</span>)}

        <label htmlFor="password" className={`${styles.mainText}`}><b>Password</b></label>
        <input className={`${styles.input}`} type="password" name="password" placeholder="&ExaMplE123+" onChange={handleValueChange("password")} />
        {errors.passwordErrors.map((err, idx) => <span key={idx}> {err} </span>)}
        {networkErrors.passwordErrors.map((err, idx) => <span key={idx}> {err} </span>)}

        <label htmlFor="password-repeat" className={`${styles.mainText}`}><b>Repeat Password</b></label>
        <input className={`${styles.input}`} type="password" name="password-repeat" placeholder="&ExaMplE123+" onChange={handleValueChange("passwordRepeat")} />
        {errors.passwordRepeatErrors.map((err, idx) => <span key={idx}> {err} </span>)}

        <button className={`${styles.btn}`} onClick={handleButtonClick} disabled={!validated || loading}>Register</button>

        {networkErrors.errors.map((err, idx) => <span key={idx}>{err}</span>)}
      </div>

      <p>
      <img className={`${styles.imgReg}`} src="https://i.pinimg.com/564x/fe/57/b1/fe57b17b6756d60f5526bd7b8b699817.jpg" alt="oops"></img>
      </p>
    </form>
  )
}
