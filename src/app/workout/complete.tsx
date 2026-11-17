import { router } from "expo-router";
import { CameraIcon, FlameIcon, ZapIcon } from "lucide-react-native";

import { Screen, TimerRing } from "@/components/common";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { caloriesPerMinute, streakDays, toParams, useWorkout } from "@/data";

export default function Complete() {
  const { workout } = useWorkout();

  return (
    <Screen className="justify-center gap-6">
      <TimerRing time="00:00" label={`${workout.minutes} min done`} done />
      <Heading size="3xl" className="text-center">
        Nice Work!
      </Heading>

      <Box className="gap-3">
        <HStack className="items-center gap-4 rounded-xl border border-border p-4">
          <Box className="h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <Icon as={FlameIcon} size="xl" className="text-primary" />
          </Box>
          <Box>
            <Text className="text-xl font-bold">{workout.minutes * caloriesPerMinute} cal</Text>
            <Text size="sm" className="text-muted-foreground">
              burned this workout
            </Text>
          </Box>
        </HStack>
        <HStack className="items-center gap-4 rounded-xl border border-border p-4">
          <Box className="h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <Icon as={ZapIcon} size="xl" className="text-primary" />
          </Box>
          <Text className="text-xl font-bold">{streakDays} day streak</Text>
        </HStack>
      </Box>

      <Button size="lg" className="h-14" onPress={() => router.push({ pathname: "/workout/camera", params: toParams(workout) })}>
        <ButtonIcon as={CameraIcon} />
        <ButtonText>Capture</ButtonText>
      </Button>
    </Screen>
  );
}
