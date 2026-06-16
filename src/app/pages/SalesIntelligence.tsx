import { Brain, TrendingUp, TrendingDown, Minus, DollarSign, ShoppingCart, Award, BarChart3, Clock, AlertTriangle, Target, Lightbulb, ArrowUpRight, ArrowDownRight, Minus as MinusIcon } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

/* ------------------------------------------------------------------ */
/*  Seed Data — POS Transaction Data                                   */
/* ------------------------------------------------------------------ */

const summaryStats = [
  { name: "Total Revenue", value: "₱124.5K", change: "+12.3%", trend: "up" as const, icon: DollarSign },
  { name: "Avg. Order Value", value: "₱285", change: "+5.7%", trend: "up" as const, icon: ShoppingCart },
  { name: "Top Product", value: "Caramel Latte", change: "847 sold", trend: "up" as const, icon: Award },
  { name: "Revenue Growth", value: "+12.3%", change: "vs last month", trend: "up" as const, icon: TrendingUp },
];

const hourlySales = [
  { hour: "6 AM", revenue: 2800, orders: 12 },
  { hour: "7 AM", revenue: 5200, orders: 24 },
  { hour: "8 AM", revenue: 8900, orders: 38 },
  { hour: "9 AM", revenue: 12400, orders: 52 },
  { hour: "10 AM", revenue: 10200, orders: 44 },
  { hour: "11 AM", revenue: 14800, orders: 62 },
  { hour: "12 PM", revenue: 16500, orders: 71 },
  { hour: "1 PM", revenue: 13200, orders: 56 },
  { hour: "2 PM", revenue: 9800, orders: 42 },
  { hour: "3 PM", revenue: 8400, orders: 36 },
  { hour: "4 PM", revenue: 7200, orders: 30 },
  { hour: "5 PM", revenue: 9600, orders: 41 },
  { hour: "6 PM", revenue: 11800, orders: 50 },
  { hour: "7 PM", revenue: 8200, orders: 35 },
  { hour: "8 PM", revenue: 5400, orders: 23 },
  { hour: "9 PM", revenue: 2600, orders: 11 },
];

const dailySales = [
  { day: "Mon", revenue: 14200, orders: 60 },
  { day: "Tue", revenue: 13800, orders: 58 },
  { day: "Wed", revenue: 15100, orders: 64 },
  { day: "Thu", revenue: 14600, orders: 62 },
  { day: "Fri", revenue: 18200, orders: 78 },
  { day: "Sat", revenue: 22400, orders: 96 },
  { day: "Sun", revenue: 19800, orders: 84 },
];

const productPerformance = [
  { rank: 1, name: "Caramel Latte", revenue: 32400, sold: 847, trend: "up" as const, trendValue: "+18%", peakHour: "12 PM", category: "Coffee" },
  { rank: 2, name: "Iced Americano", revenue: 28100, sold: 712, trend: "up" as const, trendValue: "+12%", peakHour: "11 AM", category: "Coffee" },
  { rank: 3, name: "Matcha Latte", revenue: 22300, sold: 534, trend: "neutral" as const, trendValue: "+2%", peakHour: "3 PM", category: "Tea" },
  { rank: 4, name: "Espresso Shot", revenue: 15200, sold: 489, trend: "down" as const, trendValue: "-5%", peakHour: "8 AM", category: "Coffee" },
  { rank: 5, name: "Frappuccino", revenue: 12100, sold: 301, trend: "down" as const, trendValue: "-18%", peakHour: "2 PM", category: "Blended" },
  { rank: 6, name: "Croissant", revenue: 8200, sold: 412, trend: "up" as const, trendValue: "+8%", peakHour: "9 AM", category: "Pastry" },
  { rank: 7, name: "Blueberry Muffin", revenue: 4100, sold: 205, trend: "neutral" as const, trendValue: "+1%", peakHour: "10 AM", category: "Pastry" },
];

const forecastData = [
  { week: "Week 1", actual: 31200, predicted: 31800 },
  { week: "Week 2", actual: 33400, predicted: 33100 },
  { week: "Week 3", actual: 35800, predicted: 34900 },
  { week: "Week 4", actual: 0, predicted: 36200 },
  { week: "Week 5", actual: 0, predicted: 37800 },
  { week: "Week 6", actual: 0, predicted: 38500 },
  { week: "Week 7", actual: 0, predicted: 39200 },
  { week: "Week 8", actual: 0, predicted: 40100 },
];

const aiRecommendations = [
  {
    type: "peak",
    icon: "🔥",
    title: "Peak Opportunity",
    product: "Caramel Latte",
    insight: "Caramel Latte sells 3x more during lunch hours (11 AM - 1 PM) compared to other times. This pattern has been consistent for 6 consecutive weeks.",
    actions: [
      "Create a 'Lunch Combo' bundle: Caramel Latte + Croissant for ₱249",
      "Increase inventory by 25% for the 11 AM - 1 PM window",
      "Run targeted Instagram/Facebook ads from 10 AM - 11 AM to capture lunch crowds",
    ],
    confidence: 94,
    impact: "+₱8.2K/mo",
    color: "border-emerald-300 bg-emerald-50/50",
    accentColor: "text-emerald-700",
  },
  {
    type: "declining",
    icon: "⚠️",
    title: "Declining Product",
    product: "Frappuccino",
    insight: "Frappuccino sales have declined 18% over the past month. The drop is most significant on weekdays, suggesting customers may be shifting to hot beverages.",
    actions: [
      "Launch a 'Buy 1 Get 1 Free' Frappuccino promo for weekday afternoons",
      "Bundle with a pastry for a ₱199 'Sweet Afternoon Deal'",
      "Reposition as a 'Weekend Exclusive' if weekday sales don't recover",
    ],
    confidence: 87,
    impact: "+₱3.5K/mo",
    color: "border-amber-300 bg-amber-50/50",
    accentColor: "text-amber-700",
  },
  {
    type: "forecast",
    icon: "📈",
    title: "Demand Forecast",
    product: "Weekend Sales",
    insight: "Weekend revenue is expected to increase 22% over the next 4 weeks based on seasonal trends and historical Saturday/Sunday performance patterns.",
    actions: [
      "Stock up on top 3 selling products (Caramel Latte, Iced Americano, Matcha Latte)",
      "Schedule extra barista staff for Saturday and Sunday shifts",
      "Prepare weekend-exclusive menu items to capitalize on higher foot traffic",
    ],
    confidence: 82,
    impact: "+₱12.1K/mo",
    color: "border-blue-300 bg-blue-50/50",
    accentColor: "text-blue-700",
  },
  {
    type: "upsell",
    icon: "💡",
    title: "Upsell Opportunity",
    product: "Espresso Shot",
    insight: "42% of Espresso Shot buyers also purchase a pastry. This presents an opportunity to increase average order value through targeted bundling.",
    actions: [
      "Train baristas to suggest adding a pastry: 'Would you like a croissant with that?'",
      "Create an 'Espresso + Pastry' combo at a 15% discount",
      "Add a 'Customers also bought' prompt at the POS terminal",
    ],
    confidence: 79,
    impact: "+₱2.8K/mo",
    color: "border-purple-300 bg-purple-50/50",
    accentColor: "text-purple-700",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SalesIntelligence() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Sales Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-0.5">AI-powered analysis of your POS transaction data</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary text-xs font-medium">
          <Brain className="w-4 h-4" />
          AI Engine Active
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-card rounded-xl border border-border p-5 hover:shadow-[0_6px_20px_rgba(11,27,58,0.08)] hover:border-primary/20 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-primary flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row: Hourly + Daily Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Time of Day */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <Clock className="w-4 h-4 text-secondary" />
            <h3 className="text-base font-semibold text-foreground">Sales by Time of Day</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={hourlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="hour" stroke="var(--color-muted-foreground)" tick={{ fontSize: 10 }} interval={1} />
              <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.5rem",
                  fontSize: "0.8rem",
                }}
                formatter={(value: number) => [`₱${value.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                {hourlySales.map((entry, index) => (
                  <Cell key={index} fill={entry.revenue >= 14000 ? "var(--color-chart-1)" : entry.revenue >= 9000 ? "var(--color-chart-2)" : "var(--color-muted)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-3 text-center">Peak hours: 11 AM - 1 PM (highlighted in blue)</p>
        </div>

        {/* Sales by Day of Week */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-4 h-4 text-secondary" />
            <h3 className="text-base font-semibold text-foreground">Sales by Day of Week</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
              <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.5rem",
                  fontSize: "0.8rem",
                }}
                formatter={(value: number) => [`₱${value.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                {dailySales.map((entry, index) => (
                  <Cell key={index} fill={index >= 5 ? "var(--color-chart-1)" : "var(--color-chart-2)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-3 text-center">Weekend days (Sat-Sun) shown in blue — highest revenue</p>
        </div>
      </div>

      {/* Product Performance Rankings */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary" />
            <h3 className="text-base font-semibold text-foreground">Product Performance Rankings</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Based on total revenue and transaction volume this month</p>
        </div>
        <div className="divide-y divide-border/50">
          {productPerformance.map((product) => (
            <div key={product.rank} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${product.rank <= 3 ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"}`}>
                #{product.rank}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{product.name}</p>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">{product.category}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Peak: {product.peakHour} · {product.sold} sold</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-foreground">₱{product.revenue.toLocaleString()}</p>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  {product.trend === "up" ? (
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                      <TrendingUp className="w-3 h-3" /> {product.trendValue}
                    </span>
                  ) : product.trend === "down" ? (
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-red-500">
                      <TrendingDown className="w-3 h-3" /> {product.trendValue}
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-muted-foreground">
                      <Minus className="w-3 h-3" /> {product.trendValue}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-secondary" />
            <h3 className="text-base font-semibold text-foreground">AI Recommendations</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Data-driven suggestions to optimize sales and inventory</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {aiRecommendations.map((rec, index) => (
            <div key={index} className={`rounded-xl border p-5 transition-all hover:shadow-md ${rec.color}`}>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-xl">{rec.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-semibold ${rec.accentColor}`}>{rec.title}</h4>
                    <span className="text-[10px] font-bold text-muted-foreground bg-white/80 px-2 py-0.5 rounded-full border border-border/50">
                      {rec.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">{rec.product}</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{rec.insight}</p>

              <div className="space-y-1.5 mb-3">
                {rec.actions.map((action, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-white/80 border border-border/50 flex items-center justify-center text-[10px] font-bold text-muted-foreground flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-xs text-foreground/80">{action}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/30">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Estimated Impact</span>
                <span className={`text-sm font-bold ${rec.accentColor}`}>{rec.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demand Forecast */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <h3 className="text-base font-semibold text-foreground">Demand Forecast — Next 8 Weeks</h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Based on 8 weeks of historical transaction data</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-chart-1" /> Actual</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-chart-4" /> Predicted</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="week" stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
            <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
              }}
              formatter={(value: number) => [`₱${value.toLocaleString()}`, ""]}
            />
            <Line name="Actual" type="monotone" dataKey="actual" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--color-chart-1)" }} connectNulls={false} />
            <Line name="Predicted" type="monotone" dataKey="predicted" stroke="var(--color-chart-4)" strokeWidth={2.5} strokeDasharray="6 3" dot={{ r: 4, fill: "var(--color-chart-4)" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}