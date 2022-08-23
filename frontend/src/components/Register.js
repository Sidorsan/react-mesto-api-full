import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      const { password, email } = data;
      onRegister({ password, email });
    }
  };
  return (
    <div className="register">
      <p className="register__welcome">Регистрация</p>
      <form onSubmit={handleSubmit} className="form form__register">
        <input
          className="form__input form__input_sign"
          placeholder="Email"
          id="email"
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
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p>
          Уже зарегистрированы?{" "}
          <span>
            {" "}
            {/* <Link to="sign-in" className="register__login-link"> */}
            <Link to="signin" className="register__login-link">
              Войти
            </Link>
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
