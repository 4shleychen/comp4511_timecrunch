import { router } from "expo-router";
import { FlameIcon, RotateCcwIcon, SendIcon } from "lucide-react-native";
import { useState } from "react";

import { Pill, Photo, Screen } from "@/components/common";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { colors } from "@/constants/colors";
import { exerciseNames, streakDays, toParams, useWorkout } from "@/data";

export default function Camera() {
  const { workout } = useWorkout();
  const [taken, setTaken] = useState(false);

  if (!taken) {
    return (
      <Screen className="justify-center gap-6">
        <Photo />
        <Pressable
          onPress={() => setTaken(true)}
          accessibilityLabel="Take a photo"
          className="h-20 w-20 items-center justify-center self-center rounded-full border-4 border-white"
        >
          <Box className="h-16 w-16 rounded-full bg-white" />
        </Pressable>
      </Screen>
    );
  }

  return (
    <Screen className="justify-center gap-6">
      <Photo>
        <Box className="absolute bottom-3 left-3 right-3 flex-row flex-wrap gap-2">
          <Pill>
            <Text size="sm">
              {workout.minutes} min · {exerciseNames[workout.option]}
            </Text>
          </Pill>
          <Pill>
            <Icon as={FlameIcon} size="sm" className="text-primary" />
            <Text size="sm">{streakDays} day streak</Text>
          </Pill>
        </Box>
      </Photo>
      <HStack className="gap-3">
        <Button
          variant="outline"
          size="lg"
          className="h-14 flex-1"
          style={{ borderColor: colors.foreground }}
          onPress={() => setTaken(false)}
        >
          <ButtonIcon as={RotateCcwIcon} />
          <ButtonText>Retake</ButtonText>
        </Button>
        <Button
          size="lg"
          className="h-14 flex-1"
          onPress={() => router.dismissTo({ pathname: "/friends", params: { ...toParams(workout), posted: "1" } })}
        >
          <ButtonIcon as={SendIcon} />
          <ButtonText>Post</ButtonText>
        </Button>
      </HStack>
    </Screen>
  );
}
