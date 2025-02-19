// PriceCalculation.jsx

"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import SelectDropdown from "./selectDropdown";
import VariationFieldArray from "./VariationFieldArray"; // Import the new component

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

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Price Calculation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          const type = watch(`prices.${index}.type`);

          return (
            <div key={field.id} className="mb-3 border p-3 rounded">
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

              {type === "input" && (
                <>
                  <input
                    {...register(`prices.${index}.value`)}
                    placeholder="Enter value"
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    {...register(`prices.${index}.label`)}
                    placeholder="Enter label"
                    className="border p-2 rounded w-full"
                  />
                </>
              )}

              {type === "range" && (
                <>
                  <input
                    {...register(`prices.${index}.field`)}
                    placeholder="Enter field name"
                    className="border p-2 rounded w-full mb-2"
                  />
                  {rangeFieldArrays.fields.map((range, rangeIndex) => (
                    <div key={range.id} className="flex gap-2 mb-2">
                      <input
                        {...register(
                          `prices.${index}.ranges.${rangeIndex}.min`
                        )}
                        placeholder="Min"
                        className="border p-2 rounded w-1/2"
                      />
                      <input
                        {...register(
                          `prices.${index}.ranges.${rangeIndex}.max`
                        )}
                        placeholder="Max"
                        className="border p-2 rounded w-1/2"
                      />
                      <button
                        type="button"
                        onClick={() => rangeFieldArrays.remove(rangeIndex)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      rangeFieldArrays.append({ min: "", max: "" })
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded mb-2"
                  >
                    Add Range
                  </button>
                </>
              )}

              {/* {type === "variation" && (
                <VariationFieldArray
                  control={control}
                  index={index}
                  register={register}
                />
              )} */}

              {type === "variation" && (
                <>
                  {/* Variation Name input (Separate from the loop) */}
                  <input
                    {...register(`prices.${index}.variationName`)}
                    placeholder="Enter Variation Name"
                    className="border p-2 rounded w-full mb-2"
                  />

                  {/* Iterate through all variations */}
                  {variationFieldArrays.fields.map(
                    (variation, variationIndex) => (
                      <div key={variation.id} className="flex gap-2 mb-2">
                        {/* Field Name input */}
                        <input
                          {...register(
                            `prices.${index}.variations.${variationIndex}.fieldName`
                          )}
                          placeholder="Enter Field Name"
                          className="border p-2 rounded w-1/2"
                        />

                        {/* Value input */}
                        <input
                          {...register(
                            `prices.${index}.variations.${variationIndex}.value`
                          )}
                          placeholder="Enter Value"
                          className="border p-2 rounded w-1/2"
                        />

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() =>
                            variationFieldArrays.remove(variationIndex)
                          }
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    )
                  )}

                  {/* Add Variation Field button */}
                  <button
                    type="button"
                    onClick={() =>
                      variationFieldArrays.append({ fieldName: "", value: "" })
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded mb-2"
                  >
                    Add Variation Field
                  </button>
                </>
              )}

              {type === "constant" && (
                <input
                  {...register(`prices.${index}.constantValue`)}
                  placeholder="Enter Constant Value"
                  className="border p-2 rounded w-full"
                />
              )}

              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
              >
                Remove
              </button>
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
