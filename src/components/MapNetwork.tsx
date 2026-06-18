import React, { useEffect, useRef } from 'react';

const HUBS = [
  { lat: 40.7128, lng: -74.0060, name: "New York" },
  { lat: 34.0522, lng: -118.2437, name: "Los Angeles" },
  { lat: 51.5074, lng: -0.1278, name: "London" },
  { lat: 50.1109, lng: 8.6821, name: "Frankfurt" },
  { lat: 25.2048, lng: 55.2708, name: "Dubai" },
  { lat: 1.3521, lng: 103.8198, name: "Singapore" },
  { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
  { lat: 31.2304, lng: 121.4737, name: "Shanghai" },
  { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
  { lat: -33.8688, lng: 151.2093, name: "Sydney" },
  { lat: -23.5505, lng: -46.6333, name: "Sao Paulo" },
  { lat: -26.2041, lng: 28.0473, name: "Johannesburg" }
];

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  isHub: boolean;
  vx: number;
  vy: number;
}

interface Link {
  source: Node;
  target: Node;
  control1: { x: number; y: number };
  control2: { x: number; y: number };
  particles: { progress: number; speed: number; }[];
}

export function MapNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    let nodes: Node[] = [];
    let links: Link[] = [];

    const mapX = (lng: number) => (lng + 180) * (w / 360);
    const mapY = (lat: number) => {
      // Simplified Web Mercator for visual purposes
      const latRad = (lat * Math.PI) / 180;
      const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
      return h / 2 - (w * mercN) / (2 * Math.PI);
    };

    const initNetwork = () => {
      nodes = [];
      links = [];
      const isMobile = w < 768;
      const numMinorNodes = isMobile ? 6 : 15;
      
      // Generate nodes
      HUBS.forEach(hub => {
        let hx = mapX(hub.lng);
        let hy = mapY(hub.lat);
        // adjust to keep on screen
        if (hx < w * 0.1) hx += w * 0.1;
        if (hx > w * 0.9) hx -= w * 0.1;

        const hubNode: Node = {
          x: hx, y: hy,
          baseX: hx, baseY: hy,
          radius: 3,
          isHub: true,
          vx: 0, vy: 0
        };
        nodes.push(hubNode);

        // Generate minor nodes clustered around hubs
        for (let i = 0; i < numMinorNodes; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * (isMobile ? 100 : 200) + 20;
          const mx = hx + Math.cos(angle) * dist;
          const my = hy + Math.sin(angle) * dist;
          nodes.push({
            x: mx, y: my,
            baseX: mx, baseY: my,
            radius: Math.random() * 1.5 + 0.5,
            isHub: false,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2
          });
        }
      });

      // Generate links for hubs (Supply chain massive routes)
      const hubNodes = nodes.filter(n => n.isHub);
      for (let i = 0; i < hubNodes.length; i++) {
        for (let j = i + 1; j < hubNodes.length; j++) {
          if (Math.random() > 0.4) {
            const dx = hubNodes[j].x - hubNodes[i].x;
            const dy = hubNodes[j].y - hubNodes[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // create curved paths
            links.push({
              source: hubNodes[i],
              target: hubNodes[j],
              control1: { x: hubNodes[i].x + dx * 0.3, y: hubNodes[i].y + dy * 0.3 - dist * 0.2 },
              control2: { x: hubNodes[i].x + dx * 0.7, y: hubNodes[i].y + dy * 0.7 - dist * 0.2 },
              particles: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
                progress: Math.random(),
                speed: (Math.random() * 0.002 + 0.001) * (dist > 800 ? 0.5 : 1)
              }))
            });
          }
        }
      }

      // Generate local links
      nodes.filter(n => !n.isHub).forEach(node => {
        // connect to nearest hub
        let nearestHub = hubNodes[0];
        let minDist = Infinity;
        hubNodes.forEach(h => {
          const dx = h.x - node.x;
          const dy = h.y - node.y;
          const d = dx*dx + dy*dy;
          if (d < minDist) { minDist = d; nearestHub = h; }
        });

        links.push({
          source: node,
          target: nearestHub,
          control1: { x: node.x, y: node.y },
          control2: { x: nearestHub.x, y: nearestHub.y },
          particles: [{ progress: Math.random(), speed: Math.random() * 0.005 + 0.002 }]
        });
      });
    };

    initNetwork();

    let myReq: number;
    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.01;

      // Draw lines
      ctx.lineWidth = 1;
      links.forEach(link => {
        ctx.beginPath();
        if (link.source.isHub && link.target.isHub) {
          ctx.strokeStyle = `rgba(255, 255, 255, 0.08)`;
          ctx.moveTo(link.source.x, link.source.y);
          ctx.bezierCurveTo(link.control1.x, link.control1.y, link.control2.x, link.control2.y, link.target.x, link.target.y);
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, 0.03)`;
          ctx.moveTo(link.source.x, link.source.y);
          ctx.lineTo(link.target.x, link.target.y);
        }
        ctx.stroke();

        // Draw particles moving across supply chain
        link.particles.forEach(p => {
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 0;

          let px, py;
          if (link.source.isHub && link.target.isHub) {
            // Cubic bezier eq
            const t = p.progress;
            const mt = 1 - t;
            px = mt*mt*mt * link.source.x + 3*mt*mt*t * link.control1.x + 3*mt*t*t * link.control2.x + t*t*t * link.target.x;
            py = mt*mt*mt * link.source.y + 3*mt*mt*t * link.control1.y + 3*mt*t*t * link.control2.y + t*t*t * link.target.y;
          } else {
            px = link.source.x + (link.target.x - link.source.x) * p.progress;
            py = link.source.y + (link.target.y - link.source.y) * p.progress;
          }
          
          ctx.beginPath();
          ctx.fillStyle = `rgba(10, 132, 255, ${Math.sin(p.progress * Math.PI) * 0.8})`; // Glowing blue tracking
          ctx.arc(px, py, link.source.isHub && link.target.isHub ? 1.5 : 1, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // Draw nodes
      nodes.forEach(node => {
        if (!node.isHub) {
          node.x += node.vx;
          node.y += node.vy;
          const dx = node.x - node.baseX;
          const dy = node.y - node.baseY;
          if (Math.abs(dx) > 10) node.vx *= -1;
          if (Math.abs(dy) > 10) node.vy *= -1;
        } else {
            // Hub pulse effect
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + Math.sin(time * 3) * 2 + 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(10, 132, 255, 0.15)`;
            ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.isHub ? 'rgba(10, 132, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
      });

      myReq = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initNetwork();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(myReq);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(5,5,5,1)_80%)] z-10" />
      <canvas ref={canvasRef} className="opacity-80" />
    </div>
  );
}
