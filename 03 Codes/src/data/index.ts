import a1 from './a1.json';
import a2 from './a2.json';
import b1 from './b1.json';
import b2 from './b2.json';
import c1 from './c1.json';
import type { Level } from './types';
export const levels = [a1, a2, b1, b2, c1] as Level[];
export const lessons = levels.flatMap(level => level.lessons);
export const lessonById = (id: string) => lessons.find(lesson => lesson.id === id);
