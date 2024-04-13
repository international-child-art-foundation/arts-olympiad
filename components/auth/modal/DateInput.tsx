import React from "react";
import { useField, useFormikContext } from "formik";
import { HintIcon } from "../../svgs/HintIcon";
import { CorrectIcon } from "../../svgs/CorrectIcon";
import get from "lodash/get";

interface DateInputProps {
  name: string;
  label: string;
  placeholder?: string;
  colStart?: string;
  colSpan?: string;
}

export const DateInput = ({ name, label, colStart, colSpan }: DateInputProps) => {
  const { values, setFieldValue, setFieldTouched, errors, touched } = useFormikContext();
  const [field] = useField(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, part: keyof typeof field.value) => {
    const newValue = { ...field.value, [part]: e.target.value };
    setFieldValue(name, newValue);
    console.log(values);
  };
  const handleBlur = (part: string) => {
    setFieldTouched(`${name}.${part}`, true);
  };
  const getError = (part: string) => get(errors, `${name}.${part}`);
  const getTouched = (part: string) => get(touched, `${name}.${part}`);

  return (
    <div className={`grid ${colSpan || colStart ? `${colSpan ? colSpan : ""} ${colStart ? colStart : ""}` : ""}`}>
      <label className="mt-6 mb-1 font-light text-neutral-black">{label}</label>
      <div className="grid grid-cols-3 gap-3">
        {["day", "month", "year"].map((part) => (
          <div key={part}>
            <input
              type="number"
              aria-label={`${part} of ${label}`}
              placeholder={part.toUpperCase()}
              value={field.value[part] || ""}
              onChange={(e) => handleChange(e, part)}
              onBlur={() => handleBlur(part)}
              className="w-full col-span-1 border border-neutral-black rounded pl-2 pr-2 pt-3 pb-3"
            />
            {getError(part) && getTouched(part) && (
              <div className="flex items-center mt-1">
                <HintIcon />
                <p className="ml-2 text-xs font-normal text-[#C4384E]">{getError(part)}</p>
              </div>
            )}
            {!getError(part) && getTouched(part) && (
              <div className="flex items-center mt-1">
                <CorrectIcon />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
