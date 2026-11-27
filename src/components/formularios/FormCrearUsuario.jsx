"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Formulario from "@/components/Formulario";
import DivScroll from "@/components/DivScroll";
import AgruparCamposForm from "@/components/AgruparCamposForm";
import SelectOpcion from "@/components/SelectOpcion";
import InputCedula from "@/components/inputs/InputCedula";
import InputNombre from "@/components/inputs/InputNombre";
import InputCorreo from "@/components/inputs/InputCorreo";
import InputClave from "@/components/inputs/InputClave";
import InputCheckBox from "@/components/inputs/InputCheckBox";
import Div from "@/components/padres/Div";
import Span from "@/components/padres/Span";
import MostrarMsj from "@/components/MostrarMensaje";
import BotonAceptarCancelar from "@/components/botones/BotonAceptarCancelar";
import BotonLimpiarCampos from "@/components/botones/BotonLimpiarCampos";

import { cambiarSeleccionDepartamento } from "@/utils/dashboard/cambiarSeleccionDepartamento";

import { cambiarSeleccionRol } from "@/components/dashboard/usuarios/funciones/cambiarSeleccionRol";
import { cambiarSeleccionInstitucion } from "@/components/dashboard/usuarios/funciones/cambiarSeleccionInstitucion";
import { toggleAutorizar } from "@/components/dashboard/usuarios/funciones/toggleAutorizar";

import { abrirModal, cerrarModal } from "@/store/features/modal/slicesModal";
import { resetForm } from "@/store/features/formularios/formSlices";
import { cambiarSeleccionGenero } from "@/utils/dashboard/cambiarSeleccionGenero";
import InputTelefono from "../inputs/InputTelefono";
import InputFecha from "../inputs/InputFecha";
import InputDescripcion from "../inputs/InputDescripcion";

export default function FormCrearUsuario({
  acciones,
  datosUsuario,
  validaciones,
}) {
  const {
    accion,
    setNombreRol,
    setNombreDepartamento,
    setIdInstitucion,
    setIdDepartamento,
    setIdRol,
    setNombreInstitucion,
    setCedula,
    setNombre,
    setNombreDos,
    setApellido,
    setApellidoDos,
    setSector,
    setDireccion,
    setTelefono,
    setGenero,
    setFechaN,
    setFechaI,
    setProfesion,
    setResolucion,
    setCorreo,
    setClaveUno,
    setClaveDos,
    setMensaje,
    setAutorizar,
    setAccion,
  } = acciones;

  const {
    cedula,
    nombre,
    nombreDos,
    apellido,
    apellidoDos,
    sector,
    direccion,
    telefono,
    genero,
    fechaN,
    fechaI,
    profesion,
    resolucion,
    correo,
    nombreInstitucion,
    nombreDepartamento,
    claveUno,
    claveDos,
    mensaje,
    nombreRol,
    idRol,
    idUsuario,
    idDepartamento,
    idInstitucion,
    autorizar,
  } = datosUsuario;

  const {
    validarCedula,
    setValidarCedula,
    validarNombre,
    setValidarNombre,
    validarNombreDos,
    setValidarNombreDos,
    validarApellido,
    setValidarApellido,
    validarApellidoDos,
    setValidarApellidoDos,
    validarSector,
    setValidarSector,
    validarProfesion,
    setValidarProfesion,
    validarResolucion,
    setValidarResolucion,
    validarFechaN,
    setValidarFechaN,
    validarFechaI,
    setValidarFechaI,
    validarCorreo,
    setValidarCorreo,
    validarTelefono,
    setValidarTelefono,
    validarClave,
    setValidarClave,
  } = validaciones;

  const dispatch = useDispatch();

  const { usuarioActivo } = useSelector((state) => state.auth);
  const { roles } = useSelector((state) => state.roles);
  const { instituciones } = useSelector((state) => state.instituciones);
  const { departamentos } = useSelector((state) => state.departamentos);

  const mostrarCrear = useSelector((state) => state.modal.modales.crear);
  const reiniciarForm = useSelector(
    (state) => state.forms.reiniciarForm.usuarioForm,
  );

  useEffect(() => {
    if (mostrarCrear) {
      setCedula("");
      setCorreo("");
      setNombre("");
      setApellido("");
      setIdRol("");
      setIdInstitucion("");
      setIdDepartamento("");
      setClaveUno("");
      setClaveDos("");
      setAutorizar("");
      setMensaje("");
    }
  }, [reiniciarForm, mostrarCrear]);

  const leyendoClave1 = (e) => {
    const claveUnoUno = e.target.value;
    setClaveUno(claveUnoUno);
    verificarCoincidencia(claveUnoUno, claveDos);
    limiteSizeClave(claveUnoUno, claveDos);
  };

  const leyendoClave2 = (e) => {
    const claveDosDos = e.target.value;
    setClaveDos(claveDosDos);
    verificarCoincidencia(claveUno, claveDosDos);
    limiteSizeClave(claveUno, claveDosDos);
  };

  const limiteSizeClave = (clave, claveDos) => {
    if (clave && claveDos && clave === claveDos) {
      if (clave.length < 8 || claveDos.length > 16) {
        setMensaje("Clave debe ser entre 8 y 16 caracteres");
      } else if (
        (clave.length >= 8 || claveDos.length <= 16) &&
        !validarClave
      ) {
        setMensaje("Formato de clave invalido...");
      } else {
        setMensaje("");
      }
    }
  };

  const verificarCoincidencia = (clave, clave2) => {
    if (validarClave) {
      setMensaje("");
    } else {
      setMensaje("Formato clave invalido...");
    }

    if (clave !== clave2) {
      setMensaje("Claves no coinciden...");
    } else {
      setMensaje("");
    }
  };

  return (
    <Formulario onSubmit={(e) => e.preventDefault()}>
      <DivScroll>
        <AgruparCamposForm>
          <InputCedula
            value={cedula}
            setValue={setCedula}
            validarCedula={validarCedula}
            setValidarCedula={setValidarCedula}
          />

          <InputFecha
            nombre={"Fecha de nacimiento"}
            value={fechaN}
            setValue={setFechaN}
            validarFecha={validarFechaN}
            setValidarFecha={setValidarFechaN}
          />
        </AgruparCamposForm>

        <AgruparCamposForm>
          <InputNombre
            value={nombre}
            setValue={setNombre}
            validarNombre={validarNombre}
            setValidarNombre={setValidarNombre}
          />

          <InputNombre
            indice="nombre"
            nombre={"Segundo nombre"}
            value={nombreDos}
            setValue={setNombreDos}
            validarNombre={validarNombreDos}
            setValidarNombre={setValidarNombreDos}
            placeholder={"Estefania"}
          />
        </AgruparCamposForm>

        <AgruparCamposForm>
          <InputNombre
            nombre={"Apellido"}
            htmlFor={"apellido"}
            value={apellido}
            setValue={setApellido}
            validarNombre={validarApellido}
            setValidarNombre={setValidarApellido}
            placeholder={"morgado"}
          />

          <InputNombre
            indice="nombre"
            nombre={"Segundo apellido"}
            value={apellidoDos}
            setValue={setApellidoDos}
            validarNombre={validarApellidoDos}
            setValidarNombre={setValidarApellidoDos}
            placeholder={"peraza"}
          />
        </AgruparCamposForm>

        <AgruparCamposForm>
          <SelectOpcion
            idOpcion={idRol}
            nombre={"Roles"}
            handleChange={(e) => cambiarSeleccionRol(e, setIdRol)}
            opciones={roles}
            seleccione={"Seleccione"}
            setNombre={setNombreRol}
          />

          {usuarioActivo.id_rol === 1 && (
            <SelectOpcion
              idOpcion={idInstitucion}
              nombre={"Instituciones"}
              handleChange={(e) =>
                cambiarSeleccionInstitucion(e, setIdInstitucion)
              }
              opciones={instituciones}
              seleccione={"Seleccione"}
              setNombre={setNombreInstitucion}
            />
          )}

          <SelectOpcion
            idOpcion={idDepartamento}
            nombre={"Departamentos"}
            handleChange={(e) =>
              cambiarSeleccionDepartamento(e, setIdDepartamento)
            }
            opciones={departamentos}
            seleccione={"Seleccione"}
            setNombre={setNombreDepartamento}
          />
        </AgruparCamposForm>

        <AgruparCamposForm>
          <SelectOpcion
            idOpcion={genero}
            nombre={"Genero"}
            handleChange={(e) => {
              cambiarSeleccionGenero(e, setGenero);
            }}
            opciones={[
              { id: "1", nombre: "Masculino" },
              { id: "2", nombre: "Femenino" },
            ]}
            seleccione={"Seleccione"}
          />

          <InputFecha
            nombre={"Fecha de ingreso"}
            value={fechaI}
            setValue={setFechaI}
            validarFecha={validarFechaI}
            setValidarFecha={setValidarFechaI}
          />
        </AgruparCamposForm>

        <AgruparCamposForm>
          <InputNombre
            indice="nombre"
            nombre={"Sector"}
            value={sector}
            setValue={setSector}
            validarNombre={validarSector}
            setValidarNombre={setValidarSector}
            placeholder={"Ejemplo: la coromoto, la caridad, etc..."}
          />
          <InputNombre
            indice="nombre"
            nombre={"Resolución"}
            value={resolucion}
            setValue={setResolucion}
            validarNombre={validarResolucion}
            setValidarNombre={setValidarResolucion}
            placeholder={"Ejemplo: 000-000"}
          />
        </AgruparCamposForm>

        <AgruparCamposForm>
          <InputTelefono
            value={telefono}
            setValue={setTelefono}
            validarTelefono={validarTelefono}
            setValidarTelefono={setValidarTelefono}
          />

          <InputNombre
            indice="nombre"
            nombre={"Profesión"}
            value={profesion}
            setValue={setProfesion}
            validarNombre={validarProfesion}
            setValidarNombre={setValidarProfesion}
            placeholder={"Ejemplo: contador, abogado, etc..."}
          />
        </AgruparCamposForm>

        <AgruparCamposForm>
          <InputDescripcion
            nombre={"Dirección"}
            value={direccion}
            setValue={setDireccion}
            rows={6}
            max={500}
            autoComplete="off"
            placeholder={"Ingresa tu dirección con todos los detalles..."}
          />
        </AgruparCamposForm>

        <AgruparCamposForm>
          <InputCorreo
            value={correo}
            setValue={setCorreo}
            validarCorreo={validarCorreo}
            setValidarCorreo={setValidarCorreo}
          />
        </AgruparCamposForm>

        <AgruparCamposForm>
          <InputClave
            value={claveUno}
            onChange={leyendoClave1}
            indice={"clave"}
            validarClave={validarClave}
            setValidarClave={setValidarClave}
          />

          <InputClave
            nombre={"Clave confirmar"}
            value={claveDos}
            onChange={leyendoClave2}
            indice={"clave2"}
          />
        </AgruparCamposForm>

        <Div className="flex flex-col w-full">
          <Span className="text-[#364153] font-medium">Autorizar</Span>
          <Div className="flex justify-evenly border border-[#d1d5dc] py-2 rounded-md hover:border hover:border-[#082158]">
            {[
              { id: 1, nombre: "Si" },
              { id: 2, nombre: "No" },
            ].map((opcion) => (
              <InputCheckBox
                altura={5}
                key={opcion.id}
                id={opcion.id}
                nombre={opcion.nombre}
                isChecked={autorizar === opcion.id}
                onToggle={() =>
                  toggleAutorizar(opcion.id, setAutorizar, autorizar)
                }
              />
            ))}
          </Div>
        </Div>

        {mensaje && (
          <Div className="w-full">
            <MostrarMsj mensaje={mensaje} />
          </Div>
        )}

        <AgruparCamposForm>
          <BotonAceptarCancelar
            indice={"aceptar"}
            aceptar={() => {
              dispatch(cerrarModal("crear"));
              dispatch(abrirModal("confirmar"));
            }}
            nombre={"Crear"}
            campos={{
              cedula,
              correo,
              nombre,
              apellido,
              claveUno,
              claveDos,
              idRol,
              idInstitucion:
                usuarioActivo.id_rol === 1
                  ? idInstitucion
                  : usuarioActivo.MiembrosInstitucion?.[0]?.id,
              idDepartamento,
              autorizar,
            }}
          />

          <BotonLimpiarCampos
            aceptar={() => {
              dispatch(resetForm("usuarioForm"));
            }}
            campos={{
              cedula,
              correo,
              nombre,
              apellido,
              claveUno,
              claveDos,
              idRol,
              idInstitucion,
              idDepartamento,
              autorizar,
            }}
          />
        </AgruparCamposForm>
      </DivScroll>
    </Formulario>
  );
}

/**
 {
  idDepartamento,
  setIdDepartamento,
  idInstitucion,
  setIdInstitucion,
  idRol,
  setIdRol,
  cedula,
  setCedula,
  correo,
  setCorreo,
  nombre,
  setNombre,
  apellido,
  setApellido,
  claveUno,
  setClaveUno,
  claveDos,
  setClaveDos,
  validarCedula,
  setValidarCedula,
  validarCorreo,
  setValidarCorreo,
  validarNombre,
  setValidarNombre,
  validarApellido,
  setValidarApellido,
  validarClave,
  setValidarClave,
  mensaje,
  setMensaje,
  departamentos,
  instituciones,
  roles,
  setNombreDepartamento,
  setNombreInstitucion,
  setNombreRol,
  autorizar,
  setAutorizar,
}
 */
