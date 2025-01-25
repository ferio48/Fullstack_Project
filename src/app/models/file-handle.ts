import { SafeUrl } from "@angular/platform-browser";

export interface FileHandle {
    id: number,
    name: string,
    file: File,
    url: SafeUrl
}
