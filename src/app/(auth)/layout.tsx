import Header from '@/components/layouts/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header title="Form Builder" />
      <main className="p-4">{children}</main>
    </>
  );
}
