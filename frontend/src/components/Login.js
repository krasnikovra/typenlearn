import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './app.module.css'
import ButtonLink from './ButtonLink';

import postLoginRequest from './api/postLogin'

export default function Login(props) {
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    usernameErrors: null,
    passwordErrors: null,
    errors: null,
  });

  const [loading, setLoading] = React.useState(false)

  const navigate = useNavigate()

  const [searchParams,] = useSearchParams();
  const next = searchParams.get('next');

  const handleValueChange = (value) => (e) =>
    setValues({ ...values, [value]: e.target.value });

  const handleButtonClick = async (e) => {
    e.preventDefault()

    // Sending a log in request
    const { url, opt } = postLoginRequest(values.username, values.password)

    try {
      setLoading(true)
      const response = await fetch(url, opt);
      const response_json = await response.json();

      if (response.status === 400) {
        const errors = response_json.errors;
        setValues({
          ...values,
          usernameErrors: errors.username || null,
          passwordErrors: errors.password || null,
          errors: errors.error || null,
        })
      }
      else if (response.status > 400) {
        throw new Error(response.statusText);
      }
      else {
        // saving JWT token in local storage
        localStorage.setItem('jwt_token', response_json.user.token);
        setValues({
          ...values,
          usernameErrors: null,
          passwordErrors: null,
          errors: null,
        })
        // and redirecting to the page needed authorization
        navigate(next || props.defaultNext);
      }
    }
    catch (error) {
      console.log(error)
      setValues({
        ...values,
        errors: ['Something went wrong, please try again later.'],
      })
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <form>
      <ButtonLink to='/' text="Type'n'learn" />

      <div className={`${styles.center} ${styles.column}`} style={{
        height: "65vh",
      }}>
        <label className={`${styles.mainText}`} htmlFor="username"><b>Username</b></label>
        <input className={`${styles.input}`} type="text" name="username" placeholder="Username" onChange={handleValueChange("username")} />
        {values.usernameErrors !== null && values.usernameErrors.map((err, idx) => <span className={`${styles.errText}`} key={idx}>{err}</span>)}

        <label className={`${styles.mainText}`} htmlFor="password"><b>Password</b></label>
        <input className={`${styles.input}`} type="password" name="password" placeholder="Password" onChange={handleValueChange("password")} />
        {values.passwordErrors !== null &&
          values.passwordErrors.map((err, idx) => <span className={`${styles.errText}`} key={idx}> {err} </span>)}

        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
          <ButtonLink to={`/register/?next=${next}`} text="Registration" />
          <button className={`${styles.btn}`} onClick={handleButtonClick} disabled={loading}>Login</button>
        </div>

        {values.errors !== null && values.errors.map((err, idx) => <span className={`${styles.errText}`} key={idx}>{err}</span>)}

        <p>
          <img className={`${styles.imgLogin}`} src="https://i.pinimg.com/564x/27/7a/fc/277afc2e1fb0a00d579186e3082464a5.jpg" alt="oops"></img>
        </p>

      </div>
    </form>
  )
}
