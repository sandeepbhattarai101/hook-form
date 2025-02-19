import React from "react";
import { Input } from "../(app)/components/common/input";
import { Button } from "../(app)/components/common/button";

const VariationOption = ({ register, index, variationFieldArrays }) => {
  return (
    <div className="bg-[#f2f5fd] rounded-lg border border-[#d5dffa]  px-4 py-2 flex flex-col gap-3 ">
      <div className="grid grid-cols-2  gap-3 ">
        <div className="flex flex-col w-full">
          <label className="text-[#181819] text-base font-medium  leading-snug mb-3">
            Field Name
          </label>
          <Input
            {...register(`prices.${index}.variationName`)}
            placeholder="Enter Variation Name"
            className="border p-2 rounded w-full mb-2"
          />
        </div>
      </div>

      {variationFieldArrays.fields.map((variation, variationIndex) => (
        <div key={variation.id} className="flex gap-2 mb-2">
          <Input
            {...register(
              `prices.${index}.variations.${variationIndex}.fieldName`
            )}
            placeholder="Enter Field Name"
            className="border p-2 rounded "
          />

          <div className="flex flex-col w-full">
            <div className="relative flex items-center w-full">
              <span className="absolute left-3 text-gray-500 border-r pr-2">
                £
              </span>
              <Input
                {...register(
                  `prices.${index}.variations.${variationIndex}.value`
                )}
                placeholder="Enter Value"
                className="border p-2 rounded pl-10"
              />
            </div>
          </div>

          {/* Remove button */}
          <button
            type="button"
            onClick={() => variationFieldArrays.remove(variationIndex)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      <Button
        type="button"
        onClick={() =>
          variationFieldArrays.append({ fieldName: "", value: "" })
        }
        className="h-[46px] px-5 py-3 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-[#e6e6e6] justify-start items-center gap-3 w-[180px] "
      >
        <div className="text-[#595959] text-base font-normal  leading-snug">
          Add Variation(s)
        </div>
      </Button>
    </div>
  );
};

export default VariationOption;
