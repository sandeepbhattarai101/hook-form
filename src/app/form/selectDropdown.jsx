import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../(app)/components/common/select";

const SelectDropdown = ({ title, options, register, name, setValue }) => {
  return (
    <div className="flex flex-col w-full">
      <span className="text-sm font-normal py-1">{title}</span>
      <Select
        onValueChange={(value) => setValue(name, value)} // Set value on change
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <input type="hidden" {...register(name)} />
    </div>
  );
};

export default SelectDropdown;
