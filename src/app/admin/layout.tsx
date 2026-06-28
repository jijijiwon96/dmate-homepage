import AdminHeader from './AdminHeader';

export const metadata = { title: { absolute: 'Admin | D-MATE' } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <AdminHeader />
      <main>{children}</main>
    </div>
  );
}
