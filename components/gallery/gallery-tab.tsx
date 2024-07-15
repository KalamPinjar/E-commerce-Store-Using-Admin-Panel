import { cn } from "@/lib/utils";
import Image from "next/image";
import { Image as ImageType } from "@/types";
import { Tab } from "@headlessui/react";

interface GalleryTabProps {
  image: ImageType;
}
const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className="relative flex justify-center items-center bg-white rounded-md cursor-pointer aspect-square">
      {({ selected }) => (
        <div>
          <span>
            <Image
              src={image.url}
              alt=""
              fill
              className="object-center object-cover"
            />
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
