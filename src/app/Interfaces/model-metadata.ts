export interface ModelMetadata {
    courseName: string;
    gradingScheme: { [key: string]: number };
    outOfMarks: { [key: string]: number };
    classAttribute: string;
    columns: string[];
}
