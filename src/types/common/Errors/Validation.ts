export interface ValidationErrorRoot {
  message: string;
  errors: Errors;
}

export type Errors = Record<string, string[] | undefined>;
