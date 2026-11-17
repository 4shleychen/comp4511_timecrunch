import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";

import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { colors } from "@/constants/colors";

const stepperStyle = { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.stepper };

export function MinutePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const step = (by: number) => {
    let minutes = parseInt(value, 10);
    if (isNaN(minutes)) {
      minutes = 0;
    }
    minutes = minutes + by;
    if (minutes < 1) {
      minutes = 1;
    }
    if (minutes > 30) {
      minutes = 30;
    }
    onChange(String(minutes));
  };

  return (
    <HStack className="h-[124px] items-center justify-center gap-5 rounded-[14px] bg-secondary">
      <Input
        className="h-20 w-28 border-0"
        style={{ backgroundColor: "transparent", borderRadius: 0, borderBottomWidth: 2, borderBottomColor: colors.muted }}
      >
        <InputField
          value={value}
          // On typing, send the box's new text up to the Home screen to save
          onChangeText={onChange}
          keyboardType="number-pad"
          className="text-center text-5xl"
        />
      </Input>
      <Box className="gap-2">
        <Button
          variant="ghost"
          style={stepperStyle}
          onPress={() => step(1)}
          accessibilityLabel="Plus one minute"
        >
          <ButtonIcon as={ChevronUpIcon} className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          style={stepperStyle}
          onPress={() => step(-1)}
          accessibilityLabel="Minus one minute"
        >
          <ButtonIcon as={ChevronDownIcon} className="h-6 w-6" />
        </Button>
      </Box>
      <Text className="text-[17px] font-semibold text-muted-foreground">minutes</Text>
    </HStack>
  );
}
