import { z } from "zod";

export const customTextSchema = z.object({
  customTextField: z
    .string()
    .refine(
      (value) =>
        /^\s*\d+(\s*-\s*\d+)?(\s*,\s*\d+(\s*-\s*\d+)?)*\s*$/.test(value),
      {
        message:
          "Please enter valid page numbers (e.g. 1,2,3 or 1-3 or 1,2,4-6)",
      }
    ),
});
