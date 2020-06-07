import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@chakra-ui/core";
import { Field, FastField } from "formik";
import React, { useEffect, useState, useMemo } from "react";

const defaultOptions: { label: string; value: any }[] = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const RadioGroupInputField = ({
  name,
  label,
  hint = false,
  hintText = "",
  mb = 4,
  options = defaultOptions,
  selectOnOne = true,
  isInline = true,
  fast = true,
  ...props
}) => (
  <Field name={name}>
    {({ field, meta, form }) => {
      const defaultValue = options.findIndex(({ value }) => field.value === value);
      const [value, setValue] = useState<any>(defaultValue);

      useEffect(() => {
        form.setFieldValue(field.name, value ? options[value]?.value : undefined);
      }, [value]);

      return (
        <FormControl isInvalid={meta.touched && meta.error} mb={mb}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <RadioGroup
            {...field}
            {...props}
            id={field.name}
            spacing={4}
            my={2}
            isInline={isInline}
            defaultValue={value}
            onChange={(_, v) => setValue(v)}
          >
            {options.map(({ label }, index) => (
              <Radio value={index.toString()}>{label}</Radio>
            ))}
          </RadioGroup>
          <FormErrorMessage>{meta.error && meta.error.replace(field.name, label)}</FormErrorMessage>
          {hint && <FormHelperText>{hintText}</FormHelperText>}
        </FormControl>
      );
    }}
  </Field>
);

export default RadioGroupInputField;
