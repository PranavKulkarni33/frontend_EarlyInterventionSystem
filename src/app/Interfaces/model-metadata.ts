export interface ModelMetadata {
    gradingScheme: { [key: string]: number };
    classAttribute: string;
    [key: string]: any;
}
