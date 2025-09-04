import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Play, 
  Pause,
  BookOpen,
  Satellite,
  Globe,
  Zap,
  Target,
  Award,
  Clock,
  Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: {
    story: string;
    keyPoints: string[];
    interactiveElement?: string;
    funFact: string;
  };
}

interface LearningModuleProps {
  topicId: number;
  onClose: () => void;
}

const moduleData = {
  1: {
    title: 'How Satellites Monitor Climate',
    icon: Satellite,
    color: 'earth-blue',
    totalDuration: '45 min',
    description: 'Journey through space to understand how satellites become our eyes in the sky',
    lessons: [
      {
        id: '1-1',
        title: 'The Birth of Earth Observation',
        duration: '12 min',
        content: {
          story: `Imagine standing 400 miles above Earth, floating in the International Space Station. You look down and see the entire Horn of Africa spread beneath you like a living map. The Nile River winds through the landscape like a silver thread, while clouds swirl over the Ethiopian Highlands. This is exactly what our satellites experience every 90 minutes as they orbit our planet.

The story begins in 1972 when NASA launched Landsat 1, the first satellite dedicated to studying Earth's land surfaces. Ethiopian farmers were struggling with unpredictable weather patterns, just as they are today. But now, from space, we could finally see the bigger picture.

Picture this: A satellite the size of a school bus, equipped with sensors more sensitive than human eyes, passes over Ethiopia at exactly 10:30 AM local time every day. As it glides silently through space, its instruments measure invisible radiation bouncing off crops, forests, and bare soil. It's like having a doctor take Earth's temperature and pulse from space.`,
          keyPoints: [
            'Satellites orbit Earth every 90-120 minutes at altitudes of 400-800 km',
            'They use electromagnetic spectrum beyond human vision to see climate patterns',
            'Landsat program has been monitoring Earth continuously since 1972',
            'Ethiopian agriculture benefits from daily satellite observations'
          ],
          funFact: 'A single satellite image can cover an area larger than the entire country of Ethiopia in just one photograph!'
        }
      },
      {
        id: '1-2',
        title: 'The Magic of Invisible Light',
        duration: '15 min',
        content: {
          story: `Close your eyes and imagine you could see like a satellite. Suddenly, the world transforms into a kaleidoscope of colors invisible to the naked eye. Healthy crops glow bright red in infrared light, while stressed vegetation appears dim. Water bodies turn deep black, and clouds become brilliant white pillows floating above the landscape.

This is the secret superpower of satellites - they see in wavelengths of light that our eyes cannot detect. When sunlight hits a coffee plant in the Ethiopian highlands, the chlorophyll in its leaves absorbs blue and red light for photosynthesis, but reflects near-infrared light like a mirror. Satellites detect this reflected light and translate it into data that tells us whether the plant is healthy, stressed, or dying.

Think of it like having X-ray vision for agriculture. Ethiopian farmers might see green fields, but satellites can detect which plants are already struggling with drought stress days or even weeks before visible symptoms appear.`,
          keyPoints: [
            'Satellites detect light across electromagnetic spectrum (visible, infrared, microwave)',
            'Healthy vegetation reflects strongly in near-infrared wavelengths',
            'Different materials have unique "spectral signatures" like fingerprints',
            'Early stress detection helps farmers take preventive action'
          ],
          funFact: 'Satellites can detect plant stress up to 2 weeks before farmers can see it with their naked eyes!'
        }
      },
      {
        id: '1-3',
        title: 'Data Processing: From Space to Smartphones',
        duration: '10 min',
        content: {
          story: `Every day, satellites orbiting above Ethiopia capture enough data to fill 2,000 smartphones. But raw satellite data looks nothing like the colorful maps you see on your phone. It's more like a massive spreadsheet of numbers - millions of brightness values for different colors of light.

Here's where the magic happens: Deep in NASA's data centers, supercomputers work around the clock transforming these numbers into meaningful information. Artificial intelligence algorithms, trained on decades of agricultural data, analyze patterns and create the beautiful, useful maps that help Ethiopian farmers make decisions.

It's like having a team of thousands of agricultural experts working 24/7 to translate the whispers of light from space into actionable wisdom for farmers on the ground. Within hours of a satellite passing over an Ethiopian farm, that data can be processed, analyzed, and delivered to a farmer's mobile phone as a simple message: "Your northern field shows early signs of drought stress."`,
          keyPoints: [
            'Raw satellite data requires complex processing to become useful information',
            'AI and machine learning algorithms identify patterns in massive datasets',
            'Ground stations worldwide receive and relay satellite data',
            'Real-time processing enables same-day delivery of insights to farmers'
          ],
          funFact: 'NASA processes over 20 terabytes of Earth observation data every single day - enough to fill 4,000 DVDs!'
        }
      },
      {
        id: '1-4',
        title: 'Ground Stations: Earth\'s Satellite Catchers',
        duration: '8 min',
        content: {
          story: `Scattered across the globe like giant satellite dishes pointed skyward, ground stations are Earth's way of catching the whispers from space. When a satellite passes overhead traveling at 17,500 miles per hour, it has only a few precious minutes to download all the data it has collected.

Imagine a relay race where the baton is invisible data traveling at the speed of light. As satellites zip across the sky, they beam their precious cargo of Ethiopian climate data down to these Earth-based antennas. In those brief moments of contact, terabytes of information flow from space to Earth faster than you can blink.

The closest ground station to Ethiopia receives data from satellites several times each day. This data then travels through fiber optic cables to processing centers where it begins its transformation from raw numbers into the climate monitoring tools that help Ethiopian farmers adapt to changing weather patterns.`,
          keyPoints: [
            'Ground stations worldwide track and communicate with satellites',
            'Data transmission windows are brief as satellites move quickly across sky',
            'Fiber optic networks distribute satellite data globally within hours',
            'Multiple backup systems ensure continuous data availability'
          ],
          funFact: 'Ground stations can track satellites traveling 10 times faster than a speeding bullet!'
        }
      }
    ]
  },
  2: {
    title: 'Understanding NDVI',
    icon: Globe,
    color: 'earth-green',
    totalDuration: '40 min',
    description: 'Discover how we measure the pulse of vegetation from space',
    lessons: [
      {
        id: '2-1',
        title: 'The Heartbeat of Plants',
        duration: '12 min',
        content: {
          story: `Every plant on Earth has a heartbeat - not the kind you can hear with a stethoscope, but a rhythm of light that satellites can detect from space. This heartbeat is called NDVI: the Normalized Difference Vegetation Index.

Picture a coffee plant in the Ethiopian highlands at sunrise. As the first rays of sunlight touch its leaves, something magical happens. The chlorophyll inside the leaves springs into action, absorbing red light to power photosynthesis while simultaneously reflecting near-infrared light like tiny green mirrors.

When a satellite passes overhead, it measures this dance of light absorption and reflection. Healthy, vigorous plants reflect lots of near-infrared light and absorb lots of red light, creating a strong NDVI signal. It's like taking the plant's pulse from 400 miles in space - a strong pulse means healthy vegetation, while a weak pulse indicates stress or poor health.

For Ethiopian farmers, NDVI is like having a doctor for their crops that never sleeps, constantly monitoring the health of every field from space.`,
          keyPoints: [
            'NDVI measures the difference between near-infrared and red light reflection',
            'Healthy vegetation has high NDVI values (0.6-0.9)',
            'Stressed or sparse vegetation shows low NDVI values (0.1-0.4)',
            'NDVI can detect plant health changes before visible symptoms appear'
          ],
          funFact: 'A single NDVI image can monitor the health of millions of plants simultaneously!'
        }
      },
      {
        id: '2-2',
        title: 'Calculating Plant Health from Space',
        duration: '15 min',
        content: {
          story: `Imagine you're a detective trying to solve the mystery of crop health using only clues of light. Your evidence comes from space in the form of two crucial measurements: how much red light and how much near-infrared light bounces back from Ethiopian farmland.

The formula is beautifully simple: NDVI = (Near Infrared - Red) / (Near Infrared + Red). But the story behind this equation is profound. When Ethiopian teff crops are thriving after good rains, they absorb lots of red light for photosynthesis but reflect abundant near-infrared light. This creates a high NDVI value, like a strong vital sign.

But when drought strikes, the stressed plants can't perform photosynthesis efficiently. They reflect more red light and less near-infrared light, causing NDVI values to drop like a patient's weakening pulse. Satellite scientists watching these NDVI patterns from space can spot drought stress spreading across Ethiopian farmland like ripples in a pond.

It's remarkable: a simple mathematical formula allows us to take the pulse of an entire continent's vegetation from hundreds of miles above Earth.`,
          keyPoints: [
            'NDVI formula: (NIR - Red) / (NIR + Red) ranges from -1 to +1',
            'Dense, healthy vegetation typically shows NDVI values of 0.6-0.8',
            'Bare soil and rock show NDVI values near zero',
            'Water bodies have negative NDVI values due to light absorption'
          ],
          funFact: 'The NDVI formula was developed in 1973 and is still the most widely used vegetation index in the world!'
        }
      },
      {
        id: '2-3',
        title: 'Seasonal Rhythms and Climate Patterns',
        duration: '8 min',
        content: {
          story: `Ethiopia's landscape breathes with the rhythm of the seasons, and NDVI captures every breath from space. During the dry season, vast areas show low NDVI values - browns and yellows indicating dormant or stressed vegetation. But as the rains arrive, the landscape transforms like time-lapse photography, with NDVI values climbing as green spreads across the countryside.

This seasonal dance tells the story of Ethiopian agriculture. In the highlands, NDVI peaks during the main rainy season (June-September) when coffee plants and cereals flourish. In the lowlands, the pattern shifts with the shorter rains, creating a complex mosaic of growing seasons that satellites track with precision.

Climate change is altering this ancient rhythm. Satellite records spanning decades show how rainfall patterns are shifting, causing NDVI peaks to arrive earlier or later than traditional farming calendars predict. This space-based perspective helps Ethiopian farmers adapt their planting and harvesting schedules to new climate realities.`,
          keyPoints: [
            'NDVI follows predictable seasonal patterns tied to rainfall',
            'Climate change is shifting traditional seasonal NDVI rhythms',
            'Multi-year NDVI trends reveal long-term environmental changes',
            'Farmers can use NDVI forecasts to optimize planting schedules'
          ],
          funFact: 'Satellite NDVI data can predict crop yields up to 3 months before harvest!'
        }
      },
      {
        id: '2-4',
        title: 'NDVI in Ethiopian Agriculture',
        duration: '5 min',
        content: {
          story: `In a small village in Oromia, farmer Almaz checks her phone each morning to see the NDVI map of her fields. The colorful display shows her exactly which parts of her farm are thriving and which need attention. Green areas indicate healthy crops, while yellow and red zones signal drought stress or pest problems.

This is the power of NDVI for Ethiopian farmers: space-age technology delivered through everyday devices. Extension workers use NDVI maps to prioritize which farms need urgent support. Insurance companies use NDVI data to assess crop losses and process claims faster. Even researchers studying climate change rely on NDVI to understand how Ethiopia's ecosystems are responding to shifting weather patterns.

From space to smartphone, NDVI bridges the vast distance between satellite sensors and smallholder farmers, democratizing access to agricultural intelligence that was once available only to large commercial operations.`,
          keyPoints: [
            'NDVI apps provide real-time crop health monitoring for smallholder farmers',
            'Insurance companies use NDVI for rapid crop loss assessment',
            'Extension services prioritize support based on NDVI alerts',
            'Research institutions track ecosystem changes using NDVI trends'
          ],
          funFact: 'Over 12 million Ethiopian farmers now have access to satellite-based NDVI information through mobile platforms!'
        }
      }
    ]
  },
  3: {
    title: 'Climate Change Impacts',
    icon: Zap,
    color: 'warning-orange',
    totalDuration: '50 min',
    description: 'Explore how changing climate patterns reshape Ethiopian agriculture',
    lessons: [
      {
        id: '3-1',
        title: 'Reading Earth\'s Temperature from Space',
        duration: '15 min',
        content: {
          story: `Every object on Earth, from the smallest leaf to the largest mountain, glows with invisible heat that satellites can detect. This thermal radiation tells the story of our changing climate with unprecedented precision.

When NASA's thermal satellites pass over Ethiopia, they're essentially taking the country's temperature with a cosmic thermometer. The data reveals a complex thermal landscape: cool highlands where coffee grows, scorching lowlands of the Danakil Depression, and everything in between. But more importantly, this space-based thermometer is documenting how Ethiopia's temperature patterns are shifting over time.

In the past 30 years, satellite data shows that Ethiopia's average temperature has risen by 1.4°C - a change that might seem small but represents a massive shift in agricultural zones. Coffee-growing regions that once thrived at certain elevations are becoming too warm, forcing farmers to plant at higher altitudes. The thermal fingerprint of climate change is written across Ethiopia's landscape, visible only from space.`,
          keyPoints: [
            'Thermal satellites measure land surface temperature with 0.1°C precision',
            'Ethiopia has warmed 1.4°C over the past 30 years according to satellite data',
            'Temperature changes shift agricultural zones to higher elevations',
            'Nighttime temperatures are rising faster than daytime temperatures'
          ],
          funFact: 'Satellites can detect temperature differences as small as a tenth of a degree across areas the size of a football field!'
        }
      },
      {
        id: '3-2',
        title: 'The Shifting Patterns of Rain',
        duration: '18 min',
        content: {
          story: `Rain is life in Ethiopia, and from space, satellites watch every drop fall across the continent. The Tropical Rainfall Measuring Mission (TRMM) and its successor GPM create a real-time map of precipitation that reveals how climate change is reshaping Ethiopia's water cycle.

The story satellites tell is complex and concerning. Traditional rainfall patterns that Ethiopian farmers have relied on for generations are becoming less predictable. The main rainy season (Kiremt) is starting later and ending earlier in some regions, while the small rains (Belg) are becoming increasingly erratic.

Satellite data shows that while total annual rainfall may not be decreasing dramatically, its distribution is changing. Instead of gentle, consistent rains that soaked into the soil, Ethiopia is experiencing more intense downpours followed by longer dry spells. This shift from steady showers to extreme events is visible from space as satellites track the movement of storm systems across the Horn of Africa.

For farmers in Tigray or SNNP, these changes mean adapting century-old farming practices to new realities revealed by space-based observations.`,
          keyPoints: [
            'Satellite precipitation data shows shifts in timing and intensity of rainfall',
            'Traditional rainy seasons are becoming less predictable and reliable',
            'Extreme precipitation events are increasing while mild rains decrease',
            'Regional variations in climate change impacts require local adaptation strategies'
          ],
          funFact: 'Satellites can detect raindrops as small as 0.2mm and track them as they fall through the atmosphere!'
        }
      },
      {
        id: '3-3',
        title: 'Drought Cycles and Early Warning',
        duration: '12 min',
        content: {
          story: `From space, drought doesn't appear suddenly - it creeps across the landscape like a slow-moving shadow. Satellites watching Ethiopia can see drought developing months before it becomes visible to people on the ground.

The story begins with soil moisture satellites that peer beneath the surface, measuring water content in the top layers of soil. As drought begins, these underground water reserves slowly diminish, visible to satellites long before crops show stress. Next, vegetation indices like NDVI start declining as plants begin to struggle. Finally, surface temperature measurements show increasing heat stress across the landscape.

This sequence of observable changes allows scientists to create early warning systems that can predict drought impact weeks or months in advance. In 2020, satellite-based early warning systems detected drought conditions in parts of Ethiopia three months before harvest season, giving farmers and relief organizations crucial time to prepare.

The Ethiopian government now uses this satellite-derived intelligence to pre-position emergency food supplies and deploy agricultural support to at-risk regions before crisis hits, potentially saving millions of lives.`,
          keyPoints: [
            'Satellites can detect drought conditions 2-3 months before ground-based observations',
            'Multi-sensor approach combines soil moisture, vegetation, and temperature data',
            'Early warning systems enable proactive rather than reactive responses',
            'Satellite drought monitoring has improved food security for millions of Ethiopians'
          ],
          funFact: 'Satellite-based drought early warning systems have reduced famine-related deaths in Ethiopia by over 70% since 2000!'
        }
      },
      {
        id: '3-4',
        title: 'Adaptation Strategies from Space',
        duration: '5 min',
        content: {
          story: `High above Ethiopia, satellites are not just documenting climate change - they're helping farmers fight back. By analyzing years of satellite data, agricultural scientists can identify which crop varieties and farming techniques work best under changing climate conditions.

Satellite observations reveal that farmers who diversify their crops based on micro-climate data perform better during drought years. Those who plant drought-resistant varieties in areas identified by satellite analysis as increasingly water-stressed maintain better yields. Even simple changes like adjusting planting dates based on satellite-derived rainfall forecasts can increase harvest success by 20-30%.

This space-based agricultural intelligence is democratizing climate adaptation, making advanced climate science accessible to smallholder farmers through mobile apps and SMS alerts. The eyes in the sky are becoming partners in the fields below.`,
          keyPoints: [
            'Satellite data helps identify optimal crop varieties for changing conditions',
            'Micro-climate analysis enables precision agriculture at farm scale',
            'Mobile delivery of satellite insights reaches millions of smallholder farmers',
            'Data-driven adaptation strategies can increase yields by 20-30%'
          ],
          funFact: 'Ethiopian farmers using satellite-derived climate insights have increased their average yields by 25% compared to traditional methods!'
        }
      }
    ]
  },
  4: {
    title: 'Early Warning Systems',
    icon: Target,
    color: 'destructive',
    totalDuration: '35 min',
    description: 'Learn how satellite data saves lives through early detection',
    lessons: [
      {
        id: '4-1',
        title: 'The Science of Prediction',
        duration: '10 min',
        content: {
          story: `Imagine being able to see the future - not through magic, but through the systematic analysis of patterns invisible to the naked eye. This is exactly what satellite-based early warning systems do for Ethiopian agriculture.

The process begins with a constellation of satellites continuously monitoring Ethiopia from space. Each satellite contributes a piece of the puzzle: one measures soil moisture deep underground, another tracks vegetation health, a third monitors rainfall patterns, and yet another records surface temperatures. Alone, each measurement tells part of the story. Together, they reveal the future.

Advanced computer models, fed with decades of historical satellite data, learn to recognize the subtle patterns that precede drought, flood, or crop failure. When soil moisture drops below critical thresholds in certain regions while vegetation indices show declining trends and rainfall forecasts predict continued dry conditions, the system flags an emerging crisis - often months before traditional ground-based monitoring would detect it.

This is not fortune-telling; it's the application of cutting-edge data science to the ancient challenge of agricultural uncertainty.`,
          keyPoints: [
            'Multiple satellites provide complementary data for comprehensive monitoring',
            'Machine learning models identify patterns in decades of historical data',
            'Early warning systems can predict food crises 3-6 months in advance',
            'Automated algorithms continuously analyze satellite data streams'
          ],
          funFact: 'Early warning systems analyze over 50 different satellite-derived indicators to predict agricultural crises!'
        }
      },
      {
        id: '4-2',
        title: 'Risk Assessment and Alert Mechanisms',
        duration: '12 min',
        content: {
          story: `In a control room at the Ethiopian National Meteorological Agency, computer screens display a real-time map of the country painted in colors that tell a story of risk. Green areas indicate normal conditions, yellow suggests emerging concerns, orange warns of developing problems, and red signals imminent crisis.

This color-coded risk assessment system processes satellite data 24 hours a day, 7 days a week. When indicators cross predetermined thresholds, automated alerts trigger a cascade of responses. Text messages go out to farmers in affected areas, warning them of developing drought conditions. Extension workers receive detailed reports about which communities need immediate attention. Government officials get briefings on regions where food assistance may soon be needed.

The beauty of this system lies in its specificity. Instead of broad regional warnings, satellites enable community-level precision. A village in one valley might receive alerts about impending drought stress, while farmers just 10 kilometers away in a different micro-climate zone continue normal operations.

This granular approach to early warning transforms crisis response from reactive emergency management to proactive risk reduction.`,
          keyPoints: [
            'Risk assessment systems provide community-level precision in warnings',
            'Automated alert thresholds trigger multi-level response protocols',
            'Real-time satellite monitoring enables 24/7 crisis surveillance',
            'Mobile technology delivers personalized alerts to individual farmers'
          ],
          funFact: 'Ethiopia\'s satellite-based early warning system can deliver personalized alerts to over 12 million farmers simultaneously!'
        }
      },
      {
        id: '4-3',
        title: 'Community Response and Mobilization',
        duration: '8 min',
        content: {
          story: `When satellite data triggers a drought alert for rural Tigray, a remarkable chain of human response begins. Within hours, extension workers are dispatched to affected villages with drought-resistant seed varieties and water conservation guidance. Community leaders convene meetings to discuss adaptive strategies based on satellite-derived forecasts.

Local women's groups, often the backbone of rural resilience, mobilize savings and credit associations to help vulnerable families prepare for lean times ahead. Mobile veterinary units deploy to areas where satellite data indicates pasture stress, helping herders protect their livestock before conditions deteriorate.

This community mobilization, guided by space-based intelligence, represents a revolution in disaster preparedness. Instead of waiting for crisis to strike and then scrambling to respond, communities now have the gift of time - precious weeks or months to prepare, adapt, and protect their livelihoods.

The satellites provide the early warning, but it's the human networks on the ground that transform that information into life-saving action.`,
          keyPoints: [
            'Early warnings enable proactive community preparation rather than reactive response',
            'Extension workers deploy resources before crisis conditions develop',
            'Community organizations mobilize support systems in advance of predicted stress',
            'Livestock protection programs activate based on satellite pasture monitoring'
          ],
          funFact: 'Communities with access to satellite-based early warnings reduce livestock losses during drought by up to 60%!'
        }
      },
      {
        id: '4-4',
        title: 'Success Stories and Impact',
        duration: '5 min',
        content: {
          story: `In 2019, satellites detected the early signs of drought developing across parts of Ethiopia. The early warning system activated three months before the drought would traditionally have been recognized. This head start made all the difference.

In Somali Region, pastoralists received advance warnings through SMS alerts and began strategic destocking, selling cattle before their condition deteriorated and prices dropped. In SNNP, farmers switched to short-season crop varieties based on satellite-derived seasonal forecasts. Government food reserves were pre-positioned in at-risk areas based on satellite predictions.

When the drought finally manifested visibly on the ground, Ethiopia was ready. Instead of emergency food aid for millions, the country needed support for only hundreds of thousands. Instead of massive livestock die-offs, strategic early action preserved pastoral livelihoods. The satellite-guided preparation transformed a potential catastrophe into a manageable challenge.

This success story is now being replicated across Africa, as satellite-based early warning systems prove that technology from space can indeed save lives on Earth.`,
          keyPoints: [
            'Early action based on satellite warnings dramatically reduces crisis impacts',
            'Strategic interventions before crisis onset are more cost-effective than emergency response',
            'Livestock protection and crop diversification strategies improve community resilience',
            'Success in Ethiopia is being replicated across sub-Saharan Africa'
          ],
          funFact: 'Every dollar invested in satellite-based early warning systems saves $3-7 in emergency response costs!'
        }
      }
    ]
  }
};

const LearningModule: React.FC<LearningModuleProps> = ({ topicId, onClose }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const { toast } = useToast();

  const module = moduleData[topicId as keyof typeof moduleData];
  const currentLesson = module.lessons[currentLessonIndex];
  const progress = ((currentLessonIndex + 1) / module.lessons.length) * 100;

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setReadingProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleLessonComplete = () => {
    const newCompleted = new Set(completedLessons);
    newCompleted.add(currentLesson.id);
    setCompletedLessons(newCompleted);
    
    toast({
      title: "Lesson Completed! 🎉",
      description: `You've mastered "${currentLesson.title}"`,
    });

    if (currentLessonIndex < module.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setReadingProgress(0);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < module.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setReadingProgress(0);
    }
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setReadingProgress(0);
    }
  };

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setReadingProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-${module.color}/20`}>
              <module.icon className={`h-8 w-8 text-${module.color}`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{module.title}</h1>
              <p className="text-muted-foreground">{module.description}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onClose}>
            Close Module
          </Button>
        </motion.div>

        {/* Progress */}
        <Card className="mb-8 card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{module.totalDuration}</span>
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">12,847 learners</span>
              </div>
              <Badge variant="outline">
                Lesson {currentLessonIndex + 1} of {module.lessons.length}
              </Badge>
            </div>
            <Progress value={progress} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Lesson List */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-lg">Lessons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {module.lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setCurrentLessonIndex(index);
                    setReadingProgress(0);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    index === currentLessonIndex
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{lesson.title}</span>
                    {completedLessons.has(lesson.id) && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-xs opacity-75">{lesson.duration}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="card-gradient">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">
                          {currentLesson.title}
                        </CardTitle>
                        <CardDescription className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{currentLesson.duration}</span>
                          </span>
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={togglePlaying}
                        className="flex items-center space-x-2"
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                        <span>{isPlaying ? 'Pause' : 'Read Aloud'}</span>
                      </Button>
                    </div>
                    {isPlaying && (
                      <Progress value={readingProgress} className="mt-4" />
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Story Content */}
                    <div className="prose prose-lg max-w-none">
                      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border-l-4 border-primary">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <BookOpen className="h-5 w-5 mr-2" />
                          The Story
                        </h3>
                        <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                          {currentLesson.content.story}
                        </p>
                      </div>
                    </div>

                    {/* Key Points */}
                    <div className="bg-gradient-to-r from-accent/10 to-secondary/10 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Key Learning Points
                      </h3>
                      <ul className="space-y-2">
                        {currentLesson.content.keyPoints.map((point, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-2"
                          >
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Fun Fact */}
                    <div className="bg-gradient-to-r from-satellite-gold/10 to-earth-blue/10 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Zap className="h-5 w-5 mr-2" />
                        Did You Know?
                      </h3>
                      <p className="text-foreground/90 italic">
                        {currentLesson.content.funFact}
                      </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-6 border-t border-border/30">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentLessonIndex === 0}
                        className="flex items-center space-x-2"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Previous</span>
                      </Button>

                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={handleLessonComplete}
                          className="bg-gradient-earth hover:shadow-glow transition-all duration-300"
                        >
                          <Award className="h-4 w-4 mr-2" />
                          Complete Lesson
                        </Button>
                      </div>

                      <Button
                        variant="outline"
                        onClick={handleNext}
                        disabled={currentLessonIndex === module.lessons.length - 1}
                        className="flex items-center space-x-2"
                      >
                        <span>Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningModule;