import React from "react";
import { Input } from "../(app)/components/common/input";

const ConstantOption = ({ register, index }) => {
  return (
    <div className="bg-[#f2f5fd] rounded-lg border border-[#d5dffa]  px-4 py-6 flex flex-col gap-3  ">
      <div className="grid grid-cols-2">
        <div className="flex flex-col w-full">
          <label className="text-[#181819] text-base font-medium  leading-snug mb-3">
            Enter a price
          </label>
          <div className="relative flex items-center w-full">
            <span className="absolute left-3 text-gray-500 border-r pr-2">
              £
            </span>
            <Input
              {...register(`prices.${index}.constantValue`)}
              placeholder="Enter Constant Value"
              className="border p-2 rounded w-full pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstantOption;
