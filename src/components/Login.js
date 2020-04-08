import React, { useState } from "react";
import { AUTH_TOKEN } from "../constants";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLogin, setLogin] = useState(true);
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted({ login: { token } }) {
      saveUserData(token);
    },
  });
  const [signup] = useMutation(SIGNUP_MUTATION, {
    onCompleted({ signup: { token } }) {
      saveUserData(token);
    },
  });
  console.log(formData);
  const confirm = async () => {
    if (isLogin) {
      await login({
        variables: { email: formData.email, password: formData.password },
      });
    } else {
      await signup({
        variables: { ...formData },
      });
    }
    history.push("/");
  };

  const saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  return (
    <div>
      <h4 className="mv3">{isLogin ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!isLogin && (
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <div className="pointer mr2 button" onClick={() => confirm()}>
          {isLogin ? "login" : "create account"}
        </div>
        <div className="pointer button" onClick={() => setLogin(!isLogin)}>
          {isLogin ? "need to create an account?" : "already have an account?"}
        </div>
      </div>
    </div>
  );
};

export default Login;

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
