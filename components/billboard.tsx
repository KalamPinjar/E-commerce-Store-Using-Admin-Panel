

import { Billboard as BillboardTypes } from "../types";

interface BillboardProps {
  data: BillboardTypes;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        className="relative bg-cover rounded-xl h-[60vh] md:aspect-[2,4/1] overflow-hidden"
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
      >
        <div className="flex flex-col justify-center items-center gap-y-8 w-full h-full text-center">
          <div className="max-w-xs sm:max-w-xl font-bold text-3xl sm:text-5xl lg:text-6xl capitalize">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
