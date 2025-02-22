/**
 * Constants for DragDrop component
 * @param MAX_FILES: number
 * @param MAX_FILE_SIZE: number
 * @param ACCEPTED_TYPES: string[]
 */

const MAX_FILES = 4;
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const MAX_FILE_SIZE_MB = MAX_FILE_SIZE / (1024 * 1024);
const ACCEPTED_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

export { MAX_FILES, MAX_FILE_SIZE, ACCEPTED_TYPES, MAX_FILE_SIZE_MB };
