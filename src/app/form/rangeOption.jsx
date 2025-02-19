import React from "react";
import { Button } from "../(app)/components/common/button";
import { Input } from "../(app)/components/common/input";

const RangeOption = ({ index, register, rangeFieldArrays }) => {
  return (
    <>
      <div className="bg-[#f2f5fd] rounded-lg border border-[#d5dffa]  px-4 py-2 flex flex-col gap-3 ">
        <div className=" grid grid-cols-2 gap-[12px] ">
          <div>
            <label className="text-[#181819] text-base font-medium  leading-snug my-4">
              Enter a price
            </label>
            <Input
              {...register(`prices.${index}.field`)}
              placeholder="Enter field name"
              className="border p-2 rounded w-full mb-2"
            />
          </div>
        </div>

        {rangeFieldArrays.fields.map((range, rangeIndex) => (
          <div key={range.id} className="flex gap-2 justify-between mb-2">
            <div className="flex gap-3 items-center ">
              <label className="text-[#181819] text-base font-medium  leading-snug ">
                From
              </label>
              <Input
                {...register(`prices.${index}.ranges.${rangeIndex}.min`)}
                placeholder="Min"
                className="border p-2 rounded"
              />
            </div>
            <div className="flex gap-3 items-center ">
              <label className="text-[#181819] text-base font-medium  leading-snug ">
                To
              </label>
              <Input
                {...register(`prices.${index}.ranges.${rangeIndex}.max`)}
                placeholder="Max"
                className="border p-2 rounded "
              />
            </div>

            <div className="flex gap-3 justify-center items-center ">
              <label className="text-[#181819] text-base font-medium  leading-snug ">
                value
              </label>
              <div className="relative flex items-center w-full">
                <span className="absolute left-3 text-gray-500 border-r pr-2">
                  £
                </span>
                <Input
                  {...register(`prices.${index}.ranges.${rangeIndex}.value`)}
                  placeholder="Value"
                  className="border p-2 pl-10 rounded"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => rangeFieldArrays.remove(rangeIndex)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            rangeFieldArrays.append({ min: "", max: "", value: "" })
          }
          className="h-[46px] px-5 py-3 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-[#e6e6e6] justify-start items-center gap-3 w-[180px] "
        >
          <div className="text-[#595959] text-base font-normal  leading-snug">
            Add Range(s)
          </div>
        </Button>
      </div>
    </>
  );
};

export default RangeOption;
