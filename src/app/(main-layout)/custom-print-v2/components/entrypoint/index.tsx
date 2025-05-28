'use client';
import { Container, Grid, Stack, Typography } from '@mui/material';
import PrintTypeFilters from '../print-type-filters/printTypeFilters';
import PrintFiltersContent from '../content';
import FileImagesPreview from '../images-preview';
import { CustomPrintContext } from '../../context';
import { useContext } from 'react';

export default function CustomPrintEntryPoint() {
  const { PrintProduct } = useContext(CustomPrintContext);

  return (
    <Container maxWidth="xl" sx={{ mt: 5, px: { xs: 2, sm: 3, md: 4 } }}>
      <Grid container spacing={4}>
        {/* print type filters */}
        <Grid item xs={12} md={3}>
          <Stack spacing={2}>
            <PrintTypeFilters />
          </Stack>
        </Grid>

        {!PrintProduct && (
          <Grid
            item
            xs={24}
            md={9}
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body2"
              color={'primary.main'}
              fontSize={22}
              fontWeight={700}
            >
              Please choose a product from the left sidebar to view all customizations.
            </Typography>{' '}
          </Grid>
        )}

        {PrintProduct && (
          <>
            {/* content */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <PrintFiltersContent />
              </Stack>
            </Grid>

            {/* preview */}
            <Grid item xs={12} md={3}>
              <Stack spacing={2}>
                <FileImagesPreview />
              </Stack>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}
