"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitBranch, Play, Pause, RotateCw, Clock, CheckCircle2, XCircle, Calendar, Activity } from "lucide-react"

const dags = [
  {
    id: 1,
    name: "daily_customer_etl",
    description: "Daily customer data extraction and transformation",
    schedule: "0 2 * * *",
    nextRun: "2025-11-01T02:00:00",
    lastRun: "2025-10-31T02:00:00",
    status: "active",
    successRate: 98.5,
    avgDuration: "18m",
    tasks: 8,
  },
  {
    id: 2,
    name: "hourly_sales_sync",
    description: "Hourly sales data synchronization",
    schedule: "0 * * * *",
    nextRun: "2025-10-31T11:00:00",
    lastRun: "2025-10-31T10:00:00",
    status: "active",
    successRate: 99.2,
    avgDuration: "5m",
    tasks: 4,
  },
  {
    id: 3,
    name: "weekly_analytics_report",
    description: "Weekly analytics aggregation and reporting",
    schedule: "0 0 * * 0",
    nextRun: "2025-11-03T00:00:00",
    lastRun: "2025-10-27T00:00:00",
    status: "active",
    successRate: 100,
    avgDuration: "45m",
    tasks: 12,
  },
  {
    id: 4,
    name: "realtime_inventory_update",
    description: "Real-time inventory level updates",
    schedule: "*/15 * * * *",
    nextRun: "2025-10-31T10:15:00",
    lastRun: "2025-10-31T10:00:00",
    status: "paused",
    successRate: 95.8,
    avgDuration: "3m",
    tasks: 3,
  },
]

const recentRuns = [
  {
    id: 1,
    dagName: "daily_customer_etl",
    runId: "run_20251031_020000",
    status: "success",
    startTime: "2025-10-31T02:00:00",
    duration: "17m 32s",
    tasksCompleted: 8,
    tasksFailed: 0,
  },
  {
    id: 2,
    dagName: "hourly_sales_sync",
    runId: "run_20251031_100000",
    status: "success",
    startTime: "2025-10-31T10:00:00",
    duration: "4m 18s",
    tasksCompleted: 4,
    tasksFailed: 0,
  },
  {
    id: 3,
    dagName: "hourly_sales_sync",
    runId: "run_20251031_090000",
    status: "success",
    startTime: "2025-10-31T09:00:00",
    duration: "5m 02s",
    tasksCompleted: 4,
    tasksFailed: 0,
  },
  {
    id: 4,
    dagName: "realtime_inventory_update",
    runId: "run_20251031_094500",
    status: "failed",
    startTime: "2025-10-31T09:45:00",
    duration: "1m 45s",
    tasksCompleted: 2,
    tasksFailed: 1,
  },
  {
    id: 5,
    dagName: "daily_customer_etl",
    runId: "run_20251030_020000",
    status: "success",
    startTime: "2025-10-30T02:00:00",
    duration: "18m 12s",
    tasksCompleted: 8,
    tasksFailed: 0,
  },
]

const stats = [
  {
    label: "Active DAGs",
    value: "24",
    change: "+2",
    icon: GitBranch,
    color: "text-primary",
  },
  {
    label: "Success Rate",
    value: "98.2%",
    change: "+1.2%",
    icon: CheckCircle2,
    color: "text-success",
  },
  {
    label: "Avg Duration",
    value: "12m",
    change: "-35%",
    icon: Clock,
    color: "text-warning",
  },
  {
    label: "Failed Runs (24h)",
    value: "3",
    change: "-5",
    icon: XCircle,
    color: "text-error",
  },
]

export function OrchestrationDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflow Orchestration</h1>
          <p className="text-muted-foreground mt-2">Manage DAGs, schedules, and automated workflows</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button>
            <Play className="mr-2 h-4 w-4" />
            Trigger DAG
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <Badge variant="secondary" className="bg-success/10 text-success">
                {stat.change}
              </Badge>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="dags" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dags">DAGs</TabsTrigger>
          <TabsTrigger value="runs">Recent Runs</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="dags" className="space-y-4">
          {dags.map((dag) => (
            <Card key={dag.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{dag.name}</h3>
                    {dag.status === "active" ? (
                      <Badge className="bg-success text-white">
                        <Activity className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <Pause className="h-3 w-3 mr-1" />
                        Paused
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{dag.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Schedule</p>
                      <p className="text-sm font-mono">{dag.schedule}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                      <p className="text-sm font-semibold text-success">{dag.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Avg Duration</p>
                      <p className="text-sm font-semibold">{dag.avgDuration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Tasks</p>
                      <p className="text-sm font-semibold">{dag.tasks}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <Button variant="ghost" size="icon">
                    <Play className="h-4 w-4" />
                  </Button>
                  {dag.status === "active" ? (
                    <Button variant="ghost" size="icon">
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="ghost" size="icon">
                      <RotateCw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* DAG Visualization */}
              <div className="mt-6 p-4 rounded-lg bg-secondary/30 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Task Flow</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {Array.from({ length: dag.tasks }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-10 w-10 rounded-lg bg-primary/20 border border-primary flex items-center justify-center">
                          <span className="text-xs font-mono">T{i + 1}</span>
                        </div>
                      </div>
                      {i < dag.tasks - 1 && <div className="h-0.5 w-6 bg-border" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <div>
                  Last run: <span className="text-foreground">{new Date(dag.lastRun).toLocaleString()}</span>
                </div>
                <div>
                  Next run: <span className="text-foreground">{new Date(dag.nextRun).toLocaleString()}</span>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="runs" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Runs</h2>
            <div className="space-y-3">
              {recentRuns.map((run) => (
                <div
                  key={run.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-sm font-medium">{run.dagName}</span>
                      {run.status === "success" ? (
                        <Badge className="bg-success text-white">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Success
                        </Badge>
                      ) : (
                        <Badge className="bg-error text-white">
                          <XCircle className="h-3 w-3 mr-1" />
                          Failed
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="block text-xs">Run ID</span>
                        <span className="font-mono text-xs">{run.runId}</span>
                      </div>
                      <div>
                        <span className="block text-xs">Duration</span>
                        <span className="font-medium text-foreground">{run.duration}</span>
                      </div>
                      <div>
                        <span className="block text-xs">Tasks</span>
                        <span className="font-medium text-foreground">
                          {run.tasksCompleted}/{run.tasksCompleted + run.tasksFailed}
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs">Started</span>
                        <span className="font-medium text-foreground">
                          {new Date(run.startTime).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Logs
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Scheduled Runs</h2>
            <div className="space-y-3">
              {dags
                .filter((dag) => dag.status === "active")
                .sort((a, b) => new Date(a.nextRun).getTime() - new Date(b.nextRun).getTime())
                .map((dag) => (
                  <div
                    key={dag.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-card"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{dag.name}</p>
                        <p className="text-sm text-muted-foreground">{new Date(dag.nextRun).toLocaleString()}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{dag.schedule}</Badge>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
