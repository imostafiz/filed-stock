'use client';

import { useState } from 'react';
import Image from 'next/image';

type ImageGalleryProps = {
  images: string[];
  title: string;
};

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="group relative aspect-square overflow-hidden rounded-2xl bg-[#5C6B4F]">
        <Image
          src={images[selectedIndex]}
          alt={`${title} - Image ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority
        />
        {images.length > 1 && (
          <span className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {selectedIndex + 1} / {images.length}
          </span>
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
          Hover to zoom
        </span>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 bg-[#5C6B4F] transition-all ${
                index === selectedIndex
                  ? 'border-[#1A2332] ring-2 ring-[#1A2332]/20'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
