export type Exercise =
  | { id: string; type: 'choice' | 'fill' | 'listen'; prompt: string; options: string[]; answer: number; explanation: string }
  | { id: string; type: 'order'; prompt: string; words: string[]; answer: string; explanation: string };
export interface Lesson { id: string; title: string; category: string; tip: string; exercises: Exercise[] }
export interface Level { id: string; name: string; description: string; lessons: Lesson[] }
