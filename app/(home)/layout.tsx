import User from "@/components/User";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <User />
      {children}
    </div>
  );
}
