import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administrador",
  description: "Pagina do administrador",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
