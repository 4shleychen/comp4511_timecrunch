import { router } from "expo-router";

import { Screen } from "@/components/common";
import { Field } from "@/components/field";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

export default function SignUp() {
  return (
    <Screen className="gap-6 pt-8">
      <Heading size="2xl" className="font-semibold">
        Create your account.
      </Heading>
      <Field label="Username" placeholder="Choose a username" />
      <Field label="Email" placeholder="you@example.com" keyboardType="email-address" />
      <Field label="Password" placeholder="At least 8 characters" secure />
      <Field label="Confirm password" placeholder="Re-enter your password" secure />
      <Button size="lg" onPress={() => router.replace("/home")}>
        <ButtonText>Create Account</ButtonText>
      </Button>
      <Button variant="link" onPress={() => router.back()}>
        <ButtonText>Already have an account? Sign in</ButtonText>
      </Button>
    </Screen>
  );
}
