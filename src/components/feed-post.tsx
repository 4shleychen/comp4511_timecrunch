import { FlameIcon, HeartIcon, MessageCircleIcon } from "lucide-react-native";
import { useState } from "react";
import { Image } from "react-native";

import { Pill, Photo } from "@/components/common";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { PostDetails } from "@/data";

export function FeedPost({ post, mine = false }: { post: PostDetails; mine?: boolean }) {
  const [liked, setLiked] = useState(false);

  return (
    <Box className="gap-3">
      <HStack className="items-center gap-3">
        {mine ? (
          <Image
            source={require("@/assets/images/coco-profile.jpeg")}
            style={{ width: 40, height: 40, borderRadius: 20 }}
            resizeMode="cover"
            accessibilityLabel="Your profile photo"
          />
        ) : (
          <Box className="h-10 w-10 items-center justify-center rounded-full bg-neutral-600">
            <Text className="font-bold">{post.user[0].toUpperCase()}</Text>
          </Box>
        )}
        <Box>
          <Text className="font-semibold">{post.user}</Text>
          <Text size="sm" className="text-muted-foreground">
            {post.time}
          </Text>
        </Box>
      </HStack>

      <Photo>
        {post.streak && (
          <Box className="absolute bottom-3 left-3">
            <Pill>
              <Icon as={FlameIcon} size="sm" className="text-primary" />
              <Text size="sm">{post.streak} days</Text>
            </Pill>
          </Box>
        )}
      </Photo>

      <Text>
        {post.minutes} min · {post.exercises}
      </Text>

      <HStack className="items-center gap-5">
        <Pressable
          onPress={() => setLiked(!liked)}
          className="flex-row items-center gap-1"
        >
          <Icon as={HeartIcon} size="xl" className={liked ? "text-primary" : "text-foreground"} />
          <Text className={liked ? "text-primary" : ""}>{post.likes + (liked ? 1 : 0)}</Text>
        </Pressable>
        <Pressable>
          <Icon as={MessageCircleIcon} size="xl" />
        </Pressable>
      </HStack>
    </Box>
  );
}
