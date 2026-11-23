import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsuarios } from "@/store/features/usuarios/thunks/todosUsuarios";
import { filtrarOrdenar } from "@/utils/filtrarOrdenar";

export function useUsuariosLogic() {
  const dispatch = useDispatch();
  const { usuarios, loading } = useSelector((state) => state.usuarios);

  useEffect(() => {
    dispatch(fetchUsuarios());
  }, [dispatch]);

  const [cedulaUsuario, setCedulaUsuario] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [nombreUsuarioDos, setNombreUsuarioDos] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [apellidoUsuarioDos, setApellidoUsuarioDos] = useState("");
  const [generoVocero, setGeneroVocero] = useState("");
  const [correoUsuario, setCorreoUsuario] = useState("");
  const [claveUnoUsuario, setClaveUnoUsuario] = useState("");
  const [claveDosUsuario, setClaveDosUsuario] = useState("");
  const [mensajeValidar, setMensajeValidar] = useState("");

  const [nombreInstitucion, setNombreInstitucion] = useState("");
  const [nombreDepartamento, setNombreDepartamento] = useState("");

  const [idDepartamento, setIdDepartamento] = useState("");
  const [idRol, setIdRol] = useState("");
  const [nombreRol, setNombreRol] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [idInstitucion, setIdInstitucion] = useState("");

  const [expanded, setExpanded] = useState("");
  const [accion, setAccion] = useState("");

  const [firstActivos, setFirstActivos] = useState(0);
  const [firstInactivos, setFirstInactivos] = useState(0);
  const [rows, setRows] = useState(25);

  const [validarCedulaUsuario, setValidarCedulaUsuario] = useState(false);
  const [validarCorreoUsuario, setValidarCorreoUsuario] = useState(false);
  const [validarNombreUsuario, setValidarNombreUsuario] = useState(false);
  const [validarNombreUsuarioDos, setValidarNombreUsuarioDos] = useState(false);
  const [validarApellidoUsuario, setValidarApellidoUsuario] = useState(false);
  const [validarApellidoUsuarioDos, setValidarApellidoUsuarioDos] =
    useState(false);
  const [validarClaveUsuario, setValidarClaveUsuario] = useState(false);

  const [autorizar, setAutorizar] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [ordenCampo, setOrdenCampo] = useState("nombre");
  const [ordenDireccion, setOrdenDireccion] = useState("asc");

  const camposBusqueda = ["cedula", "nombre", "apellido", "correo"];
  const opcionesOrden = [
    { id: "cedula", nombre: "Cédula" },
    { id: "correo", nombre: "Correo" },
    { id: "nombre", nombre: "Nombre" },
    { id: "apellido", nombre: "Apellido" },
  ];

  const usuariosActivos = useMemo(
    () => usuarios.filter((usuario) => usuario.borrado === false),
    [usuarios],
  );

  const usuariosInactivos = useMemo(
    () => usuarios.filter((usuario) => usuario.borrado === true),
    [usuarios],
  );

  const usuariosActivosFiltradosOrdenados = useMemo(() => {
    return filtrarOrdenar(
      usuariosActivos,
      busqueda,
      ordenCampo,
      ordenDireccion,
      camposBusqueda,
    );
  }, [usuariosActivos, busqueda, ordenCampo, ordenDireccion]);

  const usuariosInactivosFiltradosOrdenados = useMemo(() => {
    return filtrarOrdenar(
      usuariosInactivos,
      busqueda,
      ordenCampo,
      ordenDireccion,
      camposBusqueda,
    );
  }, [usuariosInactivos, busqueda, ordenCampo, ordenDireccion]);

  const usuariosActivosPaginados = useMemo(() => {
    return usuariosActivosFiltradosOrdenados.slice(
      firstActivos,
      firstActivos + rows,
    );
  }, [usuariosActivosFiltradosOrdenados, firstActivos, rows]);

  const usuariosInactivosPaginados = useMemo(() => {
    return usuariosInactivosFiltradosOrdenados.slice(
      firstInactivos,
      firstInactivos + rows,
    );
  }, [usuariosInactivosFiltradosOrdenados, firstInactivos, rows]);

  useEffect(() => {
    setFirstActivos(0);
    setFirstInactivos(0);
  }, [busqueda, ordenCampo, ordenDireccion]);

  const acciones = {
    accion,
    setNombreRol,
    setNombreDepartamento,
    setIdInstitucion,
    setIdDepartamento,
    setIdRol,
    setNombreInstitucion,
    setCedula: setCedulaUsuario,
    setNombre: setNombreUsuario,
    setNombreDos: setNombreUsuarioDos,
    setApellido: setApellidoUsuario,
    setApellidoDos: setApellidoUsuarioDos,
    setGenero: setGeneroVocero,
    setCorreo: setCorreoUsuario,
    setClaveUno: setClaveUnoUsuario,
    setClaveDos: setClaveDosUsuario,
    setMensaje: setMensajeValidar,
    setAutorizar,
    setAccion,
  };

  const datosUsuario = {
    cedula: cedulaUsuario,
    nombre: nombreUsuario,
    nombreDos: nombreUsuarioDos,
    apellido: apellidoUsuario,
    apellidoDos: apellidoUsuarioDos,
    genero: generoVocero,
    correo: correoUsuario,
    nombreInstitucion: nombreInstitucion,
    nombreDepartamento: nombreDepartamento,
    claveUno: claveUnoUsuario,
    claveDos: claveDosUsuario,
    mensaje: mensajeValidar,
    nombreRol: nombreRol,
    idUsuario: idUsuario,
    idRol: idRol,
    idDepartamento: idDepartamento,
    idInstitucion: idInstitucion,
    autorizar: autorizar,
  };

  const validaciones = {
    validarCedula: validarCedulaUsuario,
    setValidarCedula: setValidarCedulaUsuario,
    validarNombre: validarNombreUsuario,
    setValidarNombre: setValidarNombreUsuario,
    validarNombreDos: validarNombreUsuarioDos,
    setValidarNombreDos: setValidarNombreUsuarioDos,
    validarApellido: validarApellidoUsuario,
    setValidarApellido: setValidarApellidoUsuario,
    validarApellidoDos: validarApellidoUsuarioDos,
    setValidarApellidoDos: setValidarApellidoUsuarioDos,
    validarCorreo: validarCorreoUsuario,
    setValidarCorreo: setValidarCorreoUsuario,
    validarClave: validarClaveUsuario,
    setValidarClave: setValidarClaveUsuario,
  };

  return {
    dispatch,
    usuarios,
    loading,
    expanded,
    setExpanded,
    firstActivos,
    setFirstActivos,
    firstInactivos,
    setFirstInactivos,
    rows,
    setRows,
    busqueda,
    setBusqueda,
    ordenCampo,
    setOrdenCampo,
    ordenDireccion,
    setOrdenDireccion,
    opcionesOrden,
    usuariosActivosFiltradosOrdenados,
    usuariosInactivosFiltradosOrdenados,
    usuariosActivosPaginados,
    usuariosInactivosPaginados,
    setAccion,
    setNombreUsuario,
    setNombreDepartamento,
    setIdDepartamento,
    setIdUsuario,
    setIdRol,
    setNombreRol,
    acciones,
    datosUsuario,
    validaciones,
  };
}
