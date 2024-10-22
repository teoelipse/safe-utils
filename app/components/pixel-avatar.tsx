import React, { useMemo } from 'react';

interface PixelAvatarProps {
  address: string;
  size?: number;
}

const PixelAvatar: React.FC<PixelAvatarProps> = ({ address, size = 20 }) => {
  const generateColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  const pixels = useMemo(() => {
    const seed = parseInt(address.slice(2, 10), 16);
    const pixelArray = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if ((seed >> (i * 5 + j)) & 1) {
          pixelArray.push(
            <rect
              key={`${i}-${j}`}
              x={i * 4}
              y={j * 4}
              width="4"
              height="4"
              fill={generateColor()}
            />
          );
        }
      }
    }
    return pixelArray;
  }, [address]);

  return (
    <svg width={size} height={size} viewBox="0 0 20 20">
      <rect width="20" height="20" fill="#f0f0f0" />
      {pixels}
    </svg>
  );
};

export default PixelAvatar;