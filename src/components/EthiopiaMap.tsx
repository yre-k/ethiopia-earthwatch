import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Droplets, Leaf, AlertTriangle, Thermometer } from 'lucide-react';

// Sample data for Ethiopian regions
const sampleData = {
  rainfall: {
    'Addis Ababa': { value: 85, status: 'normal' },
    'Oromia': { value: 45, status: 'low' },
    'Amhara': { value: 92, status: 'high' },
    'Tigray': { value: 32, status: 'very-low' },
    'SNNP': { value: 78, status: 'normal' },
    'Somali': { value: 15, status: 'very-low' },
    'Afar': { value: 28, status: 'low' },
    'Benishangul': { value: 95, status: 'high' },
    'Gambela': { value: 88, status: 'normal' },
    'Harari': { value: 52, status: 'normal' },
    'Dire Dawa': { value: 38, status: 'low' }
  },
  ndvi: {
    'Addis Ababa': { value: 0.72, status: 'healthy' },
    'Oromia': { value: 0.45, status: 'stressed' },
    'Amhara': { value: 0.68, status: 'healthy' },
    'Tigray': { value: 0.32, status: 'stressed' },
    'SNNP': { value: 0.78, status: 'very-healthy' },
    'Somali': { value: 0.25, status: 'stressed' },
    'Afar': { value: 0.28, status: 'stressed' },
    'Benishangul': { value: 0.82, status: 'very-healthy' },
    'Gambela': { value: 0.85, status: 'very-healthy' },
    'Harari': { value: 0.58, status: 'normal' },
    'Dire Dawa': { value: 0.42, status: 'stressed' }
  }
};

const EthiopiaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<'rainfall' | 'ndvi' | 'drought'>('rainfall');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!mapContainer.current || !token) return;

    // Initialize map
    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [40.4897, 9.145], // Ethiopia coordinates
        zoom: 5.5,
        pitch: 0,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add sample markers for major Ethiopian cities
      const cities = [
        { name: 'Addis Ababa', coordinates: [38.7578, 9.0192] },
        { name: 'Dire Dawa', coordinates: [41.8661, 9.5926] },
        { name: 'Mekelle', coordinates: [39.4753, 13.4967] },
        { name: 'Gondar', coordinates: [37.4655, 12.6089] },
        { name: 'Hawassa', coordinates: [38.4762, 7.0621] },
        { name: 'Bahir Dar', coordinates: [37.3961, 11.5942] },
        { name: 'Jimma', coordinates: [36.8344, 7.6767] },
      ];

      map.current.on('load', () => {
        cities.forEach(city => {
          const data = selectedLayer === 'rainfall' 
            ? sampleData.rainfall[city.name] || { value: 0, status: 'unknown' }
            : sampleData.ndvi[city.name] || { value: 0, status: 'unknown' };

          const color = getColorForStatus(data.status, selectedLayer);
          
          // Create popup content
          const popupContent = `
            <div class="p-3 bg-gradient-card backdrop-blur-sm rounded-lg border border-border/30">
              <h3 class="font-semibold text-foreground mb-2">${city.name}</h3>
              <div class="space-y-1">
                <p class="text-sm text-muted-foreground">
                  ${selectedLayer === 'rainfall' ? 'Rainfall' : 'NDVI'}: 
                  <span class="font-medium text-${color}">
                    ${selectedLayer === 'rainfall' ? `${data.value}mm` : data.value.toFixed(2)}
                  </span>
                </p>
                <p class="text-xs text-muted-foreground capitalize">Status: ${data.status.replace('-', ' ')}</p>
              </div>
            </div>
          `;

          // Add marker
          const el = document.createElement('div');
          el.className = `w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-125`;
          el.style.backgroundColor = getHexColor(color);

          new mapboxgl.Marker(el)
            .setLngLat(city.coordinates as [number, number])
            .setPopup(new mapboxgl.Popup().setHTML(popupContent))
            .addTo(map.current!);
        });
      });

      // Cleanup
      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      setShowTokenInput(true);
    }
  }, [selectedLayer, token]);

  const getColorForStatus = (status: string, layer: string) => {
    if (layer === 'rainfall') {
      switch (status) {
        case 'very-low': return 'destructive';
        case 'low': return 'warning-orange';
        case 'normal': return 'earth-blue';
        case 'high': return 'earth-green';
        default: return 'muted';
      }
    } else {
      switch (status) {
        case 'stressed': return 'destructive';
        case 'normal': return 'warning-orange';
        case 'healthy': return 'earth-green';
        case 'very-healthy': return 'success-green';
        default: return 'muted';
      }
    }
  };

  const getHexColor = (colorName: string) => {
    const colors = {
      'destructive': '#ef4444',
      'warning-orange': '#f97316',
      'earth-blue': '#3b82f6',
      'earth-green': '#22c55e',
      'success-green': '#16a34a',
      'muted': '#6b7280'
    };
    return colors[colorName] || colors.muted;
  };

  const handleTokenSubmit = () => {
    if (token.trim()) {
      setShowTokenInput(false);
    }
  };

  if (showTokenInput) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-earth flex items-center justify-center">
              <Droplets className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Setup Required</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your Mapbox public token to view the interactive map.
              Get your token at{' '}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-earth-blue hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJ..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg text-sm"
            />
            <Button onClick={handleTokenSubmit} className="w-full">
              Load Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      {/* Layer Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          size="sm"
          variant={selectedLayer === 'rainfall' ? 'default' : 'secondary'}
          onClick={() => setSelectedLayer('rainfall')}
          className="flex items-center space-x-1"
        >
          <Droplets className="h-4 w-4" />
          <span>Rainfall</span>
        </Button>
        <Button
          size="sm"
          variant={selectedLayer === 'ndvi' ? 'default' : 'secondary'}
          onClick={() => setSelectedLayer('ndvi')}
          className="flex items-center space-x-1"
        >
          <Leaf className="h-4 w-4" />
          <span>Vegetation</span>
        </Button>
        <Button
          size="sm"
          variant={selectedLayer === 'drought' ? 'default' : 'secondary'}
          onClick={() => setSelectedLayer('drought')}
          className="flex items-center space-x-1"
        >
          <AlertTriangle className="h-4 w-4" />
          <span>Drought</span>
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-gradient-card backdrop-blur-sm rounded-lg p-3 border border-border/30">
        <h4 className="text-sm font-semibold mb-2">
          {selectedLayer === 'rainfall' ? 'Rainfall (mm/month)' : 'Vegetation Health (NDVI)'}
        </h4>
        <div className="space-y-1">
          {selectedLayer === 'rainfall' ? (
            <>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Very Low (&lt;30mm)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Low (30-60mm)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Normal (60-90mm)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>High (&gt;90mm)</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Stressed (&lt;0.4)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Normal (0.4-0.6)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Healthy (0.6-0.8)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                <span>Very Healthy (&gt;0.8)</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default EthiopiaMap;