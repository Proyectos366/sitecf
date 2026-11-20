/**
 @fileoverview Función utilitaria para validar los datos necesarios antes de consultar
 todas las formaciones disponibles en la base de datos, según el rol del usuario.
 @module services/formaciones/validarConsultarTodas
*/

import retornarRespuestaFunciones from "@/utils/respuestasValidaciones"; // Utilidad para generar respuestas estandarizadas
import obtenerDatosUsuarioToken from "../obtenerDatosUsuarioToken"; // Función para obtener los datos del usuario activo a través del token de autenticación

/**
 Valida la identidad del usuario y construye la condición de búsqueda para consultar formaciones.
 @async
 @function validarConsultarTodasFormaciones
 @returns {Promise<Response>} Respuesta estructurada con el resultado de la validación y la condición de búsqueda.
*/
export default async function validarConsultarTodasFormaciones() {
  try {
    // 1. Obtener y validar el correo del usuario a través del token.
    const validaciones = await obtenerDatosUsuarioToken();

    // 2. Si el token es inválido, se retorna un error.
    if (validaciones.status === "error") {
      return retornarRespuestaFunciones(
        validaciones.status,
        validaciones.message
      );
    }

    // 3. Verificar si el usuario tiene permisos (rol 1 = master).
    if (validaciones.id_rol !== 1) {
      return retornarRespuestaFunciones(
        "error",
        "Error, usuario no tiene permisos..."
      );
    }

    // 4. Retornar respuesta exitosa con la condición de búsqueda y datos del usuario.
    return retornarRespuestaFunciones("ok", "Validacion correcta", {
      id_usuario: validaciones.id_usuario,
    });
  } catch (error) {
    // 5. Manejo de errores inesperados.
    console.log("Error interno validar consultar todas formaciones: " + error);

    // Retorna una respuesta del error inesperado
    return retornarRespuestaFunciones(
      "error",
      "Error interno validar consultar todas formaciones"
    );
  }
}
