import useSidebarStore from "@/stores/global-stores";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen } = useSidebarStore();
  return (
    <main
      className='bg-[#FFFFFF] dark:bg-dark-primary relative flex h-full max-w-full flex-1 flex-col overflow-auto'
    >
      <div>{children}</div>
    </main>
  );
};

export default Layout;
