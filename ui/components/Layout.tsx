import useSidebarStore from "@/stores/global-stores";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen } = useSidebarStore();
  return (
    <main className={`lg:pl-${isSidebarOpen ? 80 : 0} bg-[#efeaf3] dark:bg-dark-primary min-h-screen`}>
      <div className="lg:mx-auto mx-4">{children}</div>
    </main>
  );
};

export default Layout;
