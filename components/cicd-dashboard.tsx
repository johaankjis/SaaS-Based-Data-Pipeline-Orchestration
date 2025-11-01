"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, Clock, GitBranch, GitCommit, Package, Rocket, Timer, Target } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const deployments = [
  {
    id: 1,
    environment: "production",
    status: "success",
    version: "v2.4.1",
    commit: "a3f2c1d",
    branch: "main",
    author: "johaan.k",
    timestamp: "2025-10-31T09:45:00",
    duration: "8m 32s",
    tests: { passed: 142, failed: 0 },
  },
  {
    id: 2,
    environment: "staging",
    status: "running",
    version: "v2.4.2-rc1",
    commit: "b7e9f3a",
    branch: "develop",
    author: "sarah.m",
    timestamp: "2025-10-31T10:15:00",
    duration: "3m 12s",
    tests: { passed: 98, failed: 0 },
  },
  {
    id: 3,
    environment: "production",
    status: "success",
    version: "v2.4.0",
    commit: "c9d4e2b",
    branch: "main",
    author: "mike.r",
    timestamp: "2025-10-30T14:20:00",
    duration: "9m 05s",
    tests: { passed: 142, failed: 0 },
  },
  {
    id: 4,
    environment: "staging",
    status: "failed",
    version: "v2.3.9-rc2",
    commit: "d1a5f8c",
    branch: "develop",
    author: "johaan.k",
    timestamp: "2025-10-30T11:30:00",
    duration: "2m 45s",
    tests: { passed: 135, failed: 7 },
  },
]

const buildMetrics = [
  { date: "Oct 25", success: 12, failed: 1, duration: 8.2 },
  { date: "Oct 26", success: 15, failed: 0, duration: 7.8 },
  { date: "Oct 27", success: 11, failed: 2, duration: 9.1 },
  { date: "Oct 28", success: 14, failed: 1, duration: 8.5 },
  { date: "Oct 29", success: 13, failed: 0, duration: 7.9 },
  { date: "Oct 30", success: 16, failed: 1, duration: 8.3 },
  { date: "Oct 31", success: 10, failed: 0, duration: 8.1 },
]

const stats = [
  {
    label: "Deployments Today",
    value: "12",
    change: "+3",
    icon: Rocket,
    color: "text-primary",
  },
  {
    label: "Success Rate",
    value: "96.8%",
    change: "+2.1%",
    icon: Target,
    color: "text-success",
  },
  {
    label: "Avg Build Time",
    value: "8m 12s",
    change: "-1m 23s",
    icon: Timer,
    color: "text-warning",
  },
  {
    label: "Failed Builds",
    value: "2",
    change: "-3",
    icon: XCircle,
    color: "text-error",
  },
]

const testResults = [
  {
    suite: "Unit Tests",
    passed: 1247,
    failed: 3,
    skipped: 12,
    duration: "2m 34s",
    coverage: "94.2%",
  },
  {
    suite: "Integration Tests",
    passed: 342,
    failed: 0,
    skipped: 5,
    duration: "4m 18s",
    coverage: "87.5%",
  },
  {
    suite: "E2E Tests",
    passed: 89,
    failed: 0,
    skipped: 2,
    duration: "8m 45s",
    coverage: "78.3%",
  },
]

export function CICDDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CI/CD Pipeline</h1>
          <p className="text-muted-foreground mt-2">Continuous integration and deployment monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <GitBranch className="mr-2 h-4 w-4" />
            View Branches
          </Button>
          <Button>
            <Rocket className="mr-2 h-4 w-4" />
            Deploy
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

      {/* Build Metrics Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Build Performance (7 Days)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={buildMetrics}>
            <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line type="monotone" dataKey="success" stroke="hsl(var(--success))" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="failed" stroke="hsl(var(--error))" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Tabs defaultValue="deployments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="tests">Test Results</TabsTrigger>
          <TabsTrigger value="docker">Docker Builds</TabsTrigger>
        </TabsList>

        <TabsContent value="deployments" className="space-y-4">
          {deployments.map((deployment) => (
            <Card key={deployment.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{deployment.environment}</h3>
                    {deployment.status === "success" && (
                      <Badge className="bg-success text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Success
                      </Badge>
                    )}
                    {deployment.status === "running" && (
                      <Badge className="bg-primary">
                        <Clock className="h-3 w-3 mr-1 animate-spin" />
                        Running
                      </Badge>
                    )}
                    {deployment.status === "failed" && (
                      <Badge className="bg-error text-white">
                        <XCircle className="h-3 w-3 mr-1" />
                        Failed
                      </Badge>
                    )}
                    <Badge variant="outline">{deployment.version}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Commit</p>
                      <div className="flex items-center gap-1">
                        <GitCommit className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-mono">{deployment.commit}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Branch</p>
                      <div className="flex items-center gap-1">
                        <GitBranch className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-mono">{deployment.branch}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Duration</p>
                      <span className="text-sm font-semibold">{deployment.duration}</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Tests</p>
                      <span className="text-sm font-semibold">
                        {deployment.tests.passed}/{deployment.tests.passed + deployment.tests.failed}
                      </span>
                    </div>
                  </div>

                  {/* Pipeline Steps */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-xs font-medium">Build</span>
                    </div>
                    <div className="h-0.5 w-4 bg-border" />
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-xs font-medium">Test</span>
                    </div>
                    <div className="h-0.5 w-4 bg-border" />
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                        deployment.status === "success"
                          ? "bg-success/10 border border-success/20"
                          : deployment.status === "running"
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-error/10 border border-error/20"
                      }`}
                    >
                      {deployment.status === "success" && <CheckCircle2 className="h-4 w-4 text-success" />}
                      {deployment.status === "running" && <Clock className="h-4 w-4 text-primary animate-spin" />}
                      {deployment.status === "failed" && <XCircle className="h-4 w-4 text-error" />}
                      <span className="text-xs font-medium">Deploy</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                <div>
                  Deployed by <span className="text-foreground">{deployment.author}</span>
                </div>
                <div>{new Date(deployment.timestamp).toLocaleString()}</div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Latest Test Results</h2>
            <div className="space-y-4">
              {testResults.map((suite) => (
                <div key={suite.suite} className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{suite.suite}</h3>
                    <Badge className="bg-success text-white">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Passed
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Passed</p>
                      <p className="font-semibold text-success">{suite.passed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Failed</p>
                      <p className="font-semibold text-error">{suite.failed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Skipped</p>
                      <p className="font-semibold text-muted-foreground">{suite.skipped}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Duration</p>
                      <p className="font-semibold">{suite.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Coverage</p>
                      <p className="font-semibold">{suite.coverage}</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success"
                      style={{
                        width: `${(suite.passed / (suite.passed + suite.failed + suite.skipped)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="docker">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Docker Builds</h2>
            <div className="space-y-3">
              {[
                {
                  image: "dataflow/etl-worker",
                  tag: "v2.4.1",
                  size: "342 MB",
                  status: "success",
                  pushed: "2025-10-31T09:45:00",
                },
                {
                  image: "dataflow/orchestrator",
                  tag: "v2.4.1",
                  size: "198 MB",
                  status: "success",
                  pushed: "2025-10-31T09:43:00",
                },
                {
                  image: "dataflow/api-server",
                  tag: "v2.4.1",
                  size: "256 MB",
                  status: "success",
                  pushed: "2025-10-31T09:41:00",
                },
              ].map((build, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-sm font-medium">
                        {build.image}:{build.tag}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {build.size} • Pushed {new Date(build.pushed).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-success text-white">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Built
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
