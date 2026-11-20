import prisma from "@/config/prisma";

async function resetearTablaUsuarios() {
  // Cambia "Usuario" por el nombre exacto de tu modelo en el schema.prisma
  await prisma.imagen.deleteMany({});
  await prisma.$executeRawUnsafe(
    `DELETE FROM sqlite_sequence WHERE name = 'imagen';`,
  );

  console.log(
    "¡Tabla reseteada! Los nuevos registros comenzarán desde el ID 1.",
  );
}

export default resetearTablaUsuarios;
