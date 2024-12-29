import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useColor } from "../../atoms";
import { usePopSounds } from "./use-pop-sound";

const ROUNDNESS = 0.4;

const toRGBA = (color: string) => {
  if (typeof window === "undefined") {
    return `rgba(0, 0, 0,`;
  }
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "rgba(255, 0,";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
  return `rgba(${r}, ${g}, ${b},`;
};

const useSecondaryColorRef = () => {
  const { color } = useColor();
  const secondaryColorRef = useRef(color);
  useEffect(() => {
    secondaryColorRef.current = toRGBA(color);
  }, [color]);

  return secondaryColorRef;
};

function FlickeringGrid({
  flickerChance = 0.2,
  gridGap = 6,
  color = "rgb(0, 0, 0)",
  secondaryChance = 0.5,
  squareSize = 10,
  height,
  width,
  className,
  maxOpacity = 0.3,
}: {
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  secondaryColor?: string;
  secondaryChance?: number;
  squareSize?: number;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
}) {
  const { playRandomPopSound } = usePopSounds();
  const secondaryColorRef = useSecondaryColorRef();
  const hoveredSquareTrail = useRef<{ index: number; opacity: number }[]>([]);
  const clickedSquaresRef = useRef<{ color: string; index: number }[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const memoizedColor = useMemo(() => {
    const toRGBA = (color: string) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`;
      }
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "rgba(255, 0,";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
      return `rgba(${r}, ${g}, ${b},`;
    };
    return toRGBA(color);
  }, [color]);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const cols = Math.floor(width / (squareSize + gridGap));
      const rows = Math.floor(height / (squareSize + gridGap));

      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        const shouldBeSecondary = Math.random() < secondaryChance;
        const opacity = Math.random() * maxOpacity;

        squares[i] = shouldBeSecondary ? -opacity : opacity; // Use negative value to indicate secondary color
      }

      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          const newOpacity = Math.random() * maxOpacity;
          const shouldBeSecondary = Math.random() < secondaryChance;
          squares[i] = shouldBeSecondary ? -newOpacity : newOpacity; // Use negative value to indicate secondary color
        }
      }
    },
    [flickerChance, maxOpacity],
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j;
          const opacity = Math.abs(squares[index]);
          ctx.fillStyle = `${squares[index] < 0 ? secondaryColorRef.current : memoizedColor}${opacity})`;

          const foundSquare = hoveredSquareTrail.current?.find(
            (square) => square.index === index,
          );

          if (foundSquare) {
            ctx.fillStyle = `${secondaryColorRef.current}${foundSquare.opacity}`; // Change color on hover
          }

          const clickedSquare = clickedSquaresRef.current.find(
            (square) => square.index === index,
          );

          if (clickedSquare) {
            ctx.fillStyle = clickedSquare.color;
          }
          const currentSquareSize = clickedSquare ? squareSize + 3 : squareSize;

          const x = i * (squareSize + gridGap) * dpr + (squareSize * dpr) / 2;
          const y = j * (squareSize + gridGap) * dpr + (squareSize * dpr) / 2;

          const radius = ((squareSize * dpr) / 2) * ROUNDNESS;
          ctx.beginPath();
          ctx.moveTo(x + radius, y - (currentSquareSize * dpr) / 2);
          ctx.arcTo(
            x + (currentSquareSize * dpr) / 2,
            y - (currentSquareSize * dpr) / 2,
            x + (currentSquareSize * dpr) / 2,
            y + (currentSquareSize * dpr) / 2,
            radius,
          );
          ctx.arcTo(
            x + (currentSquareSize * dpr) / 2,
            y + (currentSquareSize * dpr) / 2,
            x - (currentSquareSize * dpr) / 2,
            y + (currentSquareSize * dpr) / 2,
            radius,
          );
          ctx.arcTo(
            x - (currentSquareSize * dpr) / 2,
            y + (currentSquareSize * dpr) / 2,
            x - (currentSquareSize * dpr) / 2,
            y - (currentSquareSize * dpr) / 2,
            radius,
          );
          ctx.arcTo(
            x - (currentSquareSize * dpr) / 2,
            y - (currentSquareSize * dpr) / 2,
            x + (currentSquareSize * dpr) / 2,
            y - (currentSquareSize * dpr) / 2,
            radius,
          );
          ctx.closePath();
          ctx.fill();
        }
      }
    },
    [memoizedColor, secondaryColorRef, squareSize, gridGap],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const getSquareIndexBasedOnMousePosition = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.floor(x / (squareSize + gridGap));
      const row = Math.floor(y / (squareSize + gridGap));
      const index = col * gridParams.rows + row;
      return index;
    };

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridParams: ReturnType<typeof setupCanvas>;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      gridParams = setupCanvas(canvas, newWidth, newHeight);
    };

    updateCanvasSize();

    let lastTime = 0;
    let count = 0;
    const animate = (time: number) => {
      if (!isInView) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;
      count++;
      if (count % 5 === 0) {
        count = 0; // Update every 5 frames
        if (hoveredSquareTrail.current.length > 0) {
          hoveredSquareTrail.current = hoveredSquareTrail.current.map(
            (trail) => ({
              index: trail.index,
              opacity: trail.opacity - 0.05,
            }),
          );
          hoveredSquareTrail.current = hoveredSquareTrail.current.filter(
            (trail) => trail.opacity > 0,
          );
        }
      }

      updateSquares(gridParams.squares, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr,
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    intersectionObserver.observe(canvas);

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (event: MouseEvent) => {
      const index = getSquareIndexBasedOnMousePosition(event);
      if (!hoveredSquareTrail.current.some((square) => square.index === index))
        hoveredSquareTrail.current.push({
          index,
          opacity: maxOpacity + 0.3,
        });
    };

    const handleClick = (event: MouseEvent) => {
      const index = getSquareIndexBasedOnMousePosition(event);
      playRandomPopSound();
      if (!clickedSquaresRef.current.some((square) => square.index === index)) {
        clickedSquaresRef.current.push({
          index,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        });
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div
      ref={containerRef}
      className={`h-full w-full ${className}`}
      id="banana"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
}

export default FlickeringGrid;
