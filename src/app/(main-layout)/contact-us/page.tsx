import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "@/assets/images/printout-logo-white.png";

function ContactUs() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={8}>
        <Grid item xs={12} md={5} lg={6}>
          <Box sx={{ py: 4 }}>
            <Paper
              sx={{
                height: "85vh",
                backgroundImage:
                  "linear-gradient(180deg, rgba(24, 190, 222, 0.7) 0%, rgba(90, 191, 139, 0.7) 100%),url(/assets/images/demo/contactUs.png)",
                backgroundPosition: "center center",
                backgroundSize: "cover",
              }}
            >
              <Container maxWidth="sm">
                <Box
                  sx={{
                    pt: 8,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#fff",
                      fontSize: "28px",
                      fontWeight: 600,
                      ml: 1,
                    }}
                  >
                    Print<span style={{ fontWeight: "400" }}>Out</span>
                  </Typography>
                </Box>
                <Box sx={{ mt: 16 }}>
                  <Typography variant="h3" sx={{ color: "#fff" }}>
                    Get in touch with Printout
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: " #E2E1E8",
                      fontWeight: "400px",
                      fontSize: "18px",
                      mt: 3,
                      width: "90%",
                    }}
                  >
                    Have questions or need assistance? The Printout team is here
                    to help! Whether you`re looking for support, partnership
                    opportunities, or general inquiries, reach out to us
                    anytime. Fill out the form below, email us, or connect with
                    us on social media—we’d love to hear from you!
                  </Typography>
                </Box>
              </Container>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={7} lg={6}>
          <Typography variant="h4" sx={{ my: 5 }}>
            Sent us a message
          </Typography>

          <Box>
            <TextField fullWidth label="Full Name" sx={{ mb: 3 }} />
            <TextField fullWidth label="Email Address" sx={{ mb: 3 }} />
            <TextField fullWidth label="Subject" sx={{ mb: 3 }} />
            <TextField
              fullWidth
              label="Message"
              sx={{ mb: 3 }}
              multiline
              rows={5}
            />
            <Button variant="contained" sx={{ px: 3, py: 2 }}>
              Create Account
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactUs;
