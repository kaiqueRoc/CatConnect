import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./User.css";
import { DataGrid, GridToolbar, ptBR } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import { useModal } from "../../contexts/ModalContext";
import UsuariosModal from "./UsuariosModal/UsuariosModal";
import { TiGroupOutline } from "react-icons/ti";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import EditarUsuariosModal from "./UsuariosModal/EditarUsuariosModal";

const Usuarios = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterText, setFilterText] = useState("");
  const [users, setUsuarios] = useState([]);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    getUsuarios();
  }, []);

  const getUsuarios = async () => {
    try {
      const { data } = await axios.get(
        "https://catconnect.onrender.com/users",
        {
          withCredentials: true,
        }
      );
      if (!data) {
        toast.error(
          data.error ? data.error : "Houve um erro ao coletar os usuários",
          {
            theme: "dark",
          }
        );
      } else {
        setUsuarios(data);
      }
    } catch {
      toast.error("Houve um erro ao carregar os usuários", {
        theme: "dark",
      });
    }
  };

  const handleAddUsuario = async (newUsuario) => {
    delete newUsuario["_id"];
    try {
      const { data } = await axios.post(
        "https://catconnect.onrender.com/users",
        newUsuario,
        {
          withCredentials: true,
        }
      );
      if (!data.created) {
        toast.error(
          data.error
            ? data.error
            : "Houve um erro ao adicionar um novo usuário",
          {
            theme: "dark",
          }
        );
        closeModal();
      } else {
        toast(`Usuário adicionado com sucesso!`, {
          theme: "dark",
        });
        getUsuarios();
        closeModal();
      }
    } catch (e ){
      toast.error("Houve um erro ao adicionar um novo usuário", {
        theme: "dark",
      });
    }
  };

  const handleEditUsuario = async (editedUsuario) => {
    try {
      const { data } = await axios.put(
        `https://catconnect.onrender.com/users/${editedUsuario._id}`,
        editedUsuario,
        {
          withCredentials: true,
        }
      );
      if (!data.updated) {
        toast.error(
          data.error ? data.error : "Houve um erro ao editar um usuário",
          {
            theme: "dark",
          }
        );
        closeModal();
      } else {
        toast(`Usuário editado com sucesso!`, {
          theme: "dark",
        });
        getUsuarios();
        closeModal();
      }
    } catch {
      toast.error("Houve um erro ao editar um usuário", {
        theme: "dark",
      });
      closeModal();
    }
  };

  const handleDeleteUsuario = async (deleteUsuario) => {
    try {
      const { data } = await axios.delete(`https://catconnect.onrender.com/users/${deleteUsuario}`, {
        withCredentials: true,
      });
      if (!data.deleted) {
        toast.error(
          data.error ? data.error : "Houve um erro ao excluir o usuário",
          {
            theme: "dark",
          }
        );
      } else {
        toast(`Usuário excluído com sucesso!`, {
          theme: "dark",
        });
        getUsuarios();
        closeModal();
      }
    } catch {
      toast.error("Houve um erro ao excluir o usuário", {
        theme: "dark",
      });
      closeModal();
    }
  };

  const handleViewUsuario = () => {
    closeModal();
  };

  const abrirAddUsuario = () => {
    openModal(
      "Adicionar usuário",
      <UsuariosModal handleSubmitFunction={handleAddUsuario} edit={true} />
    );
  };

  const openEditModal = (rowId, e) => {
    e.stopPropagation();
    let editedRow = users.find((row) => row._id === rowId);
    openModal(
      "Editar usuário",
      <EditarUsuariosModal
        handleSubmitFunction={handleEditUsuario}
        usuario={editedRow}
        edit={true}
      />
    );
  };

  const openViewModal = (rowId) => {
    let editedRow = users.find((row) => row._id === rowId);
    console.log("editedRow", editedRow);
    openModal(
      "Visualizar usuário",
      <UsuariosModal
        handleSubmitFunction={handleViewUsuario}
        usuario={editedRow}
      />
    );
  };

  const columns = [
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "editar",
      headerName: "Editar",
      width: 60,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={(event) => openEditModal(params.row._id, event)}
          style={{ borderRadius: "50%" }}
        >
          <Edit style={{ color: "#292D32" }} />
        </IconButton>
      ),
    },

    {
      field: "excluir",
      headerName: "Excluir",
      width: 100,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={(event) => {
            event.stopPropagation();
            Swal.fire({
              title: 'Você tem certeza?',
              text: 'Essa ação não poderá ser desfeita!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#198d16',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sim, excluir!',
            }).then(async (result) => {
              if (result.isConfirmed) {
                handleDeleteUsuario(params.row._id);
              }
            });
          }}
          style={{ borderRadius: "50%" }}
        >
          <DeleteForeverSharpIcon />
        </IconButton>
      ),
    },

  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredRows = users.filter((row) => {
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <div className="user-container">
      <div className="user-dados">
        <div className="user-linha space-between">
          <div className="user-linha">
              <TiGroupOutline />
            <h1 className="titulo">Usuários</h1>
          </div>

        </div>
        <div className="user-linha">
          <div className="user-table">

            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ margin: "10px" }}>
                <TextField
                  label="Filtro rápido"
                  variant="outlined"
                  size="small"
                  // fullWidth
                  value={filterText}
                  onChange={handleFilterChange}
                />
              </div>
              <div style={{ marginLeft: "auto", marginRight: "10px" }}>
              <Button
                        variant="contained"
                        color="success"
                        onClick={abrirAddUsuario}
                        startIcon={<AddIcon style={{color: 'white'}}/>}
                    >
                        Adicionar
                    </Button>
              </div>
            </div>


            <div style={{ height: "calc(100vh - 170px)", width: "100%" }}>
              <DataGrid
                sx={{
                  "& .MuiDataGrid-row:hover": {
                    cursor: "pointer",
                  },
                }}
                getRowId={(row) => row?._id}
                rows={filteredRows}
                columns={columns}
                pageSize={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onPageSizeChange={(pageSize) => {
                  setRowsPerPage(pageSize);
                  setPage(0);
                }}
                onRowClick={(params) => openViewModal(params.row._id)}
                components={{
                  Toolbar: GridToolbar,
                }}
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
