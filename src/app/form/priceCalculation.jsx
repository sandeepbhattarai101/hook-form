// PriceCalculation.jsx

"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import SelectDropdown from "./selectDropdown";

import { ArrowUp, HoverIcon, StraightArrowDown } from "../../../public/icons";
import InputOption from "./inputOption";
import ConstantOption from "./constantOption";
import VariationOption from "./variationOption";
import RangeOption from "./rangeOption";

const PriceCalculation = () => {
  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      prices: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  const rangeFieldArrays = useFieldArray({ control, name: "prices.ranges" });

  const variationFieldArrays = useFieldArray({
    control,
    name: `prices.variations`, // Correct field structure
  });

  const onSubmit = (data) => {
    console.log("inp", data);
    // Process the data to match the desired payload structure
    const formattedData = data.prices.map((priceItem) => {
      if (priceItem.type === "range") {
        return {
          type: priceItem.type,
          position: priceItem.position,
          operator: priceItem.operator,
          range: {
            label: priceItem.rangeLabel,
            limit: priceItem.ranges.map((range) => ({
              min: range.min,
              max: range.max,
              value: range.value,
            })),
          },
        };
      }

      if (priceItem.type === "variation") {
        return {
          type: priceItem.type,
          position: priceItem.position,
          operator: priceItem.operator,
          variation: {
            name: priceItem.variationName,
            labelValue: priceItem.variations.map((variation) => ({
              value: variation.value,
              label: variation.fieldName,
            })),
          },
        };
      }

      if (priceItem.type === "input") {
        return {
          type: priceItem.type,
          position: priceItem.position,
          operator: priceItem.operator,
          inputfield: {
            label: priceItem.label,
            value: priceItem.value,
          },
        };
      }

      if (priceItem.type === "constant") {
        return {
          type: priceItem.type,
          position: priceItem.position,
          operator: priceItem.operator,
          constant: {
            constantPrice: priceItem.constantPrice,
          },
        };
      }

      return priceItem;
    });

    console.log("Formatted Payload:", formattedData);
  };
  return (
    <div className="p-4 border rounded shadow-md ">
      <h2 className="text-lg font-semibold mb-4">Price Calculation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          const type = watch(`prices.${index}.type`);

          return (
            <div key={field.id} className="mb-3 border p-3 rounded">
              <div className="flex justify-between mt-4 border-b-10  pb-4">
                <div>
                  <span className="text-black text-base font-semibold  leading-snug">
                    Calculation Order:
                  </span>
                  <span className="text-black text-base font-normal  leading-snug">
                    {" "}
                    1
                  </span>
                </div>
                <span>
                  <HoverIcon />
                </span>

                <div className="flex justify-end  gap-2">
                  <span className="border border-gray-300 rounded-md py-1 px-[10px] flex  justify-center items-center">
                    <ArrowUp />
                  </span>
                  <span className="border border-gray-300 rounded-md  py-1 px-[10px] flex justify-center items-center">
                    <StraightArrowDown />
                  </span>

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-2">
                <SelectDropdown
                  title="Select Type"
                  register={register}
                  name={`prices.${index}.type`}
                  watch={watch}
                  setValue={setValue}
                  options={[
                    { value: "input", label: "Input" },
                    { value: "range", label: "Range" },
                    { value: "variation", label: "Variation" },
                    { value: "constant", label: "Constant" },
                  ]}
                />
              </div>
              {type === "input" && (
                <InputOption register={register} index={index} />
              )}
              {type === "range" && (
                <RangeOption
                  register={register}
                  index={index}
                  rangeFieldArrays={rangeFieldArrays}
                />
              )}
              {type === "variation" && (
                <VariationOption
                  register={register}
                  index={index}
                  variationFieldArrays={variationFieldArrays}
                />
              )}
              {type === "constant" && (
                <ConstantOption register={register} index={index} />
              )}
            </div>
          );
        })}
        <button
          type="button"
          onClick={() =>
            append({
              type: "",
              value: "",
              label: "",
              field: "",
              ranges: [],
              variations: [],
              constantValue: "",
            })
          }
          className="bg-blue-500 text-white px-3 py-1 rounded mb-3"
        >
          Add Field
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PriceCalculation;
