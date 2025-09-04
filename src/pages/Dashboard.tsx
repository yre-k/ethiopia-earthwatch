import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Sample data for charts
const rainfallData = [
  { month: 'Jan', rainfall: 45, temperature: 22 },
  { month: 'Feb', rainfall: 52, temperature: 24 },
  { month: 'Mar', rainfall: 48, temperature: 26 },
  { month: 'Apr', rainfall: 61, temperature: 25 },
  { month: 'May', rainfall: 55, temperature: 23 },
  { month: 'Jun', rainfall: 67, temperature: 21 },
  { month: 'Jul', rainfall: 43, temperature: 20 },
  { month: 'Aug', rainfall: 39, temperature: 22 },
  { month: 'Sep', rainfall: 42, temperature: 24 },
  { month: 'Oct', rainfall: 58, temperature: 25 },
  { month: 'Nov', rainfall: 52, temperature: 23 },
  { month: 'Dec', rainfall: 49, temperature: 22 }
];

const ndviData = [
  { month: 'Jan', ndvi: 0.65 },
  { month: 'Feb', ndvi: 0.72 },
  { month: 'Mar', ndvi: 0.68 },
  { month: 'Apr', ndvi: 0.74 },
  { month: 'May', ndvi: 0.69 },
  { month: 'Jun', ndvi: 0.71 },
  { month: 'Jul', ndvi: 0.58 },
  { month: 'Aug', ndvi: 0.52 },
  { month: 'Sep', ndvi: 0.61 },
  { month: 'Oct', ndvi: 0.67 },
  { month: 'Nov', ndvi: 0.63 },
  { month: 'Dec', ndvi: 0.66 }
];

const regionData = [
  { name: 'Oromia', value: 35, color: '#22c55e' },
  { name: 'Amhara', value: 28, color: '#3b82f6' },
  { name: 'SNNP', value: 18, color: '#f59e0b' },
  { name: 'Tigray', value: 12, color: '#ef4444' },
  { name: 'Others', value: 7, color: '#6b7280' }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Climate Dashboard</h1>
              <p className="text-muted-foreground">
                Comprehensive analysis of Ethiopia's climate patterns and agricultural data
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 Days
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Charts Section */}
        <Tabs defaultValue="rainfall" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rainfall">Rainfall & Temperature</TabsTrigger>
            <TabsTrigger value="vegetation">Vegetation Health</TabsTrigger>
            <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="rainfall" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Rainfall Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="card-gradient">
                  <CardHeader>
                    <CardTitle>Monthly Rainfall</CardTitle>
                    <CardDescription>Precipitation levels across Ethiopia</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={rainfallData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="rainfall" 
                          stroke="hsl(var(--earth-blue))" 
                          fill="hsl(var(--earth-blue))" 
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Temperature Chart */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="card-gradient">
                  <CardHeader>
                    <CardTitle>Average Temperature</CardTitle>
                    <CardDescription>Monthly temperature trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={rainfallData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="temperature" 
                          stroke="hsl(var(--warning-orange))" 
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--warning-orange))' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="vegetation" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Vegetation Health Index (NDVI)</CardTitle>
                  <CardDescription>Normalized Difference Vegetation Index trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={ndviData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 1]} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="ndvi" 
                        stroke="hsl(var(--earth-green))" 
                        fill="hsl(var(--earth-green))" 
                        fillOpacity={0.4}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Regional Distribution */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="card-gradient">
                  <CardHeader>
                    <CardTitle>Regional Climate Risk</CardTitle>
                    <CardDescription>Distribution of climate vulnerability</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={regionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {regionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Regional Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="card-gradient">
                  <CardHeader>
                    <CardTitle>Regional Statistics</CardTitle>
                    <CardDescription>Climate metrics by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {regionData.map((region, index) => (
                        <div key={region.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: region.color }}
                            />
                            <span className="font-medium">{region.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{region.value}%</div>
                            <div className="text-xs text-muted-foreground">risk level</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-satellite-gold" />
                <span>Key Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-earth-blue mb-2">68mm</div>
                  <div className="text-sm text-muted-foreground">Average Monthly Rainfall</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-earth-green mb-2">0.65</div>
                  <div className="text-sm text-muted-foreground">National NDVI Average</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning-orange mb-2">23.2°C</div>
                  <div className="text-sm text-muted-foreground">Average Temperature</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;