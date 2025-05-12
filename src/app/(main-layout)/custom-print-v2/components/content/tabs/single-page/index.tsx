import { useContext, useState } from "react";
import { CustomPrintContext } from "@/app/(main-layout)/custom-print-v2/context";
import {
  Box,
  IconButton,
  Radio,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function SinglePageSettings() {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [textValue, setTextValue] = useState<string>("");
  const [pageIdx, setPageIdx] = useState<number | undefined>();
  const [scale, setScale] = useState<number>(100);
  const {
    orderData,
    PrintProduct,
    pagesCustomizations,
    handleSetSpecificPageStyle,
  } = useContext(CustomPrintContext);

  const handleChange = (value: string) => {
    setSelectedValue((prev) => {
      const newValue = prev === value ? null : value;
      if (!newValue) setTextValue("");
      return newValue;
    });
  };

  const handleClick = () => {
    setTextValue(
      (prev) =>
        prev + (prev ? "," : "") + (Number(prev.split(",").pop() || 0) + 1)
    );
    handleSetSpecificPageStyle({
      pageIndex: pageIdx,
      color: undefined,
      scale: undefined,
      mode: undefined,
    });
    setPageIdx(undefined);
  };

  const increaseScale = () => {
    setScale((prev) => Math.min(prev + 10, 200)); 
    // الحد الأقصى 200
  };

  const decreaseScale = () => {
    setScale((prev) => Math.max(prev - 10, 0)); // الحد الأدنى 0
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setScale(newValue as number); // تحديث قيمة scale عند تغيير الـ Slider
  };

  return (
    <>
      {!!Boolean(PrintProduct) ? (
        <Typography
          variant="body2"
          color={"primary.main"}
          fontSize={22}
          fontWeight={700}
        >
          Select Print Product Type First
        </Typography>
      ) : (
        <Stack alignItems="center" spacing={4}>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Stack direction="row" alignItems="center">
              <Radio
                checked={selectedValue === "a"}
                onClick={() => handleChange("a")}
                value="a"
                name="custom-radio"
              />
            </Stack>
            <Stack>
              <TextField
                variant="filled"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                disabled={selectedValue !== "a"}
                sx={{
                  borderRadius: "12px",
                  input: {
                    textAlign: "center",
                    fontWeight: "bold",
                  },
                }}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Stack>
            <Stack>
              <IconButton
                onClick={handleClick}
                sx={{
                  borderRadius: "8px",
                }}
              >
                <AddIcon />
              </IconButton>
            </Stack>
          </Stack>

          {/* Scale Section */}
          <Stack direction="column" alignItems="center" spacing={1}>
            {/* Scale Label, Buttons, and Value */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: "300px" }} // نفس عرض الـ Slider للمحاذاة
            >
              <Typography variant="body1" fontSize={19} fontWeight={700}>
                Scale
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton onClick={decreaseScale}>
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" fontSize={19} fontWeight={700}>
                  {scale}
                </Typography>
                <IconButton onClick={increaseScale}>
                  <AddIcon />
                </IconButton>
              </Stack>
            </Stack>

            {/* Slider */}
            <Box sx={{ width: 300 }}>
              <Slider
                value={scale} // ربط قيمة الـ Slider مع scale
                onChange={handleSliderChange} // تحديث scale عند التغيير
                min={0} // الحد الأدنى
                max={200} // الحد الأقصى
                aria-label="Scale Slider"
                valueLabelDisplay="auto"
              />
            </Box>
          </Stack>
        </Stack>
      )}
    </>
  );
}