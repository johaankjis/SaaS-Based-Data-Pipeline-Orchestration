"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { CheckCircle2, XCircle, Clock, Play, Pause, RotateCw, Search, Download, Database, Zap } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const pipelines = [
  {
    id: 1,
    name: "Customer Analytics ETL",
    status: "running",
    progress: 78,
    recordsProcessed: 1200000,
    totalRecords: 1538000,
    startTime: "2025-10-31T08:30:00",
    eta: "4m",
    throughput: "5.2K/s",
    errorRate: "0.02%",
  },
  {
    id: 2,
    name: "Sales Data Aggregation",
    status: "completed",
    progress: 100,
    recordsProcessed: 850000,
    totalRecords: 850000,
    startTime: "2025-10-31T07:15:00",
    eta: "Completed",
    throughput: "4.8K/s",
    errorRate: "0.01%",
  },
  {
    id: 3,
    name: "User Behavior Transform",
    status: "running",
    progress: 45,
    recordsProcessed: 945000,
    totalRecords: 2100000,
    startTime: "2025-10-31T09:00:00",
    eta: "12m",
    throughput: "6.1K/s",
    errorRate: "0.03%",
  },
  {
    id: 4,
    name: "Inventory Sync Pipeline",
    status: "failed",
    progress: 23,
    recordsProcessed: 78200,
    totalRecords: 340000,
    startTime: "2025-10-31T08:45:00",
    eta: "Failed",
    throughput: "0K/s",
    errorRate: "2.45%",
  },
  {
    id: 5,
    name: "Marketing Attribution",
    status: "queued",
    progress: 0,
    recordsProcessed: 0,
    totalRecords: 1200000,
    startTime: "-",
    eta: "Queued",
    throughput: "-",
    errorRate: "-",
  },
  {
    id: 6,
    name: "Product Catalog Sync",
    status: "completed",
    progress: 100,
    recordsProcessed: 450000,
    totalRecords: 450000,
    startTime: "2025-10-31T06:00:00",
    eta: "Completed",
    throughput: "5.5K/s",
    errorRate: "0.00%",
  },
]

const performanceData = [
  { time: "00:00", throughput: 4200, errors: 5 },
  { time: "04:00", throughput: 3800, errors: 3 },
  { time: "08:00", throughput: 5200, errors: 8 },
  { time: "12:00", throughput: 6100, errors: 12 },
  { time: "16:00", throughput: 5800, errors: 7 },
  { time: "20:00", throughput: 4900, errors: 4 },
  { time: "24:00", throughput: 5400, errors: 6 },
]

export function PipelinesDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ETL Pipelines</h1>
          <p className="text-muted-foreground mt-2">Manage and monitor your data transformation pipelines</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
          <Button>
            <Play className="mr-2 h-4 w-4" />
            Run Pipeline
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Processed</p>
              <p className="text-2xl font-bold">5.2M</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="text-success">+12.5%</span> from yesterday
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-success/10">
              <Zap className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Throughput</p>
              <p className="text-2xl font-bold">5.4K/s</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="text-success">+8.2%</span> improvement
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-error/10">
              <XCircle className="h-5 w-5 text-error" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Error Rate</p>
              <p className="text-2xl font-bold">0.12%</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="text-success">-0.38%</span> reduction
          </div>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">24-Hour Performance</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={performanceData}>
            <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line type="monotone" dataKey="throughput" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Pipelines List */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-semibold">Active Pipelines</h2>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search pipelines..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="queued">Queued</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          {pipelines.map((pipeline) => (
            <div
              key={pipeline.id}
              className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{pipeline.name}</h3>
                    {pipeline.status === "running" && (
                      <Badge className="bg-primary">
                        <Play className="h-3 w-3 mr-1" />
                        Running
                      </Badge>
                    )}
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
                    {pipeline.status === "queued" && (
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        Queued
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <div>
                      <span className="block text-xs">Records</span>
                      <span className="font-medium text-foreground">
                        {(pipeline.recordsProcessed / 1000).toFixed(1)}K / {(pipeline.totalRecords / 1000).toFixed(1)}K
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs">Throughput</span>
                      <span className="font-medium text-foreground">{pipeline.throughput}</span>
                    </div>
                    <div>
                      <span className="block text-xs">Error Rate</span>
                      <span className="font-medium text-foreground">{pipeline.errorRate}</span>
                    </div>
                    <div>
                      <span className="block text-xs">ETA</span>
                      <span className="font-medium text-foreground">{pipeline.eta}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  {pipeline.status === "running" && (
                    <>
                      <Button variant="ghost" size="icon">
                        <Pause className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {pipeline.status === "failed" && (
                    <Button variant="ghost" size="icon">
                      <RotateCw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              {(pipeline.status === "running" || pipeline.status === "failed") && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{pipeline.progress}%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        pipeline.status === "failed" ? "bg-error" : "bg-primary"
                      }`}
                      style={{ width: `${pipeline.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
