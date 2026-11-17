import { router } from "expo-router";
import { PauseIcon, PlayIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image } from "react-native";

import { Screen, TimerRing } from "@/components/common";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { formatTime, toParams, useWorkout } from "@/data";

export default function Active() {
  const { workout, exercises } = useWorkout();
  const [left, setLeft] = useState(workout.minutes * 60);
  const [paused, setPaused] = useState(false);

  // Runs after every change to left or paused or workout 
  useEffect(() => {
    // If paused, stop timer 
    if (paused) return;
    // If done, go to complete screen
    if (left === 0) {
      router.replace({ pathname: "/workout/complete", params: toParams(workout) });
      return;
    }
    // decrement timer after 1 second
    const timer = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(timer);
  }, [left, paused, workout]);

  // The whole workout in seconds, and how much has been done so far
  const totalSeconds = workout.minutes * 60;
  const secondsDone = totalSeconds - left;

  let current_exercise;
  let seconds_left;
  if (secondsDone < exercises[0].seconds) {
    // Still on the first exercise
    current_exercise = 0;
    seconds_left = left - exercises[1].seconds;
  } else {
    // On the second exercise
    current_exercise = 1;
    seconds_left = left;
  }

  return (
    <Screen>
      <TimerRing time={formatTime(left)} label={paused ? "paused" : "remaining"} />

      <Box className="gap-1">
        <HStack className="items-center px-8">
          <Box className="h-3 w-3 rounded-full bg-primary" />
          <Box className="h-0.5 flex-1 bg-neutral-600" />
          <Box className={`h-3 w-3 rounded-full border-2 border-primary ${current_exercise === 1 ? "bg-primary" : "border-neutral-400"}`} />
        </HStack>
        <HStack className="justify-between">
          <Text size="xs" className="w-24 text-center">{exercises[0].name}</Text>
          <Text size="xs" className="w-24 text-center">{exercises[1].name}</Text>
        </HStack>
      </Box>

      <Box className="items-center gap-2 rounded-2xl border-2 border-primary p-6">
        <Image key={exercises[current_exercise].name} source={exercises[current_exercise].image} style={{ width: 96, height: 96, borderRadius: 12 }} />
        <Text className="text-2xl">{exercises[current_exercise].name}</Text>
        <Text className="text-2xl font-bold text-primary">{formatTime(seconds_left)}</Text>
      </Box>

      <Button size="lg" className="mt-auto h-14" onPress={() => setPaused(!paused)}>
        <ButtonIcon as={paused ? PlayIcon : PauseIcon} />
        <ButtonText>{paused ? "Resume" : "Pause"}</ButtonText>
      </Button>
    </Screen>
  );
}
