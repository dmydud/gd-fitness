export type MuscleGroup = 'all' | 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core';

export type DifficultyLevel = 'Початковий' | 'Середній' | 'Просунутий';

export interface Exercise {
  id: string;
  name: string;
  nameEn: string;
  muscleGroup: MuscleGroup;
  muscleLabel: string;
  equipment: string;
  difficulty: DifficultyLevel;
  description: string;
  technique: string[];
  commonMistakes: string[];
  trainerTip: string;
  targetMusclesDetail: string[];
  svgIconType: 'bench-press' | 'squat' | 'pull-up' | 'overhead-press' | 'bicep-curl' | 'plank' | 'deadlift' | 'lunges';
}

export interface CalendarTimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
  type: 'personal' | 'online' | 'nutrition';
}

export interface BookingAppointment {
  id: string;
  clientName: string;
  clientPhone: string;
  date: string;
  time: string;
  typeLabel: string;
  notes?: string;
  createdAt: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface LoggedSet {
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
}

export interface WorkoutExerciseLog {
  exerciseId: string;
  exerciseName: string;
  sets: LoggedSet[];
}

export interface ClientWorkoutLog {
  id: string;
  date: string;
  title: string;
  exercises: WorkoutExerciseLog[];
  completed: boolean;
}

export interface TransformationReview {
  id: string;
  clientName: string;
  age: number;
  duration: string;
  resultText: string;
  stats: {
    weightChange: string;
    waistChange?: string;
    muscleGain?: string;
  };
  testimonial: string;
  rating: number;
  tag: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
}

// Trainer Dashboard Types
export type ClientStatus = 'active' | 'paused' | 'completed' | 'new';
export type ClientGoal = 'weight_loss' | 'muscle_gain' | 'endurance' | 'health' | 'sport';

export interface ClientMeasurement {
  date: string;
  weight: number;
  chest?: number;
  waist?: number;
  hips?: number;
  bodyFat?: number;
}

export interface AssignedWorkout {
  id: string;
  weekDay: string;
  title: string;
  exercises: string[];
  completed?: boolean;
  completedDate?: string;
}

export interface TrainerClient {
  id: string;
  name: string;
  age: number;
  phone: string;
  goal: ClientGoal;
  goalLabel: string;
  status: ClientStatus;
  startDate: string;
  package: string;
  sessionsTotal: number;
  sessionsCompleted: number;
  measurements: ClientMeasurement[];
  assignedWorkouts: AssignedWorkout[];
  notes: string;
  nextSession?: string;
  avatar: string; // emoji or initials
  progressPercent: number;
}
