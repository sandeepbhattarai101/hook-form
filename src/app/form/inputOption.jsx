import React from "react";
import { Input } from "../(app)/components/common/input";

const InputOption = ({ register, index }) => {
  return (
    <div className="grid grid-cols-2 gap-3 h-[130px] p-6 bg-[#f2f5fd] rounded-lg border border-[#d5dffa] items-center">
      {/* Field Name Label and Input */}
      <div className="flex flex-col w-full">
        <label className="text-[#181819] text-base font-medium  leading-snug mb-3">
          Field Name
        </label>
        <Input
          {...register(`prices.${index}.value`)}
          placeholder="Enter value"
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Field Value Label and Input */}
      <div className="flex flex-col w-full">
        <label className="text-[#181819] text-base font-medium  leading-snug mb-3">
          Field Value
        </label>
        <div className="relative flex items-center w-full">
          <span className="absolute left-3 text-gray-500 border-r pr-2">£</span>
          <Input
            {...register(`prices.${index}.label`)}
            placeholder="Enter value"
            className="border p-2 pl-10 rounded w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default InputOption;
