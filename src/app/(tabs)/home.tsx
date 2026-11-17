import { router } from "expo-router";
import { useState } from "react";

import { Choice, Screen } from "@/components/common";
import { MinutePicker } from "@/components/minute-picker";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { exerciseNames, Intensity, intensities, savedWorkouts, toParams } from "@/data";

export default function Home() {
  const [tab, setTab] = useState<"New" | "Saved">("New");
  const [minutes, setMinutes] = useState("1");
  const [intensity, setIntensity] = useState<Intensity>("medium");
  const [savedIndex, setSavedIndex] = useState(0);
  const [error, setError] = useState<string>();

  const go = () => {
    const value = Number(minutes);
    if (tab === "New" && !(Number.isInteger(value) && value >= 1 && value <= 30)) {
      setError("Enter a number from 1 to 30.");
      return;
    }
    let workout;
    if (tab === "Saved") {
      workout = savedWorkouts[savedIndex];
    } else {
      workout = { minutes: value, option: 0 };
    }
    // Go to workout routine screen with workout params!
    const params = toParams(workout);
    router.push({ pathname: "/workout/routine", params: params });
  };

  return (
    <Screen className="gap-5 pt-4">
      <Heading size="2xl">
        Start your workout!
      </Heading>

      <HStack>
        {(["New", "Saved"] as const).map((value) => (
          <Pressable
            key={value}
            onPress={() => setTab(value)}
            className={`flex-1 items-center border-b-2 py-3 ${tab === value ? "border-primary" : "border-border"}`}
          >
            <Text className={tab === value ? "font-bold" : "text-muted-foreground"}>{value}</Text>
          </Pressable>
        ))}
      </HStack>

      {tab === "New" ? (
        <Box className="gap-5">
          <Box className="gap-2.5">
            <Text>Time available</Text>
            <MinutePicker
              value={minutes}
              onChange={(text) => {
                setMinutes(text);
                setError(undefined);
              }}
            />
            <Text size="sm" className={error ? "text-destructive" : "text-muted-foreground"}>
              {error ?? "Type or use the arrows to choose 1–30 minutes."}
            </Text>
          </Box>

          <Box className="gap-2.5">
            <Text>Intensity Level</Text>
            <HStack className="gap-2.5">
              {intensities.map((level) => (
                <Choice
                  key={level.value}
                  selected={intensity === level.value}
                  onPress={() => setIntensity(level.value)}
                  className="flex-1 items-center"
                >
                  <Text className="text-3xl">{level.emoji}</Text>
                  <Text size="sm">{level.label}</Text>
                </Choice>
              ))}
            </HStack>
          </Box>
        </Box>
      ) : (
        <Box className="gap-2.5">
          {savedWorkouts.map((workout, index) => (
            <Choice 
              key={index} 
              selected={savedIndex === index} 
              onPress={() => setSavedIndex(index)}
            >
              <Text className="text-2xl font-bold">{workout.minutes} min</Text>
              <Text size="sm" className="text-muted-foreground">
                {exerciseNames[workout.option]}
              </Text>
            </Choice>
          ))}
        </Box>
      )}

      <Button size="lg" className="mt-auto h-14" onPress={go}>
        <ButtonText>Let's Go!</ButtonText>
      </Button>
    </Screen>
  );
}
