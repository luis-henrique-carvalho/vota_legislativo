import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faça seu Login",
  description: "Login page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
