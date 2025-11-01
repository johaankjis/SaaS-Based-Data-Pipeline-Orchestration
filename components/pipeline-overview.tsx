"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, TrendingUp, Clock, CheckCircle2, XCircle, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    name: "Records Processed Today",
    value: "5.2M",
    change: "+12.5%",
    trend: "up",
    icon: Activity,
  },
  {
    name: "Active Pipelines",
    value: "24",
    change: "+2",
    trend: "up",
    icon: CheckCircle2,
  },
  {
    name: "Avg Processing Time",
    value: "18m",
    change: "-35%",
    trend: "down",
    icon: Clock,
  },
  {
    name: "System Reliability",
    value: "99.8%",
    change: "+0.3%",
    trend: "up",
    icon: TrendingUp,
  },
]

const recentPipelines = [
  {
    name: "Customer Analytics ETL",
    status: "running",
    progress: 78,
    records: "1.2M",
    eta: "4m",
  },
  {
    name: "Sales Data Aggregation",
    status: "completed",
    progress: 100,
    records: "850K",
    eta: "Completed",
  },
  {
    name: "User Behavior Transform",
    status: "running",
    progress: 45,
    records: "2.1M",
    eta: "12m",
  },
  {
    name: "Inventory Sync Pipeline",
    status: "failed",
    progress: 23,
    records: "340K",
    eta: "Failed",
  },
  {
    name: "Marketing Attribution",
    status: "queued",
    progress: 0,
    records: "0",
    eta: "Queued",
  },
]

const systemHealth = [
  { component: "ETL Workers", status: "healthy", uptime: "99.9%" },
  { component: "Orchestration", status: "healthy", uptime: "99.8%" },
  { component: "Data Warehouse", status: "healthy", uptime: "100%" },
  { component: "CI/CD Pipeline", status: "warning", uptime: "98.2%" },
]

export function PipelineOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pipeline Overview</h1>
        <p className="text-muted-foreground mt-2">Monitor your data pipeline orchestration platform in real-time</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <Badge
                variant="secondary"
                className={stat.trend === "up" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}
              >
                {stat.change}
              </Badge>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground mt-1">{stat.name}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Pipelines */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Pipelines</h2>
            <Link href="/pipelines">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentPipelines.map((pipeline) => (
              <div
                key={pipeline.name}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{pipeline.name}</span>
                    {pipeline.status === "running" && <Badge className="bg-primary">Running</Badge>}
                    {pipeline.status === "completed" && (
                      <Badge className="bg-success text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {pipeline.status === "failed" && (
                      <Badge className="bg-error text-white">
                        <XCircle className="h-3 w-3 mr-1" />
                        Failed
                      </Badge>
                    )}
                    {pipeline.status === "queued" && <Badge variant="outline">Queued</Badge>}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{pipeline.records} records</span>
                    <span>•</span>
                    <span>{pipeline.eta}</span>
                  </div>
                  {pipeline.status === "running" && (
                    <div className="mt-2 h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${pipeline.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Health */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">System Health</h2>
          <div className="space-y-4">
            {systemHealth.map((item) => (
              <div key={item.component} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  {item.status === "healthy" ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-warning" />
                  )}
                  <span className="font-medium">{item.component}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{item.uptime}</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-start gap-3">
              <Activity className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium text-sm">All systems operational</div>
                <div className="text-xs text-muted-foreground mt-1">Last checked: 2 minutes ago</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
