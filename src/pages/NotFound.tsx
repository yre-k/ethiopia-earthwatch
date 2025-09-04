import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Satellite } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero pt-16">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-earth flex items-center justify-center">
            <Satellite className="h-10 w-10 text-white animate-pulse" />
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-earth-green to-satellite-gold bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The climate data you're looking for seems to have drifted into space. 
            Let's get you back to monitoring Ethiopia's climate patterns.
          </p>
        </div>
        
        <Link to="/">
          <Button className="bg-gradient-earth hover:shadow-glow transition-all duration-300">
            <Home className="mr-2 h-4 w-4" />
            Return to Climate Monitor
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
