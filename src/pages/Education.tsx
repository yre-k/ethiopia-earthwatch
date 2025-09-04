import { motion } from 'framer-motion';
import { BookOpen, Satellite, Globe, Zap, Users, Target, Download, FileText, Share, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import satelliteImage from '@/assets/satellite.jpg';
import ethiopiaAgricultureImage from '@/assets/ethiopia-agriculture.jpg';
import LearningModule from '@/components/LearningModule';
import { useToast } from '@/hooks/use-toast';

const topics = [
  {
    id: 1,
    title: 'How Satellites Monitor Climate',
    description: 'Learn about the technology behind space-based Earth observation and how satellites collect climate data.',
    icon: Satellite,
    color: 'earth-blue',
    lessons: ['Satellite Basics', 'Data Collection', 'Signal Processing', 'Ground Stations']
  },
  {
    id: 2,
    title: 'Understanding NDVI',
    description: 'Discover how vegetation indices help monitor crop health and agricultural productivity.',
    icon: Globe,
    color: 'earth-green',
    lessons: ['What is NDVI', 'Calculating Health', 'Seasonal Changes', 'Application in Agriculture']
  },
  {
    id: 3,
    title: 'Climate Change Impacts',
    description: 'Explore how changing climate patterns affect Ethiopian agriculture and communities.',
    icon: Zap,
    color: 'warning-orange',
    lessons: ['Temperature Trends', 'Rainfall Patterns', 'Drought Cycles', 'Adaptation Strategies']
  },
  {
    id: 4,
    title: 'Early Warning Systems',
    description: 'Understand how satellite data helps predict and prepare for climate-related disasters.',
    icon: Target,
    color: 'destructive',
    lessons: ['Alert Mechanisms', 'Risk Assessment', 'Community Response', 'Success Stories']
  }
];

const statistics = [
  { label: 'Satellites Monitoring Earth', value: '2,000+', icon: Satellite },
  { label: 'Years of Climate Data', value: '40+', icon: BookOpen },
  { label: 'Ethiopian Farmers Benefiting', value: '12M+', icon: Users },
  { label: 'Accuracy of Predictions', value: '85%+', icon: Target }
];

const Education = () => {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const { toast } = useToast();

  const handleStartLearning = (topicId: number) => {
    setActiveModule(topicId);
    toast({
      title: "Module Started! 🚀",
      description: "Get ready for an amazing journey through space and climate science!",
    });
  };

  const handleDownloadResource = (resourceName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${resourceName}...`,
    });
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download Complete! ✅",
        description: `${resourceName} has been saved to your device.`,
      });
    }, 2000);
  };

  const handleShareContent = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied! 📋",
      description: "Share this educational content with others!",
    });
  };

  if (activeModule) {
    return (
      <LearningModule
        topicId={activeModule}
        onClose={() => setActiveModule(null)}
      />
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            Learn About Climate Monitoring
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how NASA satellites help Ethiopian farmers and researchers understand 
            and adapt to changing climate patterns through advanced Earth observation technology.
          </p>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Card className="overflow-hidden card-gradient">
            <div className="relative h-64 md:h-96">
              <img 
                src={satelliteImage} 
                alt="Satellite monitoring Earth"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Space Technology for Earth's Future
                </h2>
                <p className="text-muted-foreground">
                  Advanced satellites continuously monitor Ethiopia's climate patterns, 
                  providing crucial data for agricultural planning and disaster preparedness.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <Card key={stat.label} className="text-center card-gradient">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-primary/20">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Learning Topics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Learning Topics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-elevation transition-all duration-300 card-gradient">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-full bg-${topic.color}/20 mb-4`}>
                        <topic.icon className={`h-6 w-6 text-${topic.color}`} />
                      </div>
                      <Badge variant="outline">4 Lessons</Badge>
                    </div>
                    <CardTitle>{topic.title}</CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-6">
                      {topic.lessons.map((lesson, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                          <span className="text-sm text-muted-foreground">{lesson}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full" variant="outline" onClick={() => handleStartLearning(topic.id)}>
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Additional Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-gradient hover:shadow-elevation transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-earth-blue" />
                  <div>
                    <CardTitle className="text-lg">Technical Reports</CardTitle>
                    <CardDescription>Detailed climate analysis documents</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleDownloadResource("Ethiopia Climate Assessment 2024")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Climate Assessment 2024
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleDownloadResource("Satellite Data Guide")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Satellite Data Guide
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleDownloadResource("Farmer's NDVI Handbook")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Farmer's NDVI Handbook
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient hover:shadow-elevation transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <ExternalLink className="h-8 w-8 text-earth-green" />
                  <div>
                    <CardTitle className="text-lg">External Links</CardTitle>
                    <CardDescription>Explore NASA and partner resources</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open('https://earthdata.nasa.gov', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    NASA Earthdata
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open('https://modis.gsfc.nasa.gov', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    MODIS Web
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open('https://landsat.gsfc.nasa.gov', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Landsat Program
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient hover:shadow-elevation transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Share className="h-8 w-8 text-satellite-gold" />
                  <div>
                    <CardTitle className="text-lg">Share & Connect</CardTitle>
                    <CardDescription>Spread climate awareness</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleShareContent}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share This Page
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => toast({
                      title: "Newsletter Subscription",
                      description: "Stay updated with latest climate insights!",
                    })}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Join Newsletter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <Card className="card-gradient">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">How Satellite Monitoring Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Data Collection</h4>
                      <p className="text-sm text-muted-foreground">
                        Satellites equipped with advanced sensors collect data on rainfall, 
                        temperature, and vegetation across Ethiopia.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Data Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        Raw satellite data is processed using AI and machine learning 
                        to identify patterns and trends.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Insights & Alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        Processed data generates actionable insights and early warnings 
                        for farmers and government agencies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={ethiopiaAgricultureImage} 
                  alt="Ethiopian agriculture"
                  className="w-full h-full object-cover rounded-r-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-dark/60 to-transparent rounded-r-lg"></div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="card-gradient p-8">
            <h3 className="text-2xl font-bold mb-4">Real-World Impact</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Satellite-based climate monitoring has helped Ethiopian farmers increase crop yields by 25% 
              and reduce drought-related losses by 40% through early warning systems and adaptive farming practices.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-earth-green mb-2">25%</div>
                <div className="text-sm text-muted-foreground">Increased Crop Yields</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-earth-blue mb-2">40%</div>
                <div className="text-sm text-muted-foreground">Reduced Drought Losses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-satellite-gold mb-2">12M+</div>
                <div className="text-sm text-muted-foreground">Farmers Supported</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;