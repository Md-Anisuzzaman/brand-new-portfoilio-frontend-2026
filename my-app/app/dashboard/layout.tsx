import { DashboardLayout } from "../components/dashboard/DashBoardLayout";


export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}