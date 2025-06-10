export interface Course {
    id: string;
    title: string;
    description: string;
    creationDate?: Date | undefined;
    duration: number;
    authors: string[];
}
