import { ReactNode } from "react";
import { ScrollView } from "react-native";

import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

export function Screen({ children, className = "gap-4 pt-4" }: { children: ReactNode; className?: string }) {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName={`grow px-7 pb-10 ${className}`}>
      {children}
    </ScrollView>
  );
}

export function Photo({ children }: { children?: ReactNode }) {
  return (
    <Box className="w-full items-center justify-center rounded-2xl bg-neutral-600" style={{ aspectRatio: 3 / 4 }}>
      <Text size="xs" className="text-neutral-300">
        [Workout photo]
      </Text>
      <Box
        className="absolute right-3 top-3 w-24 items-center justify-center rounded-2xl border-2 border-background bg-neutral-500"
        style={{ aspectRatio: 3 / 4 }}
      >
        <Text size="xs" className="text-neutral-300">
          [Selfie]
        </Text>
      </Box>
      {children}
    </Box>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <Box className="flex-row items-center gap-1 rounded-full bg-black/70 px-3 py-1">{children}</Box>;
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Box className="flex-1 rounded-xl border border-border p-3">
      <Text className="text-lg font-bold">{value}</Text>
      <Text size="xs" className="text-muted-foreground">
        {label}
      </Text>
    </Box>
  );
}

export function TimerRing({ time, label, done = false }: { time: string; label: string; done?: boolean }) {
  return (
    <Box
      className={`h-48 w-48 items-center justify-center self-center rounded-full border-[16px] ${done ? "border-neutral-400" : "border-primary"}`}
    >
      <Text numberOfLines={1} adjustsFontSizeToFit className="px-4 text-5xl font-bold">
        {time}
      </Text>
      <Text numberOfLines={1} adjustsFontSizeToFit className="px-6 text-muted-foreground">
        {label}
      </Text>
    </Box>
  );
}

export function Choice({
  selected,
  onPress,
  className = "",
  children,
}: {
  selected: boolean;
  onPress: () => void;
  className?: string;
  // any element/s like emoji and label, making it reusable 
  children: ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-xl border p-3 ${selected ? "border-primary" : "border-border"} ${className}`}
    >
      {children}
    </Pressable>
  );
}
