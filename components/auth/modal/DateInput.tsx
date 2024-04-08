import React from "react";
import { useField, useFormikContext } from "formik";
import { HintIcon } from "../../svgs/HintIcon";
import { CorrectIcon } from "../../svgs/CorrectIcon";

interface DateInputProps {
  name: string;
  label: string;
  placeholder?: string;
  colStart?: string;
  colSpan?: string;
}

export const DateInput = ({ name, label, colStart, colSpan }: DateInputProps) => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(name);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, part: string) => {
    const newDate = { ...values[name], [part]: e.target.value };
    setFieldValue(name, newDate);
  };

  return (
    <div className={`grid ${colSpan || colStart ? `${colSpan ? colSpan : ""} ${colStart ? colStart : ""}` : ""}`}>
      <label className="mt-6 mb-1 font-light text-neutral-black">{label}</label>
      <div className="grid grid-cols-3 gap-3">
        <input
          type="number"
          placeholder="DD"
          value={field.value.day || ""}
          onChange={(e) => handleDateChange(e, "day")}
          className="border border-neutral-black rounded pl-2 pr-2 pt-3 pb-3"
        />
        <input
          type="number"
          placeholder="MM"
          value={field.value.month || ""}
          onChange={(e) => handleDateChange(e, "month")}
          className="border border-neutral-black rounded pl-2 pr-2 pt-3 pb-3"
        />
        <input
          type="number"
          placeholder="YYYY"
          value={field.value.year || ""}
          onChange={(e) => handleDateChange(e, "year")}
          className="border border-neutral-black rounded pl-2 pr-2 pt-3 pb-3"
        />
      </div>
      {meta.error && meta.touched && (
        <div className="flex items-center mt-1">
          <HintIcon />
          <p className="ml-2 text-xs font-normal text-[#C4384E]">{meta.error}</p>
        </div>
      )}
      {!meta.error && meta.touched && (
        <div className="flex items-center mt-1">
          <CorrectIcon />
        </div>
      )}
    </div>
  );
};
