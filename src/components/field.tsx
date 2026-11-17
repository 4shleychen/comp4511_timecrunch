import { KeyboardTypeOptions } from "react-native";

import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";

export function Field({
  label,
  placeholder,
  secure = false,
  keyboardType,
  value,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  onChangeText?: (text: string) => void;
}) {
  return (
    <FormControl>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input className="h-11">
        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure}
          textContentType={secure ? "password" : undefined}
          keyboardType={keyboardType}
          autoCapitalize="none"
          className="text-base"
        />
      </Input>
    </FormControl>
  );
}
