import { useEffect, useRef } from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
}

export default function QRCode({ value, size = 128 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple QR code placeholder - displays the value as text in a box
    // In production, you would use a proper QR code library
    const padding = 10;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, size, size);

    // Draw a simple grid pattern to simulate QR code
    const cellSize = 4;
    const cells = Math.floor(size / cellSize);
    
    ctx.fillStyle = '#000000';
    for (let i = 0; i < cells; i++) {
      for (let j = 0; j < cells; j++) {
        // Create a pseudo-random pattern based on the value
        const hash = (value.charCodeAt(i % value.length) + i + j) % 3;
        if (hash === 0) {
          ctx.fillRect(i * cellSize, j * cellSize, cellSize - 1, cellSize - 1);
        }
      }
    }

    // Add corner markers (typical QR code feature)
    const markerSize = cellSize * 7;
    const drawMarker = (x: number, y: number) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, y, markerSize, markerSize);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + cellSize, y + cellSize, markerSize - cellSize * 2, markerSize - cellSize * 2);
      ctx.fillStyle = '#000000';
      ctx.fillRect(x + cellSize * 2, y + cellSize * 2, markerSize - cellSize * 4, markerSize - cellSize * 4);
    };

    drawMarker(0, 0);
    drawMarker(size - markerSize, 0);
    drawMarker(0, size - markerSize);

  }, [value, size]);

  return <canvas ref={canvasRef} width={size} height={size} className="border border-gray-200" />;
}
