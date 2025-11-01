import { DashboardLayout } from "@/components/dashboard-layout"
import { OrchestrationDashboard } from "@/components/orchestration-dashboard"

export default function OrchestrationPage() {
  return (
    <DashboardLayout>
      <OrchestrationDashboard />
    </DashboardLayout>
  )
}
