import { DashboardLayout } from "@/components/dashboard-layout"
import { CICDDashboard } from "@/components/cicd-dashboard"

export default function CICDPage() {
  return (
    <DashboardLayout>
      <CICDDashboard />
    </DashboardLayout>
  )
}
