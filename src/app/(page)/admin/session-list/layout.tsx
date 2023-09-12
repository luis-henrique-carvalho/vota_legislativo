import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lista de sessões",
  description: "Pagina do administrador - Lista de sessõe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
