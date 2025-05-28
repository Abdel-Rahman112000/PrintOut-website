'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { CustomPrintContext } from '../../../context';
import { Skeleton } from '@mui/material';
import AllPagesSettings from './all-pages';
import SinglePageSettings from './single-page';
import LoadingBackdrop from '@/components/LoadingBackdrop';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps & { loading: boolean }) {
  const { loading, children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>{loading ? <LoadingRendered /> : children}</Box>
      )}
    </div>
  );
}

const LoadingRendered = () => (
  <>
    <Skeleton width={'100%'} height="49px" sx={{ borderRadius: '15px' }} />
    <Skeleton width={'100%'} height="49px" sx={{ borderRadius: '15px' }} />
    <Skeleton width={'100%'} height="49px" sx={{ borderRadius: '15px' }} />
    <Skeleton width={'100%'} height="49px" sx={{ borderRadius: '15px' }} />
    <Skeleton width={'100%'} height="99px" sx={{ borderRadius: '15px' }} />
    <Skeleton width={'100%'} height="55px" sx={{ borderRadius: '15px' }} />
  </>
);

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CustomPrintContentTabs() {
  // TODO::declare and define component state and variables
  const {
    processIsLoading,
    PrintProductLoading,
    settingMode,
    handleSetSettingMode,
  } = React.useContext(CustomPrintContext);

  // Map settingMode to the tab value (0 for "AllPages", 1 for "SelectedPages")
  const [value, setValue] = React.useState(settingMode === 'AllPages' ? 0 : 1);

  // Update the tab value and settingMode when the user changes tabs
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // Update the settingMode in the context based on the selected tab
    handleSetSettingMode(newValue === 0 ? 'AllPages' : 'SelectedPages');
  };

  // Sync the tab value with settingMode if it changes externally
  React.useEffect(() => {
    setValue(settingMode === 'AllPages' ? 0 : 1);
  }, [settingMode]);

  return (
    <Box sx={{ flexGrow: 0.4 }}>
      <LoadingBackdrop open={processIsLoading} />
      <Box sx={{ mt: 4 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="All Pages Settings"
            {...a11yProps(0)}
            sx={{ textTransform: 'none', fontWeight: 700 }}
          />
          <Tab
            label="Selected Pages"
            {...a11yProps(1)}
            sx={{ textTransform: 'none', fontWeight: 700 }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel loading={PrintProductLoading} value={value} index={0}>
        <AllPagesSettings />
      </CustomTabPanel>
      <CustomTabPanel loading={PrintProductLoading} value={value} index={1}>
        <SinglePageSettings pageIndex={1} />
      </CustomTabPanel>
    </Box>
  );
}
