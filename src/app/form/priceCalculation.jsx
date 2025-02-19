"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SelectDropdown from "./selectDropdown";
import { ArrowUp, HoverIcon, StraightArrowDown } from "../../../public/icons";
import InputOption from "./inputOption";
import ConstantOption from "./constantOption";
import VariationOption from "./variationOption";
import RangeOption from "./rangeOption";
import { useGetRequest } from "../(app)/components/common/services/globalSetting";

const PriceCalculation = () => {
  const { data: getGeneralRelativeType } = useGetRequest(
    "/relative-type",
    "generalRelative"
  );

  console.log("get", getGeneralRelativeType);
  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      prices: [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "prices",
  });

  const rangeFieldArrays = useFieldArray({ control, name: "prices.ranges" });

  const variationFieldArrays = useFieldArray({
    control,
    name: `prices.variations`, // Correct field structure
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  const onSubmit = (data) => {
    console.log("inp", data);
    const formattedData = data.prices.map((priceItem, index) => ({
      ...priceItem,
      position: index + 1,
    }));
    console.log("Formatted Payload:", formattedData);
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Price Calculation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="prices">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields.map((field, index) => {
                  const type = watch(`prices.${index}.type`);

                  return (
                    <Draggable
                      key={field.id}
                      draggableId={field.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-3 border p-3 rounded bg-white shadow-sm"
                        >
                          <div className="flex justify-between mt-4 border-b pb-4">
                            <div>
                              <span className="text-black text-base font-semibold">
                                Calculation Order:
                              </span>
                              <span className="text-black text-base font-normal">
                                {" "}
                                {index + 1}
                              </span>
                            </div>
                            <span>
                              <HoverIcon />
                            </span>
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                              Remove
                            </button>
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
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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
