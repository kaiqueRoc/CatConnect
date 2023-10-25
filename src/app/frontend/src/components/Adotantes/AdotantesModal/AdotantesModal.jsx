import React, { useState, memo } from "react";
import "./AdotantesModal.css";
import TextField from "@mui/material/TextField";
import InputMask from "react-input-mask";
import TextMask from "react-text-mask";

function AdotantesModal({ handleSubmitFunction, adotante, edit }) {
  const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
  const cpfMask = [
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ];
  const phoneMask = [
    "(",
    /\d/,
    /\d/,
    ")",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  const rgMask = [
    /[A-Za-z]/,
    /[A-Za-z]/,
    "-",
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
  ];

  const [adotanteEdition, setAdotanteEdition] = useState({
    _id: adotante ? adotante._id : "",
    bairro: adotante ? adotante.bairro : "",
    cep: adotante ? adotante.cep : "",
    cidade: adotante ? adotante.cidade : "",
    cpf: adotante ? adotante.cpf : "",
    instagram: adotante ? adotante.instagram : "",
    nome: adotante ? adotante.nome : "",
    rg: adotante ? adotante.rg : "",
    rua: adotante ? adotante.rua : "",
    telefone: adotante ? adotante.telefone : "",
    email: adotante ? adotante.email : "",
  });

  const [error, setError] = useState(false);

  const cpfError = adotanteEdition.cpf?.length !== cpfMask.length;
  const phoneError = adotanteEdition.telefone?.length !== phoneMask.length;
  const rgError = adotanteEdition.rg?.length !== rgMask.length;
  const cepError = adotanteEdition.cep?.length !== cepMask.length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdotanteEdition((prevAdotante) => ({
      ...prevAdotante,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("Logica", cpfError || rgError || cepError || phoneError)

    if(cpfError || rgError || cepError || phoneError) {
      setError(true);
    } else {
      setError(false)
      handleSubmitFunction(adotanteEdition);
    }
  };

  return (
    <div className="adotante-container">
      <form onSubmit={(e) => handleSubmit(e)} className="adotante-dados">
        <div className="adotante-linha">
          <div className="adotante-coluna">
            <label>Nome da pessoa</label>
            <TextField
              type="nome"
              name="nome"
              placeholder="Digite o nome da pessoa"
              value={adotanteEdition?.nome}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
            />
          </div>
          <div className="adotante-coluna">
            <label>Email</label>
            <TextField
              type="email"
              name="email"
              placeholder="Digite o email da pessoa"
              value={adotanteEdition?.email}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
            />
          </div>
        </div>
        <div className="adotante-linha">
          <div className="adotante-coluna">
            <label>RG</label>
            <TextField
              type="rg"
              placeholder="Ex: MG12123123"
              name="rg"
              value={adotanteEdition?.rg}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
                inputComponent: TextMask,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ mask: rgMask, guide: false }}
              helperText={error && rgError ? "RG inválido" : ""}
              error={error && rgError}
            />
          </div>
          <div className="adotante-coluna">
            <label>CPF</label>
            <TextField
              type="cpf"
              placeholder="Ex: 1212312312"
              name="cpf"
              value={adotanteEdition?.cpf}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
                inputComponent: TextMask,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ mask: cpfMask, guide: false }}
              helperText={error && cpfError ? "CPF inválido" : ""}
              error={error && cpfError}
            />
          </div>
        </div>
        <div className="adotante-linha">
          <div className="adotante-coluna">
            <label>Telefone</label>
            <TextField
              type="telefone"
              placeholder="Ex: (31)91234-5678"
              name="telefone"
              value={adotanteEdition?.telefone}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
                inputComponent: TextMask,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ mask: phoneMask, guide: false }}
              helperText={error && phoneError ? "Telefone inválido" : ""}
              error={error && phoneError}
            />
          </div>
          <div className="adotante-coluna">
            <label>Instagram</label>
            <TextField
              type="instagram"
              placeholder="Ex: @sosgatinhosdoparque"
              name="instagram"
              value={adotanteEdition?.instagram}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
            />
          </div>
        </div>
        <div className="adotante-linha">
          <div className="adotante-coluna">
            <label>Endereço</label>
          </div>
        </div>
        <div className="adotante-linha">
          <div className="adotante-coluna">
            <label>Rua</label>
            <TextField
              type="rua"
              placeholder="Ex: Av. Afonso Pena, 1377"
              name="rua"
              value={adotanteEdition?.rua}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
            />
          </div>
        </div>
        <div className="adotante-linha">
          <div className="adotante-coluna">
            <label>Bairro</label>
            <TextField
              type="bairro"
              placeholder="Ex: Centro"
              name="bairro"
              value={adotanteEdition?.bairro}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
            />
          </div>
          <div className="adotante-coluna">
            <label>Cidade</label>
            <TextField
              type="cidade"
              placeholder="Ex: Belo Horizonte"
              name="cidade"
              value={adotanteEdition?.cidade}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
              }}
            />
          </div>
          <div className="adotante-coluna">
            <label>CEP</label>
            <TextField
              type="cep"
              mask="99999-999"
              placeholder="Ex: 30130-000"
              name="cep"
              value={adotanteEdition?.cep}
              onChange={handleInputChange}
              variant="standard"
              InputProps={{
                readOnly: !edit,
                inputComponent: TextMask,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ mask: cepMask, guide: false }}
              helperText={error && cepError ? "CEP inválido" : ""}
              error={error && cepError}
            />
          </div>
        </div>
        <button type="submit">
          {!adotante ? "Adicionar" : edit ? "Salvar" : "Fechar"}
        </button>
      </form>
    </div>
  );
}

export default memo(AdotantesModal);
