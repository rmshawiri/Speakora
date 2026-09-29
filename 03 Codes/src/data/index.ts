import a1 from './a1.json' with { type: 'json' };
import a2 from './a2.json' with { type: 'json' };
import b1 from './b1.json' with { type: 'json' };
import b2 from './b2.json' with { type: 'json' };
import c1 from './c1.json' with { type: 'json' };
import type { Level } from './types';
export const levels = [a1, a2, b1, b2, c1] as Level[];
export const lessons = levels.flatMap(level => level.lessons);
export const lessonById = (id: string) => lessons.find(lesson => lesson.id === id);
