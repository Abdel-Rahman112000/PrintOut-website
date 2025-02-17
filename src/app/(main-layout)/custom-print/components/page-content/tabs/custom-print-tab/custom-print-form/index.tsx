import LoadingBackdrop from "@/components/LoadingBackdrop";
import RoundedButton from "@/components/RoundedButton";
import RoundedTextField from "@/components/RoundedTextField";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { Product } from "@/types/common/Product";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  createCustomOrderDetails,
  getOrderTotalPrice,
  CreateCustomOrderDetailsDto,
} from "@/utils/api/order/create-custom-order-details";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Checkbox,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputBase,
  Radio,
  Grid,
} from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { TabsContext } from "../../..";
import { Order } from "@/types/common/Order";
import { useMutation, useQuery } from "@tanstack/react-query";
import { numberStringSchema } from "@/libs/validation/zod/numberStringSchema";
import AddLabelToEl from "@/components/AddLabelToEl";
import { getPapers } from "@/utils/api/paper/get-papers";
import { PaperType } from "@/types/common/Order/Paper";
import SingleForm from "./single-form";

type Props = {
  product: Product;
  order: Order;
};

const orderDetailSchema = z.object({
  product_id: z.number(),
  qty: z.number().or(numberStringSchema),
  file: z.array(z.number()).min(1),
  Customizations: z.array(z.number()),
  paper_id: z.number().optional().nullable(),
  height: z.number().min(0).optional(),
  width: z.number().min(0).optional(),
  bleed: z.number().min(0).optional(),
});

const schema = z.object({
  note: z.string().optional(),
  order_details: z.array(orderDetailSchema),
});

type FormType = z.infer<typeof schema>;
export type CustomPrintFormType = FormType;

function CustomPrintForm({ product, order }: Props) {
  const { data: papers } = useQuery({
    queryKey: ["paper-types"],
    async queryFn() {
      const headers = await getClientAuthHeaders();
      const papers = await getPapers(headers);
      return papers.data;
    },
  });

  const schema = z.object({
    note: z.string().optional(),
    order_details: z.array(
      orderDetailSchema
        .refine(
          ({ bleed, paper_id }) => {
            const selectedPaper = papers?.size.find((x) => x.id == paper_id);
            if (!selectedPaper || !selectedPaper.size) return true;
            if (bleed && bleed > selectedPaper.size.bleed) return false;
            return true;
          },
          {
            message:
              "Bleed should not be greated than the bleed of the selected paper.",
            path: ["bleed"],
          }
        )
        .refine(
          ({ height, paper_id }) => {
            const selectedPaper = papers?.size.find((x) => x.id == paper_id);
            if (!selectedPaper || !selectedPaper.size) return true;
            if (height && height > selectedPaper.size.height) return false;
            return true;
          },
          {
            message:
              "Height should not be greated than the height of the selected paper.",
            path: ["height"],
          }
        )
        .refine(
          ({ width, paper_id }) => {
            const selectedPaper = papers?.size.find((x) => x.id == paper_id);
            if (!selectedPaper || !selectedPaper.size) return true;
            if (width && width > selectedPaper.size.width) return false;
            return true;
          },
          {
            message:
              "Width should not be greated than the width of the selected paper.",
            path: ["width"],
          }
        )
    ),
  });

  const {
    orderQuery: { refetch },
  } = useContext(TabsContext);

  const orderDetailsInitial = useMemo(
    () => ({
      Customizations: product.customizations?.map(() => null) as any,
      file: [],
      product_id: product.id,
      qty: 1,
    }),
    [!product.customizations]
  );

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      note: "",
      order_details: [orderDetailsInitial],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "order_details",
  });

  const totalMutation = useMutation({
    async mutationFn(dto: CreateCustomOrderDetailsDto) {
      const headers = await getClientAuthHeaders();
      return await getOrderTotalPrice(headers, dto);
    },
  });

  console.log("Errors :", errors);

  const onSubmit = handleSubmit(async (data) => {
    console.log("data", data);

    try {
      const headers = await getClientAuthHeaders();
      const res = await createCustomOrderDetails(headers, order.id, {
        note: data.note,
        order_details: data.order_details.map(({ ...details }) => ({
          ...details,
          CustomizationChoices: details.Customizations,
          product_id: product.id,
        })),
      });
      refetch();
      return res;
    } catch (error) {
      console.log(error);
    }
  });

  const onGetPrice = handleSubmit(async (data) => {
    console.log("data", data);

    try {
      const res = totalMutation.mutate({
        note: data.note,
        order_details: data.order_details.map((details) => ({
          ...details,
          CustomizationChoices: details.Customizations,
          product_id: product.id,
        })),
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  });

  const [selectedForm, setSelectedForm] = useState(0);

  return (
    <Stack spacing={3} component="form" noValidate onSubmit={onSubmit}>
      <LoadingBackdrop open={isSubmitting} />
      <Typography variant="h5">Custom Print</Typography>
      <div>
        {/* <Tabs value={0}>
          <Tab value={0} label="Selected Pages" />
          <Tab value={1} label="All Pages Settings" />
        </Tabs> */}
        <Box py={4}>
          <Stack spacing={3}>
            {fields.map((field, index) => (
              <div key={field.id}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Radio
                    checked={index === selectedForm}
                    onChange={() => setSelectedForm(index)}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <Controller
                      control={control}
                      name={`order_details.${index}.file`}
                      render={({ field }) => (
                        <TextField
                          select
                          label="Selected Pages"
                          SelectProps={{
                            multiple: true,
                            renderValue: (selected: any) => selected.join(", "),
                          }}
                          error={Boolean(errors?.order_details?.[index])}
                          helperText={
                            Boolean(errors?.order_details?.[index])
                              ? errors?.order_details?.[index]?.file?.message ||
                                "Some Errors found in this form."
                              : undefined
                          }
                          fullWidth
                          {...field}
                        >
                          {order.media
                            ?.map((_, index) => index + 1)
                            .map((pageNo) => (
                              <MenuItem key={pageNo} value={pageNo}>
                                <Checkbox
                                  checked={field.value.includes(pageNo)}
                                  onChange={(e) => {
                                    const selectedFiles = field.value || [];
                                    const newFiles = e.target.checked
                                      ? [...selectedFiles, pageNo]
                                      : selectedFiles.filter(
                                          (item) => item !== pageNo
                                        );

                                    field.onChange(newFiles);
                                  }}
                                />
                                <ListItemText primary={pageNo} />
                              </MenuItem>
                            ))}
                        </TextField>
                      )}
                    />
                  </div>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => remove(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Stack>
              </div>
            ))}
            <Button
              onClick={() => append(orderDetailsInitial)}
              startIcon={<AddIcon />}
            >
              Customize More Pages
            </Button>

            {fields.map((field, index) => (
              <SingleForm
                key={field.id}
                form={form}
                index={index}
                selectedForm={selectedForm}
                productCustomizations={product.customizations}
                papers={papers?.size}
              />
            ))}
            <TextField
              multiline
              minRows={3}
              label="Add quick note"
              {...register("note")}
            />
            <div>
              {totalMutation?.data?.total_order && (
                <Typography variant="h6">
                  Total Price is ${totalMutation?.data?.total_order}
                </Typography>
              )}
              <Button variant="outlined" onClick={onGetPrice}>
                Calculate Total Price
              </Button>
            </div>
          </Stack>
        </Box>
      </div>
      <Button type="submit">Submit</Button>
    </Stack>
  );
}

export default CustomPrintForm;
