import { DashboardLayout } from "@/components/dashboard-layout"
import { PipelinesDashboard } from "@/components/pipelines-dashboard"

export default function PipelinesPage() {
  return (
    <DashboardLayout>
      <PipelinesDashboard />
    </DashboardLayout>
  )
}
