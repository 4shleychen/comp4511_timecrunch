import { router } from "expo-router";
import { BookmarkIcon, CheckIcon, PlayIcon, RepeatIcon } from "lucide-react-native";
import { useState } from "react";
import { Image } from "react-native";

import { Screen, TimerRing } from "@/components/common";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { colors } from "@/constants/colors";
import { formatTime, generateWorkout, toParams, useWorkout } from "@/data";

export default function Routine() {
  const { workout } = useWorkout();
  const [option, setOption] = useState(workout.option);
  const [saved, setSaved] = useState(false);
  const current = { minutes: workout.minutes, option: option };

  return (
    <Screen>
      <TimerRing time={formatTime(workout.minutes * 60)} label="total time" />

      <HStack className="items-center justify-between">
        <Text className="font-medium">Your Workout</Text>
        <Button variant="outline" style={{ borderColor: colors.muted }} size="sm" onPress={() => setSaved(!saved)}>
          <ButtonIcon as={saved ? CheckIcon : BookmarkIcon} />
          <ButtonText>{saved ? "Saved" : "Save"}</ButtonText>
        </Button>
      </HStack>

      {generateWorkout(current).map((exercise) => (
        <HStack key={exercise.name} className="items-center gap-4 rounded-xl border border-border p-3">
          <Image source={exercise.image} style={{ width: 80, height: 80, borderRadius: 12 }} />
          <Box>
            <Text className="text-xl">{exercise.name}</Text>
            <Text className="text-muted-foreground">
              {exercise.seconds % 60 ? `${exercise.seconds} sec` : `${exercise.seconds / 60} min`}
            </Text>
          </Box>
        </HStack>
      ))}

      <HStack className="mt-auto gap-3">
        <Button
          variant="outline"
          style={{ borderColor: colors.muted }}
          size="lg"
          className="h-20 flex-1 gap-4"
          onPress={() => setOption(option === 0 ? 1 : 0)}
        >
          <ButtonIcon as={RepeatIcon} />
          <ButtonText>Change exercises</ButtonText>
        </Button>
        <Button
          size="lg"
          className="h-20 flex-1 gap-4"
          onPress={() => router.push({ pathname: "/workout/active", params: toParams(current) })}
        >
          <ButtonIcon as={PlayIcon} />
          <ButtonText className="font-bold">Start Workout</ButtonText>
        </Button>
      </HStack>
    </Screen>
  );
}
