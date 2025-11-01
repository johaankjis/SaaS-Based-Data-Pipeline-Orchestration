"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, Database, AlertTriangle, CheckCircle2, BarChart3, Activity } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const slowQueries = [
  {
    id: 1,
    query: "SELECT * FROM customer_analytics WHERE date >= '2025-01-01' ORDER BY revenue DESC",
    avgDuration: 4523,
    executions: 1247,
    database: "analytics_db",
    table: "customer_analytics",
    optimization: "Add index on date column",
    status: "needs-optimization",
  },
  {
    id: 2,
    query: "SELECT user_id, COUNT(*) as events FROM user_events GROUP BY user_id HAVING COUNT(*) > 100",
    avgDuration: 3821,
    executions: 892,
    database: "events_db",
    table: "user_events",
    optimization: "Partition table by date",
    status: "needs-optimization",
  },
  {
    id: 3,
    query: "UPDATE inventory SET quantity = quantity - 1 WHERE product_id IN (SELECT...)",
    avgDuration: 2145,
    executions: 2341,
    database: "inventory_db",
    table: "inventory",
    optimization: "Use batch updates",
    status: "optimized",
  },
  {
    id: 4,
    query: "SELECT p.*, c.name FROM products p JOIN categories c ON p.category_id = c.id",
    avgDuration: 1823,
    executions: 5621,
    database: "catalog_db",
    table: "products",
    optimization: "Add covering index",
    status: "optimized",
  },
]

const queryLatencyData = [
  { time: "00:00", p50: 245, p95: 1200, p99: 2800 },
  { time: "04:00", p50: 198, p95: 980, p99: 2100 },
  { time: "08:00", p50: 312, p95: 1450, p99: 3200 },
  { time: "12:00", p50: 389, p95: 1680, p99: 3800 },
  { time: "16:00", p50: 356, p95: 1520, p99: 3400 },
  { time: "20:00", p50: 278, p95: 1280, p99: 2900 },
  { time: "24:00", p50: 234, p95: 1150, p99: 2600 },
]

const queryVolumeData = [
  { hour: "00", queries: 1200 },
  { hour: "04", queries: 800 },
  { hour: "08", queries: 2400 },
  { hour: "12", queries: 3800 },
  { hour: "16", queries: 3200 },
  { hour: "20", queries: 2100 },
  { hour: "24", queries: 1500 },
]

const databaseStats = [
  {
    name: "analytics_db",
    size: "342 GB",
    queries: 12453,
    avgLatency: 342,
    connections: 45,
    status: "healthy",
  },
  {
    name: "events_db",
    size: "198 GB",
    queries: 8921,
    avgLatency: 289,
    connections: 32,
    status: "healthy",
  },
  {
    name: "inventory_db",
    size: "89 GB",
    queries: 15234,
    avgLatency: 156,
    connections: 28,
    status: "healthy",
  },
  {
    name: "catalog_db",
    size: "124 GB",
    queries: 21456,
    avgLatency: 198,
    connections: 52,
    status: "warning",
  },
]

const stats = [
  {
    label: "Avg Query Latency",
    value: "287ms",
    change: "-35%",
    icon: Zap,
    color: "text-success",
  },
  {
    label: "Queries/Second",
    value: "1.2K",
    change: "+8.5%",
    icon: Activity,
    color: "text-primary",
  },
  {
    label: "Slow Queries",
    value: "23",
    change: "-12",
    icon: AlertTriangle,
    color: "text-warning",
  },
  {
    label: "Cache Hit Rate",
    value: "94.2%",
    change: "+2.1%",
    icon: Database,
    color: "text-success",
  },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Query Performance Analytics</h1>
          <p className="text-muted-foreground mt-2">Monitor and optimize SQL query performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="24h">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <Badge
                variant="secondary"
                className={
                  stat.change.startsWith("-") && stat.label !== "Slow Queries"
                    ? "bg-error/10 text-error"
                    : "bg-success/10 text-success"
                }
              >
                {stat.change}
              </Badge>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Query Latency (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={queryLatencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} tickFormatter={(value) => `${value}ms`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="p50" stroke="hsl(var(--success))" strokeWidth={2} dot={false} name="p50" />
              <Line type="monotone" dataKey="p95" stroke="hsl(var(--warning))" strokeWidth={2} dot={false} name="p95" />
              <Line type="monotone" dataKey="p99" stroke="hsl(var(--error))" strokeWidth={2} dot={false} name="p99" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Query Volume (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={queryVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} tickFormatter={(value) => `${value / 1000}K`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="queries" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Tabs defaultValue="slow-queries" className="space-y-6">
        <TabsList>
          <TabsTrigger value="slow-queries">Slow Queries</TabsTrigger>
          <TabsTrigger value="databases">Databases</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="slow-queries" className="space-y-4">
          {slowQueries.map((query) => (
            <Card key={query.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Query #{query.id}</h3>
                    {query.status === "needs-optimization" ? (
                      <Badge className="bg-warning text-white">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Needs Optimization
                      </Badge>
                    ) : (
                      <Badge className="bg-success text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Optimized
                      </Badge>
                    )}
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs mb-4 overflow-x-auto">
                    {query.query}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Avg Duration</p>
                      <p className="font-semibold text-error">{query.avgDuration}ms</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Executions</p>
                      <p className="font-semibold">{query.executions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Database</p>
                      <p className="font-semibold">{query.database}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Table</p>
                      <p className="font-semibold">{query.table}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Optimization Suggestion</p>
                    <p className="text-sm text-muted-foreground mt-1">{query.optimization}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="databases" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Database Overview</h2>
            <div className="space-y-3">
              {databaseStats.map((db) => (
                <div
                  key={db.name}
                  className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Database className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{db.name}</h3>
                        <p className="text-sm text-muted-foreground">{db.size}</p>
                      </div>
                    </div>
                    {db.status === "healthy" ? (
                      <Badge className="bg-success text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Healthy
                      </Badge>
                    ) : (
                      <Badge className="bg-warning text-white">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Warning
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Queries/min</p>
                      <p className="font-semibold">{db.queries.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Avg Latency</p>
                      <p className="font-semibold">{db.avgLatency}ms</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Connections</p>
                      <p className="font-semibold">{db.connections}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="optimization">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Optimization Recommendations</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Add Composite Index",
                  description: "Create composite index on (date, user_id) for customer_analytics table",
                  impact: "High",
                  effort: "Low",
                  savings: "~2.1s per query",
                },
                {
                  title: "Implement Query Caching",
                  description: "Cache frequently accessed product catalog queries",
                  impact: "Medium",
                  effort: "Medium",
                  savings: "~35% latency reduction",
                },
                {
                  title: "Partition Large Tables",
                  description: "Partition user_events table by month for better performance",
                  impact: "High",
                  effort: "High",
                  savings: "~50% query time reduction",
                },
              ].map((rec, i) => (
                <div key={i} className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{rec.title}</h3>
                    <Badge className={rec.impact === "High" ? "bg-error text-white" : "bg-warning text-white"}>
                      {rec.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        Effort: <span className="text-foreground">{rec.effort}</span>
                      </span>
                      <span className="text-muted-foreground">
                        Savings: <span className="text-success font-medium">{rec.savings}</span>
                      </span>
                    </div>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
