import { router } from "expo-router";
import { useState } from "react";

import { Screen } from "@/components/common";
import { Field } from "@/components/field";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

export default function SignIn() {
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);

  const signIn = () => {
    if (password === "wrong") setFailed(true);
    else router.replace("/home");
  };

  return (
    <Screen className="gap-6 pt-30">
      <Heading size="2xl" className="font-semibold">
        Welcome back.
      </Heading>
      <Field label="Email" placeholder="you@example.com" keyboardType="email-address" />
      <Field label="Password" placeholder="Enter your password" secure value={password} onChangeText={setPassword} />
      {failed && <Text className="text-destructive">Incorrect password. Try again.</Text>}
      <Button size="lg" className="mt-12 h-14" onPress={signIn}>
        <ButtonText>Sign In</ButtonText>
      </Button>
      {failed && (
        <Button variant="link">
          <ButtonText>Forgot password?</ButtonText>
        </Button>
      )}
      <Pressable onPress={() => router.push("/sign-up")} accessibilityRole="link" className="items-center">
        <Text className="text-center text-primary">New to TimeCrunch?</Text>
        <Text className="text-center text-primary underline">Create an account</Text>
      </Pressable>
    </Screen>
  );
}
