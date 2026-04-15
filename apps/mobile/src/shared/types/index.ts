export interface WorkoutSession {
  id: string
  name: string
  timestamp: number
  duration: number
  calories: number
}

export interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  weight: number
}

export interface UserProfile {
  name: string
  avatar: string
  goal: string
}
