import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import "./Login.css";
import Swal from 'sweetalert2';
import {textAlign} from "@mui/system";

function LoginForm({ toggleReset }) {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {

    event.preventDefault();
   try {
  const response = await axios.post(
    "https://catconnect.onrender.com/login",
    values,  // Não é necessário espalhar os valores {...values}
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',  // Configuração correta do cabeçalho
      },
    }
  );

  const { data } = response;

  if (data) {
    if (values.email === '' && values.password === '') {
      toast.error("Por favor! Digite o email e a senha.");
      return;
    }

    if (values.email === '' || values.password === '') {
      const valor = values.email === '' ? 'o email' : 'a senha';
      toast.error(`Por favor! Digite ${valor}.`);
      return;
    }

    if (data.errors) {
      const { email, password } = data.errors;
      if (email) generateError(email);
      else if (password) generateError(password);
    } else {
      toast.success(`Olá, ${data.nome}! Seja bem vindo(a) de volta.`);
      navigate("/");
    }
  }
} catch (error) {
  console.error('Erro ao fazer requisição:', error);
  toast.error('Erro no servidor');
}
  };
  return (
      <div className="container">
        <div className="nomePrincipal">  Cat Connect</div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="inputContainer">
            <input
                type="email"
                name="email"
                className="largeInput"
                placeholder="Digite seu Email"
                onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                }
            />
          </div>
          <div className="inputContainer">
            <input
                type="password"
                className="largeInput"
                placeholder="Digite sua Senha"
                name="password"
                onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                }
            />
          </div>
          <button type="submit" className="smallButton">
            Entrar
          </button>
          <div style={{ textAlign: 'right', paddingTop: '10px' }}>
            <a style={{ color: 'black', fontSize: '0.8rem' }} onClick={() => navigate("/reset-password")}>
              Esqueceu sua senha? Recuperar
            </a>
          </div>

        </form>
      </div>
  );
}

export default LoginForm;
