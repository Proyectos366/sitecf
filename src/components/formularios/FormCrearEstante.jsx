import { useDispatch } from "react-redux";

import Formulario from "@/components/Formulario";
import DivScroll from "@/components/DivScroll";
import AgruparCamposForm from "@/components/AgruparCamposForm";
import InputNombreEstante from "@/components/inputs/InputNombreEstante";
import InputNombreSinValidar from "@/components/inputs/InputNombreSinValidar";
import InputDescripcion from "@/components/inputs/InputDescripcion";
import SelectOpcion from "@/components/SelectOpcion";
import BotonAceptarCancelar from "@/components/botones/BotonAceptarCancelar";
import BotonLimpiarCampos from "@/components/botones/BotonLimpiarCampos";

import { abrirModal, cerrarModal } from "@/store/features/modal/slicesModal";

import { limpiarCampos } from "@/utils/limpiarForm";
import { cambiarSeleccionNivel } from "@/utils/dashboard/cambiarSeleccionNivel";
import { cambiarSeleccionSeccion } from "@/utils/dashboard/cambiarSeleccionSeccion";

import cantNiveles from "@/constants/cantNiveles";
import cantSecciones from "@/constants/cantSecciones";

export default function FormCrearEstante({
  acciones,
  datosEstante,
  validaciones,
}) {
  const dispatch = useDispatch();

  const { setNombre, setDescripcion, setAlias, setNiveles, setSecciones } =
    acciones;

  const { nombre, descripcion, alias, niveles, secciones } = datosEstante;

  const { validarAlias, setValidarAlias } = validaciones;

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

        <InputNombreEstante
          value={alias}
          setValue={setAlias}
          validarEstante={validarAlias}
          setValidarEstante={setValidarAlias}
          nombre={"Alias"}
          indice="estante2"
        />

        <AgruparCamposForm>
          <BotonAceptarCancelar
            indice={"aceptar"}
            aceptar={() => {
              dispatch(cerrarModal("crear"));
              dispatch(abrirModal("confirmar"));
            }}
            nombre={"Crear"}
            campos={{
              nombre,
              descripcion,
              alias,
              niveles,
              secciones,
            }}
          />

          <BotonLimpiarCampos
            aceptar={() => {
              limpiarCampos({
                setNombre,
                setDescripcion,
                setAlias,
                setNiveles,
                setSecciones,
              });
            }}
            campos={{
              nombre,
              descripcion,
              alias,
              niveles,
              secciones,
            }}
          />
        </AgruparCamposForm>
      </DivScroll>
    </Formulario>
  );
}
