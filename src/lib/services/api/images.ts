import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function store(file: File, route: string[]) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join('public', ...route, Math.random().toString(36).substring(7) + '_' + file.name);

    await mkdir(join('public', ...route), { recursive: true });

    await writeFile(path, buffer);

    return path.replace('public', '');
}

export function isValidImage(file: File) {
    if(file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg') return false;

    if(file.size <= 0) return false;

    if(file.size > 5 * 1024 * 1024) return false;

    if(file.name.length > 100) return false;

    if(file.name == 'undefined') return false;

    return true;
}

export async function get() {
    return 
}