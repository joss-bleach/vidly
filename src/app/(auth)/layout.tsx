const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-screen items-center justify-center">
      {children}
    </main>
  );
};

export default Layout;
