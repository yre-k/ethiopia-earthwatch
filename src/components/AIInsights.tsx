import { Brain, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const insights = [
  {
    id: 1,
    type: 'trend',
    icon: TrendingDown,
    title: 'Rainfall Decline Detected',
    description: 'Oromia region showing 23% decrease in precipitation compared to 10-year average. Early intervention recommended.',
    confidence: 87,
    color: 'warning-orange'
  },
  {
    id: 2,
    type: 'prediction',
    icon: TrendingUp,
    title: 'Vegetation Recovery Expected',
    description: 'MODIS data suggests vegetation health improvement in SNNP region within next 4-6 weeks based on recent rainfall patterns.',
    confidence: 72,
    color: 'earth-green'
  },
  {
    id: 3,
    type: 'alert',
    icon: AlertCircle,
    title: 'Drought Risk Assessment',
    description: 'Combined soil moisture and temperature analysis indicates elevated drought risk for Somali and Afar regions through Q2 2024.',
    confidence: 91,
    color: 'destructive'
  }
];

const AIInsights = () => {
  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-satellite-gold" />
          <span>AI Climate Insights</span>
        </CardTitle>
        <CardDescription>
          Machine learning analysis of satellite data trends
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-${insight.color}/20 flex-shrink-0`}>
                <insight.icon className={`h-4 w-4 text-${insight.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium">
                    {insight.title}
                  </h4>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
            
            {/* Confidence Bar */}
            <div className="ml-11">
              <div className="w-full bg-muted/30 rounded-full h-1.5">
                <motion.div 
                  className={`h-1.5 rounded-full bg-${insight.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${insight.confidence}%` }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                />
              </div>
            </div>
            
            {index < insights.length - 1 && (
              <div className="border-b border-border/30 pb-4"></div>
            )}
          </motion.div>
        ))}
        
        <div className="pt-2 border-t border-border/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Powered by NASA Earth Data</span>
            <span>Updated 15 min ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;