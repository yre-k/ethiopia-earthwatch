import { motion } from 'framer-motion';
import { ArrowDown, Satellite, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import earthHero from '@/assets/earth-hero.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={earthHero} 
          alt="Earth from space showing Africa" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-space-dark/70 via-space-dark/50 to-space-dark/80"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-satellite-gold rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 0
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-earth-blue rounded-full opacity-80"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-earth-green rounded-full opacity-40"
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 2
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-card rounded-full px-6 py-3 mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Satellite className="h-5 w-5 text-satellite-gold animate-spin-slow" />
            <span className="text-sm font-medium">Live Satellite Data</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-earth-green via-earth-blue to-satellite-gold bg-clip-text text-transparent">
              Ethiopia Climate & Agriculture Monitor
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            From Space to Soil: Helping Farmers Adapt to Climate Change
          </p>
          
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Real-time satellite monitoring of rainfall, vegetation health, and drought conditions 
            across Ethiopia using NASA's advanced Earth observation systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            size="lg"
            className="bg-gradient-earth hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
          >
            <Globe className="mr-2 h-5 w-5" />
            Explore Live Data
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-earth-blue text-earth-blue hover:bg-earth-blue/10 text-lg px-8 py-6"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <p className="text-sm text-muted-foreground/60 mb-2">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-5 w-5 text-muted-foreground/60" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-5"></div>
    </section>
  );
};

export default HeroSection;