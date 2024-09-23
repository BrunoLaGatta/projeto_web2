import React, { useState, useCallback, useContext, useEffect } from "react";
import "./Usuario.css";
import { styled, alpha } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import debounce from "lodash/debounce";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import DescriptionIcon from "@mui/icons-material/Description";
import { AuthContext } from "../context/AuthContext";

const StyledButton = styled(Button)`
  color: #ff8e00;
  background-color: white;
  border-color: #ff8e00;
  border: 1px solid;
  border-radius: 1rem;
  margin: 7px 0;
  &:hover {
    color: white;
    background-color: #ff8e00;
    border-radius: 1rem;
  }
`;

const Usuario = () => {
  const [dadosUsuario, setDadosUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [dadosEndereco, setDadosEndereco] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    complemento: "",
    uf: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useContext(AuthContext);
  let url = "http://localhost:3000/";
  // const [dadosUsuario, setDadosUsuario] = useState({
  //   nome: "",
  //   email: "",
  //   senha: "",
  //   confirmarSenha: "",
  //   cep: "",
  //   complmento: "",
  //   numero: "",
  // });

  const fetchUsuario = async () => {
    await fetch(url + "dadosUsuario/" + user.usu_id, {
      method: "GET",
      headers: {
        "Content-type": "aplication/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const { cep, complemento, email, nome, numero } = data[0];
        setDadosUsuario({ nome, email });
        if (cep) {
          fetchAddress(cep, numero, complemento);
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(
    () => {
      fetchUsuario();
    },
    [],
    dadosEndereco
  );
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setDadosUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setDadosEndereco((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "cep") {
      fetchAddress(value);
    }
  };

  const fetchEditUsuario = () => {
    var userObj = {
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
      senha: dadosUsuario.senha,
      cep: dadosEndereco.cep,
      numero: dadosEndereco.numero,
      complemento: dadosEndereco.complemento,
      logradouro: dadosEndereco.logradouro,
      bairro: dadosEndereco.bairro,
      cidade: dadosEndereco.cidade,
      uf: dadosEndereco.uf,
    };
    var jsonBody = JSON.stringify(userObj);

    console.log(jsonBody);
    fetch(url + "editarUsuarioProprio/" + user.usu_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: jsonBody,
    })
      .then((resp) => resp.json())
      .then((data) => {
        alert("Usuario Editado");
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchEditUsuario();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleInputChange = (event) => {
    setCep(event.target.value);
  };

  const fetchAddress = useCallback(
    debounce(async (cepR, numero, complemento) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cepR}/json/`
        );
        const { cep, bairro, localidade, logradouro, uf } = response.data;
        setDadosEndereco({
          cep,
          bairro,
          numero: numero,
          complemento: complemento,
          cidade: localidade,
          logradouro,
          uf,
        });
        // console.log(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  console.log(dadosEndereco);
  return (
    <>
      <div class="meus-dados title">
        <PersonIcon color="warning"></PersonIcon>
        <h2>MEUS DADOS</h2>
      </div>
      <div class="grid-container">
        <div class="container-dados usuario">
          <div class="meus-dados">
            <DescriptionIcon color="warning"></DescriptionIcon>
            <h4 class="texto-dados">DADOS BÁSICOS</h4>
          </div>
          <form class="form-dados" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              sx={{ m: 1 }}
              name="nome"
              label="Nome completo"
              variant="outlined"
              margin="dense"
              onChange={handleUserChange}
              color="warning"
              value={dadosUsuario ? dadosUsuario.nome : ""}
            />
            <TextField
              fullWidth
              sx={{ m: 1 }}
              name="email"
              label="Email"
              variant="outlined"
              margin="dense"
              onChange={handleUserChange}
              value={dadosUsuario ? dadosUsuario.email : ""}
            />
            <FormControl
              fullWidth
              sx={{ m: 1 }}
              variant="outlined"
              onChange={handleUserChange}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="senha"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl
              fullWidth
              sx={{ m: 1 }}
              variant="outlined"
              onChange={handleUserChange}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="confirmarSenha"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm-password"
              />
            </FormControl>
            <StyledButton variant="contained" type="submit">
              SALVAR TODAS AS INFORMAÇÕES
            </StyledButton>
          </form>
        </div>

        <div class="container-dados endereco-form">
          <div class="meus-dados">
            <FmdGoodIcon color="warning"></FmdGoodIcon>
            <h4 class="texto-dados">ENDEREÇO</h4>
          </div>
          <form class="form-dados">
            <TextField
              fullWidth
              sx={{ m: 1 }}
              label="CEP"
              name="cep"
              variant="outlined"
              value={dadosEndereco ? dadosEndereco.cep : ""}
              onChange={handleAddressChange}
              margin="dense"
            />
            <TextField
              fullWidth
              sx={{ m: 1 }}
              name="logradouro"
              label="Logradouro"
              variant="outlined"
              value={dadosEndereco.logradouro}
              margin="dense"
              onChange={handleAddressChange}
            />
            <TextField
              fullWidth
              sx={{ m: 1 }}
              name="numero"
              label="Numero"
              variant="outlined"
              value={dadosEndereco.numero ? dadosEndereco.numero : ""}
              margin="dense"
              onChange={handleAddressChange}
            />
            <TextField
              fullWidth
              sx={{ m: 1 }}
              name="bairro"
              label="Bairro"
              variant="outlined"
              value={dadosEndereco.bairro}
              margin="dense"
              onChange={handleAddressChange}
            />
            <TextField
              fullWidth
              sx={{ m: 1 }}
              name="cidade"
              label="Cidade"
              variant="outlined"
              value={dadosEndereco.cidade}
              margin="dense"
              onChange={handleAddressChange}
            />
            <TextField
              fullWidth
              sx={{ m: 1 }}
              name="complemento"
              label="Complemento"
              variant="outlined"
              value={dadosEndereco.complemento ? dadosEndereco.complemento : ""}
              margin="dense"
              onChange={handleAddressChange}
            />
            <TextField
              fullWidth
              sx={{ m: 1 }}
              name="uf"
              label="UF"
              variant="outlined"
              value={dadosEndereco.uf}
              margin="dense"
              onChange={handleAddressChange}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Usuario;
