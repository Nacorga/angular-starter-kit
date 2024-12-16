import { Lang } from '@app/types/lang.types';

export const LANGS_LIST = ['es', 'en'] as Lang[];
export const DEFAULT_LANG: Lang = 'es';
export const LANGUAGES: { key: Lang; label: string }[] = [
  { key: 'es', label: 'spanish' },
  { key: 'en', label: 'english' },
];
