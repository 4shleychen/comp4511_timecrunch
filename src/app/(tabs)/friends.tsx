import { useLocalSearchParams } from "expo-router";
import { UserPlusIcon } from "lucide-react-native";

import { Screen } from "@/components/common";
import { FeedPost } from "@/components/feed-post";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { exerciseNames, friendPosts, streakDays, useWorkout } from "@/data";
import { colors } from "@/constants/colors";

export default function Friends() {
  // posted gets true or false from query param 
  const { posted } = useLocalSearchParams<{ posted?: string }>();
  const { workout } = useWorkout();

  return (
    <Screen>
      <HStack className="items-center justify-between">
        <Heading size="xl">Friends</Heading>
        <Button variant="outline" style={{ borderColor: colors.muted }} size="sm">
          <ButtonIcon as={UserPlusIcon} />
          <ButtonText>Add friends</ButtonText>
        </Button>
      </HStack>
      {posted && (
        <FeedPost
          mine
          post={{
            user: "my_profile",
            time: "Just now",
            minutes: workout.minutes,
            exercises: exerciseNames[workout.option],
            likes: 0,
            streak: streakDays,
          }}
        />
      )}
      {friendPosts.map((post) => (
        <FeedPost key={post.user} post={post} />
      ))}
    </Screen>
  );
}
