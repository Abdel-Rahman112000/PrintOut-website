import { useContext, useState } from 'react';
import { CustomPrintContext } from '@/app/(main-layout)/custom-print-v2/context';
import {
  Box,
  IconButton,
  MenuItem,
  Radio,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Controller, useForm } from 'react-hook-form';
import PageDimension from '../all-pages/PageDimension';
import DoubleCustomization, {
  BlackAndWhite,
  ScallingOption,
} from '../DoubleCustomization';
import MoreCustomization from '../MoreCustomization';
import OneCustomization from '../OneCustomization';

interface SinglePageSettingsProps {
  pageIndex: number;
}
type PaperSize = {
  height?: number;
  width?: number;
  bleed?: number;
};

export default function SinglePageSettings({
  pageIndex,
}: SinglePageSettingsProps) {
  const { control } = useForm();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [textValue, setTextValue] = useState<string>('');
  // const [dimensions, setTextdimensions] = useState<string>("");

  const {
    PrintProduct,
    pagesCustomizations,
    handleSetSpecificPageStyle,
    selectedPage,
    generalDocSetting,
    handleStoreSelectedPage,
    papers,
    handleChangeGlobelFileStyle,
    handleStoreNote,
    customTextValue,
    setCustomTextValue,
    handlecustomTextValue,
    zoomLevelSinglePage,
    handleSetZoomLevelSinglePage,
  } = useContext(CustomPrintContext);
  console.log('zoomLevelSinglePage', zoomLevelSinglePage);
  console.log('papers', papers);

  const currentPageSettings = pagesCustomizations.find(
    (style) => style.pageIndex === pageIndex
  );

  const handlePaperSizeChange = (size: PaperSize) => {
    const _page = papers?.size?.find((paper) =>
      customTextValue.includes(paper.id.toString())
    );

    console.log('asdasdasdasdas', _page);
    handleStoreSelectedPage(_page);

    if (_page) {
      handleSetSpecificPageStyle({
        pageIndex: _page.id ?? 0,
        color: 'Colored',
        scale: 'Vertical',
        mode: 'Portrait',
        height: currentPageSettings?.height ?? size?.height ?? 0,
        width: currentPageSettings?.width ?? size?.width ?? 0,
        bleed: currentPageSettings?.bleed ?? size?.bleed ?? 0,
        customizationChoices: [],
      });
    }
  };

  // filed => arry of number
  // filter or find to rutern obj

  const handleChange = (value: string) => {
    setSelectedValue((prev) => {
      const newValue = prev === value ? null : value;
      if (!newValue) setTextValue('');
      return newValue;
    });
  };

  const increaseScale = () => {
    handleSetZoomLevelSinglePage(
      Math.min(zoomLevelSinglePage + 10, 200),
      pageIndex
    );
  };

  const decreaseScale = () => {
    handleSetZoomLevelSinglePage(
      Math.max(zoomLevelSinglePage - 10, 0),
      pageIndex
    );
  };

  return (
    <>
      <Stack my={2} alignItems={'center'}>
        <Stack
          spacing={4}
          alignItems={'center'}
          width={{
            xs: '98%',
            md: '70%',
          }}
        >
          <Stack spacing={4} width={'100%'}>
            {/* Custom radio input with text */}
            <Stack direction="row" spacing={4} alignItems="center">
              <Radio
                checked={selectedValue === 'a'}
                onClick={() => handleChange('a')}
                value="a"
                name="custom-radio"
              />
              <Controller
                name="customTextField"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    variant="filled"
                    value={customTextValue}
                    onChange={(e) => {
                      setCustomTextValue([e.target.value]);
                      handlecustomTextValue(e.target.value);

                      field.onChange(e); // لتحديث react-hook-form أيضاً
                    }}
                    disabled={selectedValue !== 'a'}
                    sx={{
                      borderRadius: '12px',
                      input: {
                        textAlign: 'center',
                        fontWeight: 'bold',
                      },
                    }}
                    InputProps={{ disableUnderline: true }}
                  />
                )}
              />

              <IconButton sx={{ borderRadius: '8px' }}>
                <AddIcon />
              </IconButton>
            </Stack>

            {/* Zoom scale controls */}
            <Stack alignItems="center" spacing={1}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: '300px' }}
              >
                <Typography variant="body1" fontSize={19} fontWeight={700}>
                  Scale
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconButton onClick={decreaseScale}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography
                    variant="body1"
                    fontSize={19}
                    fontWeight={700}
                    sx={{ color: 'primary.main' }}
                  >
                    {zoomLevelSinglePage.toFixed(1)}
                  </Typography>
                  <IconButton onClick={increaseScale}>
                    <AddIcon />
                  </IconButton>
                </Stack>
              </Stack>
              <Box sx={{ width: 300 }}>
                <Slider
                  value={zoomLevelSinglePage}
                  onChange={(e, value) =>
                    handleSetZoomLevelSinglePage(value as number, pageIndex)
                  }
                  step={0.1}
                  min={0}
                  max={10}
                  aria-label="Scale Slider"
                  valueLabelDisplay="auto"
                />
              </Box>
            </Stack>

            {/* Paper size selector */}
            <Stack>
              <Controller
                control={control}
                name={`order_details.${pageIndex}.paper_id`}
                render={({ field }) => (
                  <TextField
                    select
                    label="Paper Size"
                    size="small"
                    value={field.value || ''}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      const selectedPaper = papers?.size?.find((paper) => paper.id === value);
                      handlePaperSizeChange(selectedPaper?.size ?? {});
                      field.onChange(value);
                    }}
                    sx={{
                      '& .MuiInputBase-root': {
                        width: { xs: '380.24px', md: '550.24px' },
                        height: '52.31px',
                        borderRadius: '30px',
                        border: '1.17px solid #ccc',
                      },
                    }}
                  >
                    {papers?.size &&
                      Array.isArray(papers?.size) &&
                      papers?.size?.map((paper) => (
                        <MenuItem key={paper.id} value={paper.id}>
                          {paper.name} (H:{paper.size?.height}mm, W:
                          {paper.size?.width}mm, B:{paper.size?.bleed}mm)
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              />
            </Stack>

            {/* Paper dimensions editor */}
            <Stack justifyContent="space-between">
              {selectedPage && (
                <Stack spacing={2}>
                  <PageDimension
                    title="Height"
                    value={selectedPage?.size?.height ?? 0}
                    handleChange={(val) => {
                      if (generalDocSetting) {
                        handleChangeGlobelFileStyle({
                          ...generalDocSetting,
                          height: val,
                        });
                      }
                    }}
                  />
                  <PageDimension
                    title="Width"
                    value={selectedPage?.size?.width ?? 0}
                    handleChange={(val) => {
                      if (generalDocSetting) {
                        handleChangeGlobelFileStyle({
                          ...generalDocSetting,
                          width: val,
                        });
                      }
                    }}
                  />
                  <PageDimension
                    title="Bleed"
                    value={selectedPage?.size?.bleed ?? 0}
                    handleChange={(val) => {
                      if (generalDocSetting) {
                        handleChangeGlobelFileStyle({
                          ...generalDocSetting,
                          bleed: val,
                        });
                      }
                    }}
                  />
                </Stack>
              )}
            </Stack>

            {/* Print options */}
            <Stack>
              <BlackAndWhite />
              <ScallingOption />
            </Stack>

            {/* Customizations */}
            <Stack>
              {PrintProduct?.customizations?.map((customization) => {
                if (customization?.customizations_type === 'more') {
                  return (
                    <MoreCustomization
                      key={customization.id}
                      label={customization.name}
                      handleChange={() => {}}
                      choices={customization?.choices ?? []}
                    />
                  );
                }

                if (customization?.customizations_type === 'double') {
                  return (
                    <DoubleCustomization
                      key={customization.id}
                      label={customization.name}
                      choices={customization?.choices ?? []}
                      handleChange={(str) => {
                        if (generalDocSetting) {
                          let arr =
                            generalDocSetting?.customizationChoices ?? [];
                          if (!arr.includes(+str)) arr.push(+str);
                          handleChangeGlobelFileStyle({
                            ...generalDocSetting,
                            customizationChoices: arr,
                          });
                        }
                      }}
                    />
                  );
                }

                return (
                  <OneCustomization
                    key={customization.id}
                    label={customization.name ?? ''}
                  />
                );
              })}
            </Stack>

            {/* Note field */}
            <Stack>
              <TextField
                multiline
                minRows={3}
                label="Add quick note"
                sx={{ my: 4, width: '100%' }}
                onChange={(e) => handleStoreNote(e.target.value)}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
