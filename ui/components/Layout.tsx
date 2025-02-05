'use client';
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className='bg-[#FFFFFF] dark:bg-dark-primary relative flex h-full max-w-full flex-1 flex-col overflow-auto'
    >
      <div>{children}</div>
    </main>
  );
};

export default Layout;
