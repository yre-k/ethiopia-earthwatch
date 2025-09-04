import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Droplets, Leaf, Thermometer, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const stats = [
  {
    title: 'National Rainfall',
    value: '68mm',
    change: '+12%',
    trend: 'up',
    icon: Droplets,
    color: 'earth-blue',
    description: 'vs last month'
  },
  {
    title: 'Vegetation Health',
    value: '0.62',
    change: '-8%',
    trend: 'down',
    icon: Leaf,
    color: 'earth-green',
    description: 'NDVI average'
  },
  {
    title: 'Temperature',
    value: '24.5°C',
    change: '+2.1°C',
    trend: 'up',
    icon: Thermometer,
    color: 'warning-orange',
    description: 'vs seasonal avg'
  },
  {
    title: 'Active Alerts',
    value: '7',
    change: '+3',
    trend: 'up',
    icon: Zap,
    color: 'destructive',
    description: 'drought warnings'
  }
];

const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden card-gradient hover:shadow-elevation transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`p-2 rounded-lg bg-${stat.color}/20`}>
                      <stat.icon className={`h-4 w-4 text-${stat.color}`} />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={stat.trend === 'up' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {stat.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {stat.change}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {stat.description}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Background Gradient */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-${stat.color}/10 to-transparent rounded-full -translate-y-10 translate-x-10`}></div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickStats;