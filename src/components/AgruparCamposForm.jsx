import Div from "@/components/padres/Div";

export default function AgruparCamposForm({ children, indice }) {
  const tieneIndice = indice !== undefined && indice !== null;

  const direccionFlex = tieneIndice ? "flex-col" : "flex-col sm:flex-row";

  return (
    <Div className={`flex ${direccionFlex} gap-2 sm:gap-4`}>{children}</Div>
  );
}

// import Div from "@/components/padres/Div";

// export default function AgruparCamposForm({ children, indice }) {
//   return (
//     <Div
//       className={`flex ${indice ? "" : "flex-col"} flex-row gap-2 sm:gap-4`}
//     >
//       {children}
//     </Div>
//   );
// }
