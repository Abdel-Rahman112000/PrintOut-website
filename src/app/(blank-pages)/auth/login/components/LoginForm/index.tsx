"use client";

import AddLabelToEl from "@/components/AddLabelToEl";
import RoundedButton from "@/components/RoundedButton";
import {
  Box,
  Divider,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDtoSchema, LoginDtoType, login } from "@/utils/api/auth/login";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import PasswordField from "@/components/PasswordTextField";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { isSubmitting, errors },
  } = useForm<LoginDtoType>({
    resolver: zodResolver(LoginDtoSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const headers = await getClientAuthHeaders();
      const { access_token } = await login(headers, data);
      if (!access_token) throw new Error("Token not found in response body");
      signIn("credentials", { token: access_token, redirect: false });
      // redirect to previous page
      router.back();
    } catch (error) {
      setError("email", { message: "Email or Password is incorrect" });
      setFocus("email");
    }
  });

  return (
    <Box py={4} height={1}>
      <LoadingBackdrop open={isSubmitting} />
      <Stack spacing={3} height={1} justifyContent="center">
        <Typography variant="h5" align="center">
          PrintOut
        </Typography>
        <Typography variant="h4" align="center">
          Welcome back!
        </Typography>
        <Typography variant="body1" align="center">
          Login to access all your data
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={onSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <AddLabelToEl label="Email Address">
            <TextField
              {...register("email")}
              fullWidth
              placeholder="Enter your email address"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          </AddLabelToEl>

          <AddLabelToEl label="Password">
            <PasswordField
              {...register("password")}
              fullWidth
              placeholder="Enter your Password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
          </AddLabelToEl>

          <RoundedButton fullWidth type="submit" size="large">
            Login
          </RoundedButton>

          <Typography variant="body1" textAlign="center">
            Forgot your password? <MuiLink>Reset password</MuiLink>
          </Typography>
          <Divider />
          <Typography variant="body1" textAlign="center">
            {"Don't"} have an account?{" "}
            <MuiLink component={Link} href="/auth/register">
              Register
            </MuiLink>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default LoginForm;
