import { useLocalSearchParams } from "expo-router";
import { ImageSourcePropType } from "react-native";

export type Intensity = "low" | "medium" | "high";

export type Exercise = { name: string; image: ImageSourcePropType; seconds: number };

export type Workout = { minutes: number; option: number };

export type PostDetails = {
  user: string;
  time: string;
  minutes: number;
  exercises: string;
  likes: number;
  streak?: number;
};

export const intensities: { value: Intensity; label: string; emoji: string }[] = [
  { value: "low", label: "Low", emoji: "😊" },
  { value: "medium", label: "Medium", emoji: "😲" },
  { value: "high", label: "High", emoji: "🥵" },
];

const options = [
  [
    { name: "Star Jumps", image: require("@/assets/images/starjump.png") },
    { name: "Squats", image: require("@/assets/images/squat.png") },
  ],
  [
    { name: "Plank", image: require("@/assets/images/plank.png") },
    { name: "Wall Sit", image: require("@/assets/images/wallsit.png") },
  ],
];

export function generateWorkout({ minutes, option }: Workout): Exercise[] {
  const [firstExercise, secondExercise] = options[option];
  const first = Math.floor(minutes / 2) * 60 || 30;
  return [
    { ...firstExercise, seconds: first },
    { ...secondExercise, seconds: minutes * 60 - first },
  ];
}

export function toParams(workout: Workout) {
  return { minutes: String(workout.minutes), option: String(workout.option) };
}

// Retrieves workout from param and returns the workout and its exercises
export function useWorkout() {
  const params = useLocalSearchParams<{ minutes: string; option: string }>();
  const workout: Workout = { minutes: Number(params.minutes), option: Number(params.option ?? 0) };
  return { workout, exercises: generateWorkout(workout) };
}

export const exerciseNames = ["Star Jumps, Squats", "Plank, Wall Sit"];

export function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export const caloriesPerMinute = 16;

export const streakDays = 3;

export const savedWorkouts: Workout[] = [
  { minutes: 5, option: 0 },
  { minutes: 2, option: 1 },
  { minutes: 8, option: 0 },
];

export const friendPosts: PostDetails[] = [
  {
    user: "friend_profile",
    time: "1h ago",
    minutes: 10,
    exercises: "Plank, Wall Sit",
    likes: 2,
  },
  {
    user: "gym_buddy",
    time: "3h ago",
    minutes: 8,
    exercises: "Star Jumps, Squats",
    likes: 4,
  },
  {
    user: "other_friend",
    time: "20 min ago",
    minutes: 5,
    exercises: "Plank, Wall Sit",
    likes: 1,
  },
];
