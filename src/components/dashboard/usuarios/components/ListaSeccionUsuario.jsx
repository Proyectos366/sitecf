import Loader from "@/components/Loader";
import EstadoMsjVacio from "@/components/mensaje/EstadoMsjVacio";
import Div from "@/components/padres/Div";
import FichaUsuario from "./FichaUsuario";
import ButtonToggleDetallesUsuario from "./ButtonToggleDetallesUsuario";
import ListadoUsuarios from "./ListadoUsuarios";

// Puedes colocar esto fuera de tu componente principal
const ListaSeccion = ({
  datos,
  loading,
  usuarios,
  expanded,
  setExpanded,
  abrirModal,
  setAccion,
  ...props
}) => {
  if (usuarios?.length === 0 && loading) {
    return <Loader titulo="Cargando usuarios..." />;
  }

  if (datos?.length === 0) {
    return <EstadoMsjVacio dato={datos} loading={loading} />;
  }

  return (
    <Div className="flex flex-col gap-2">
      {datos.map((usuario, index) => {
        const departamentoActual = usuario?.MiembrosDepartamentos?.[0];

        return (
          <FichaUsuario key={usuario.id} usuario={usuario} index={index}>
            <ButtonToggleDetallesUsuario
              expanded={expanded}
              usuario={usuario}
              setExpanded={setExpanded}
            />

            {expanded === usuario.id && (
              <ListadoUsuarios
                usuario={usuario}
                departamentoActual={departamentoActual}
                abrirModal={abrirModal}
                setAccion={setAccion}
                {...props}
              />
            )}
          </FichaUsuario>
        );
      })}
    </Div>
  );
};

export default ListaSeccion;
