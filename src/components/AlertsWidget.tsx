import { AlertTriangle, Droplets, Thermometer, Wind } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const alerts = [
  {
    id: 1,
    type: 'drought',
    severity: 'high',
    region: 'Somali Region',
    title: 'Severe Drought Warning',
    description: 'Rainfall 65% below normal for 3 consecutive months',
    icon: Thermometer,
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'rainfall',
    severity: 'medium',
    region: 'Tigray',
    title: 'Low Precipitation Alert',
    description: 'Monthly rainfall deficit reaching critical levels',
    icon: Droplets,
    time: '6 hours ago'
  },
  {
    id: 3,
    type: 'vegetation',
    severity: 'medium',
    region: 'Oromia (East)',
    title: 'Vegetation Stress Detected',
    description: 'NDVI values showing crop stress indicators',
    icon: AlertTriangle,
    time: '1 day ago'
  },
  {
    id: 4,
    type: 'weather',
    severity: 'low',
    region: 'Amhara',
    title: 'High Temperature Advisory',
    description: 'Temperatures 3°C above seasonal average',
    icon: Wind,
    time: '2 days ago'
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'warning-orange';
    case 'low':
      return 'earth-blue';
    default:
      return 'muted';
  }
};

const getSeverityLabel = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'Critical';
    case 'medium':
      return 'Warning';
    case 'low':
      return 'Advisory';
    default:
      return 'Unknown';
  }
};

const AlertsWidget = () => {
  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-warning-orange" />
          <span>Climate Alerts</span>
        </CardTitle>
        <CardDescription>
          Recent warnings and advisories for Ethiopian regions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors duration-200"
          >
            <div className={`p-2 rounded-full bg-${getSeverityColor(alert.severity)}/20 flex-shrink-0`}>
              <alert.icon className={`h-4 w-4 text-${getSeverityColor(alert.severity)}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h4 className="text-sm font-medium truncate pr-2">
                  {alert.title}
                </h4>
                <Badge 
                  variant="outline" 
                  className={`text-xs border-${getSeverityColor(alert.severity)} text-${getSeverityColor(alert.severity)} flex-shrink-0`}
                >
                  {getSeverityLabel(alert.severity)}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">
                {alert.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium">{alert.region}</span>
                <span>{alert.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
        
        <div className="pt-2 border-t border-border/30">
          <p className="text-xs text-center text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsWidget;