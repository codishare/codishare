import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function store(file: File, route: string[]) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join(...route, Math.random().toString(36).substring(7) + '_' + file.name);

    await mkdir(join(...route), { recursive: true });

    await writeFile(path, buffer);

    return path;
}

export async function get() {
    return 
}