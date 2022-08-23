import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (!email || !password) {
      return;
    }
    onLogin({ email, password });
  };
  return (
    <div className="register">
      <p className="register__welcome">Вход</p>
      <form onSubmit={handleSubmit} className="form form__register">
        <input
          className="form__input form__input_sign"
          placeholder="Email"
          id="useremailname"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />

        <input
          className="form__input form__input_sign"
          placeholder="Пароль"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          onSubmit={handleSubmit}
          className="register__link"
        >
          Войти
        </button>
      </form>
    </div>
  );
};
export default Login;
