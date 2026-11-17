import { router } from "expo-router";
import { LogOutIcon } from "lucide-react-native";
import { Image } from "react-native";

import { Screen, Stat } from "@/components/common";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { streakDays } from "@/data";
import { colors } from "@/constants/colors";

export default function Profile() {
  return (
    <Screen>
      <Box className="mt-4 items-center gap-2">
        <Image
          source={require("@/assets/images/coco-profile.jpeg")}
          style={{ width: 80, height: 80, borderRadius: 40 }}
          resizeMode="cover"
        />
        <Heading size="xl">my_profile</Heading>
      </Box>
      <HStack className="gap-3">
        <Stat value="940 cal" label="total burned" />
        <Stat value="12" label="workouts" />
        <Stat value={`${streakDays} days`} label="streak" />
      </HStack>
      <Button variant="outline" style={{ borderColor: colors.muted }} onPress={() => router.replace("/")}>
        <ButtonIcon as={LogOutIcon} />
        <ButtonText>Log out</ButtonText>
      </Button>
    </Screen>
  );
}
