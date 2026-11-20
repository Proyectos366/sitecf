import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Formulario from "@/components/Formulario";
import DivScroll from "@/components/DivScroll";
import AgruparCamposForm from "@/components/AgruparCamposForm";
import SelectOpcion from "@/components/SelectOpcion";
import InputNombreSinValidar from "@/components/inputs/InputNombreSinValidar";
import InputDescripcion from "@/components/inputs/InputDescripcion";
import BotonAceptarCancelar from "@/components/botones/BotonAceptarCancelar";
import BotonLimpiarCampos from "@/components/botones/BotonLimpiarCampos";

import { abrirModal, cerrarModal } from "@/store/features/modal/slicesModal";

import { textRegex } from "@/utils/regex/textRegex";
import { limpiarCampos } from "@/utils/limpiarForm";
import { cambiarSeleccionNivel } from "@/utils/dashboard/cambiarSeleccionNivel";
import { cambiarSeleccionSeccion } from "@/utils/dashboard/cambiarSeleccionSeccion";

import cantNiveles from "@/constants/cantNiveles";
import cantSecciones from "@/constants/cantSecciones";

export default function FormEditarEstante({
  acciones,
  datosEstante,
  validaciones,
}) {
  const dispatch = useDispatch();

  const { setNombre, setDescripcion, setNiveles, setSecciones } = acciones;

  const { nombre, descripcion, niveles, secciones } = datosEstante;

  const { validarNombre, setValidarNombre } = validaciones;

  useEffect(() => {
    const validarYActualizar = (valor, setValidar) => {
      if (valor) {
        const limpio = String(valor).trim();
        const esValido = textRegex.test(limpio);
        if (typeof setValidar === "function") setValidar(esValido);
      }
    };

    validarYActualizar(nombre, setValidarNombre);

    // Transformar niveles
    if (niveles) {
      const nivelesStr = String(niveles);
      const nivelesTransformado =
        nivelesStr.length === 1 ? `0${nivelesStr}` : nivelesStr;
      if (nivelesTransformado !== niveles) {
        setNiveles(nivelesTransformado);
      }
    }

    // Transformar secciones
    if (secciones) {
      const seccionesStr = String(secciones);
      if (seccionesStr !== secciones) {
        setSecciones(seccionesStr);
      }
    }
  }, [nombre, niveles, secciones, descripcion]);

  return (
    <Formulario
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <DivScroll>
        <InputNombreSinValidar
          value={nombre}
          setValue={setNombre}
          nombre={"Nombre"}
          placeholder={"estante rosado n° 001"}
        />

        <InputDescripcion
          value={descripcion}
          setValue={setDescripcion}
          rows={6}
          max={500}
          autoComplete="off"
        />

        <SelectOpcion
          idOpcion={niveles}
          nombre={"Niveles"}
          handleChange={(e) => {
            cambiarSeleccionNivel(e, setNiveles);
          }}
          opciones={cantNiveles}
          seleccione={"Seleccione"}
        />

        <SelectOpcion
          idOpcion={secciones}
          nombre={"Secciones"}
          handleChange={(e) => {
            cambiarSeleccionSeccion(e, setSecciones);
          }}
          opciones={cantSecciones}
          seleccione={"Seleccione"}
        />

        <AgruparCamposForm>
          <BotonAceptarCancelar
            indice={"aceptar"}
            aceptar={() => {
              dispatch(cerrarModal("editar"));
              dispatch(abrirModal("confirmarCambios"));
            }}
            nombre={"Actualizar"}
            campos={{
              nombre,
              descripcion,
              niveles,
              secciones,
            }}
          />

          <BotonLimpiarCampos
            aceptar={() => {
              limpiarCampos({
                setNombre,
                setDescripcion,
                setNiveles,
                setSecciones,
              });
            }}
            campos={{
              nombre,
              descripcion,
              niveles,
              secciones,
            }}
          />
        </AgruparCamposForm>
      </DivScroll>
    </Formulario>
  );
}
