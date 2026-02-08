import { defineConfig } from '@prisma/config';
import path from 'path';

export default defineConfig({
    // Şema dosyanın yerini belirtiyoruz
    schema: './prisma/schema.prisma',

    datasource: {
        // Veritabanı dosyasının tam yolunu (Absolute Path) oluşturuyoruz
        // Bu sayede 'url is required' hatasını kalıcı olarak çözer.
        url: `file:${path.join(process.cwd(), 'prisma/dev.db')}`,
    },
});