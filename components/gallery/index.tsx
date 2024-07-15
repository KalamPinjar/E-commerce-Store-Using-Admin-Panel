"use client";

import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Image as ImageType } from "@/types";
import GalleryTab from "./gallery-tab";
import Image from "next/image";

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <TabGroup as="div" className="flex flex-col">
      <TabPanels className="mb-4 w-full aspect-square">
        {images.map((image) => (
          <TabPanel key={image.id}>
            <div className="relative rounded-lg w-full h-full overflow-hidden aspect-square">
              <Image
                fill
                src={image.url}
                alt=""
                className="object-center object-cover"
              />
            </div>
          </TabPanel>
        ))}
      </TabPanels>
      <div className="mx-auto mt-2 w-full max-w-2xl lg:max-w-none">
        <TabList className="gap-4 grid grid-cols-4">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </TabList>
      </div>
    </TabGroup>
  );
};

export default Gallery;
