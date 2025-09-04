import { motion } from 'framer-motion';
import { Satellite, TrendingUp, AlertTriangle, Droplets, Leaf, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import EthiopiaMap from '@/components/EthiopiaMap';
import QuickStats from '@/components/QuickStats';
import AlertsWidget from '@/components/AlertsWidget';
import AIInsights from '@/components/AIInsights';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Stats */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <QuickStats />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Interactive Map */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-[600px] card-gradient">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Satellite className="h-5 w-5 text-earth-blue" />
                      <span>Live Ethiopia Climate Map</span>
                    </CardTitle>
                    <CardDescription>
                      Real-time satellite data showing rainfall, vegetation, and drought conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-full p-0">
                    <EthiopiaMap />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Alerts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <AlertsWidget />
              </motion.div>

              {/* AI Insights */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <AIInsights />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-gradient-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Monitor Climate from Space</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced satellite technology helps Ethiopian farmers and researchers understand 
              changing climate patterns and make informed decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Droplets,
                title: 'Rainfall Monitoring',
                description: 'Track precipitation patterns across all Ethiopian regions using NASA TRMM and GPM satellite data.',
                color: 'earth-blue'
              },
              {
                icon: Leaf,
                title: 'Vegetation Health',
                description: 'Monitor crop and vegetation health with NDVI data from MODIS and Landsat satellites.',
                color: 'earth-green'
              },
              {
                icon: Thermometer,
                title: 'Drought Detection',
                description: 'Early warning system for drought conditions using soil moisture and temperature data.',
                color: 'warning-orange'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-elevation transition-all duration-300 card-gradient">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-full bg-${feature.color}/20 flex items-center justify-center mb-4`}>
                      <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Explore Climate Data?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Dive deeper into Ethiopia's climate patterns with our comprehensive dashboard 
              and educational resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-earth hover:shadow-glow transition-all duration-300">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  View Dashboard
                </Button>
              </Link>
              <Link to="/education">
                <Button size="lg" variant="outline" className="border-earth-blue text-earth-blue hover:bg-earth-blue/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Satellite className="h-6 w-6 text-earth-blue" />
                <span className="font-bold text-lg">Ethiopia Climate Monitor</span>
              </div>
              <p className="text-muted-foreground">
                Empowering Ethiopian agriculture through space-based climate monitoring 
                and early warning systems.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Data Sources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>NASA MODIS & Landsat</li>
                <li>TRMM & GPM Precipitation</li>
                <li>SMAP Soil Moisture</li>
                <li>ECMWF Weather Data</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Partners</h3>
              <div className="space-y-2">
                <Badge variant="outline" className="block w-fit">NASA Open Data</Badge>
                <Badge variant="outline" className="block w-fit">Ethiopia Space Science Society</Badge>
                <Badge variant="outline" className="block w-fit">USGS Earth Explorer</Badge>
              </div>
            </div>
          </div>
          <div className="border-t border-border/30 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Ethiopia Climate Monitor. Powered by NASA Open Data & Ethiopia Space Science Society.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;