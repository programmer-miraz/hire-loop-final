import Navber from "@/components/navber";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navber />
      <main className="flex-1">

        {children}
      </main>
    </>
  );
}