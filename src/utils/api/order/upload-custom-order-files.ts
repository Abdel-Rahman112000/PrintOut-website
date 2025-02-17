import type { AuthHeaders } from "@/types/AuthHeaders";
import { api } from "@/constants/api";
import { User } from "@/types/common/User";
import { z } from "zod";
import { serialize } from "object-to-formdata";
import axios from "axios";
import { Order } from "@/types/common/Order";

export const uploadCustomOrderFilesSchema = z
  .object({
    file: z.array(z.instanceof(File)).min(1),
  })
  .refine(
    ({ file }) => {
      // Log the types of uploaded files for debugging
      console.log(...file.map((x) => x.type));

      // Check if all files are either images or a single PDF
      const areValidTypes = file.every(
        (x) => x.type.startsWith("image/") || x.type === "application/pdf"
      );

      // Check if there's only one PDF file if any
      const isSinglePdf =
        file.filter((x) => x.type === "application/pdf").length <= 1;

      // Ensure only one PDF file or multiple images
      return (
        areValidTypes &&
        isSinglePdf &&
        (file.every((x) => x.type.startsWith("image/")) ||
          (file.length === 1 && file[0].type === "application/pdf"))
      );
    },
    {
      message: "Only images or a single PDF file is allowed.",
      path: ["file"],
    }
  );

export type UploadCustomOrderFilesSchemaType = z.infer<
  typeof uploadCustomOrderFilesSchema
>;

interface Root {
  status: boolean;
  message: string;
  order: Order;
}

export const uploadCustomOrderFiles = async (
  headers: AuthHeaders,
  dto: UploadCustomOrderFilesSchemaType
) => {
  let data: UploadCustomOrderFilesSchemaType & {
    type: string;
    type_id: number;
  } = {
    ...dto,
    type: "jpg",
    type_id: 3,
  };
  if (!dto.file[0].type?.startsWith("image")) {
    data.type = "pdf";
  }
  return (
    await axios.post<Root>(api`client/cart/images`, serialize(data), {
      headers,
    })
  ).data;
};
