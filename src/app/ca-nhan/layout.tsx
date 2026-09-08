import Breadcrumb from "@/components/BreadCrumb";
import AccountBreadcrumb from "@/components/account/AccountBreadCrumb";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-[#10254a]">
      <div className="mx-auto w-full max-w-[1500] px-4 py-3 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <AccountBreadcrumb />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[362px_minmax(0,1fr)]">
          {/* Sidebar */}
          <AccountSidebar />
          {/* Page content */}
          {children}
        </div>
      </div>
    </div>
  );
}
