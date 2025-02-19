// import React from "react";
// import { useFieldArray } from "react-hook-form";

// const VariationFieldArray = ({ control, index, register }) => {
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: `prices.${index}.variations`,
//   });

//   return (
//     <div>
//       {/* Variation Name Input (Separate from the loop) */}
//       <input
//         {...register(`prices.${index}.variationName`)}
//         placeholder="Enter Variation Name"
//         className="border p-2 rounded w-full mb-2"
//       />

//       {/* Iterate through all variations */}
//       {fields.map((variation, variationIndex) => (
//         <div key={variation.id} className="flex gap-2 mb-2">
//           {/* Field Name input */}
//           <input
//             {...register(
//               `prices.${index}.variations.${variationIndex}.fieldName`
//             )}
//             placeholder="Enter Field Name"
//             className="border p-2 rounded w-1/2"
//           />
//           {/* Value input */}
//           <input
//             {...register(`prices.${index}.variations.${variationIndex}.value`)}
//             placeholder="Enter Value"
//             className="border p-2 rounded w-1/2"
//           />
//           {/* Remove button */}
//           <button
//             type="button"
//             onClick={() => remove(variationIndex)}
//             className="bg-red-500 text-white px-2 py-1 rounded"
//           >
//             Remove
//           </button>
//         </div>
//       ))}

//       {/* Add Variation Field button */}
//       <button
//         type="button"
//         onClick={() => append({ fieldName: "", value: "" })}
//         className="bg-blue-500 text-white px-3 py-1 rounded mb-2"
//       >
//         Add Variation Field
//       </button>
//     </div>
//   );
// };

// export default VariationFieldArray;

import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

const VariationFieldArray = ({ index }) => {
  const { control, register } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `prices.${index}.variations`,
  });

  return (
    <div>
      {/* Variation Name Input (Separate from the loop) */}
      <input
        {...register(`prices.${index}.variationName`)}
        placeholder="Enter Variation Name"
        className="border p-2 rounded w-full mb-2"
      />

      {/* Iterate through all variations */}
      {fields.map((variation, variationIndex) => (
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
            {...register(`prices.${index}.variations.${variationIndex}.value`)}
            placeholder="Enter Value"
            className="border p-2 rounded w-1/2"
          />
          {/* Remove button */}
          <button
            type="button"
            onClick={() => remove(variationIndex)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Add Variation Field button */}
      <button
        type="button"
        onClick={() => append({ fieldName: "", value: "", variationName: "" })}
        className="bg-blue-500 text-white px-3 py-1 rounded mb-2"
      >
        Add Variation Field
      </button>
    </div>
  );
};

export default VariationFieldArray;
