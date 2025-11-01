import { DashboardLayout } from "@/components/dashboard-layout"
import { PipelineOverview } from "@/components/pipeline-overview"

export default function Home() {
  return (
    <DashboardLayout>
      <PipelineOverview />
    </DashboardLayout>
  )
}
