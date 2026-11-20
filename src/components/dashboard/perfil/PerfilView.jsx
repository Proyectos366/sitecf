"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SectionMain from "@/components/SectionMain";
import SectionQuaternary from "@/components/SectionQuaternary";
import Div from "@/components/padres/Div";
import ModalPerfil from "@/components/dashboard/perfil/components/ModalPerfil";
import DetallesEmpleado from "@/components/dashboard/perfil/components/DetallesEmpleado";
import ImgPrevia from "@/components/dashboard/perfil/components/ImgPrevia";

import { obtenerPerfilUsuario } from "@/store/features/usuarios/thunks/perfilUsuario";
import SectionPrimary from "@/components/SectionPrimary";

export default function PerfilView({}) {
  const dispatch = useDispatch();

  const { usuarios, loading } = useSelector((state) => state.usuarios);

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [correoUsuario, setCorreoUsuario] = useState("");

  const [imagen, setImagen] = useState(null);
  const [file, setFile] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [validarNombre, setValidarNombre] = useState(false);
  const [validarApellido, setValidarApellido] = useState(false);

  const [accion, setAccion] = useState("");

  useEffect(() => {
    dispatch(obtenerPerfilUsuario());
  }, [dispatch]);

  return (
    <>
      <ModalPerfil
        imgPrevia={imagen}
        setImgPrevia={setImagen}
        setFile={setFile}
        file={file}
      />

      <SectionMain>
        <SectionPrimary
          indice={1}
          nombre={"Perfil empleado"}
          funcion={() => {}}
        >
          <Div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-10 w-full bg-gray-100 rounded-md p-2 sm:p-6">
            <ImgPrevia
              imgPrevia={
                usuarios?.imagenes?.[0]?.path
                  ? `/api/usuarios/mostrar-img-perfil?path=${usuarios.imagenes[0].path.replace(
                      /^\/+/,
                      "",
                    )}`
                  : "/img/perfil.png"
              }
              datos={usuarios}
              indice={true}
              setAccion={setAccion}
            />

            <DetallesEmpleado usuarios={usuarios} />
          </Div>
        </SectionPrimary>
      </SectionMain>
    </>
  );
}
