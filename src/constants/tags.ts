export const TagsClass = ['Attacker', 'Runner', 'Defender'] as const;
export type CharacterClassTag = typeof TagsClass[number]; 