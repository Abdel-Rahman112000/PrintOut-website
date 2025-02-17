"use client";

import AddLabelToEl from "@/components/AddLabelToEl";
import RoundedButton from "@/components/RoundedButton";
import {
  Box,
  Button,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import PasswordField from "@/components/PasswordTextField";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  RegisterDtoSchema,
  RegisterDtoType,
  registerUser,
} from "@/utils/api/auth/register";
import { redirect, useRouter } from "next/navigation";
import { ValidationErrorRoot } from "@/types/common/Errors/Validation";

function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { isSubmitting, errors },
  } = useForm<RegisterDtoType>({
    resolver: zodResolver(RegisterDtoSchema),
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const headers = await getClientAuthHeaders();
      await registerUser(headers, data);
      router.replace("/auth/login");
    } catch (error: any) {
      console.log(error);
      if (error.status == 422) {
        const knownError: ValidationErrorRoot = error.response.data.errors;
        const entries = Object.entries(knownError);
        entries.forEach(([key, value]) => {
          setError(key as any, { message: value?.join(",") });
        });
      }

      setFocus("email");
    }
  });

  return (
    <Box py={4} height={1}>
      <LoadingBackdrop open={isSubmitting} />
      <Stack spacing={4} height={1} justifyContent="center">
        <Typography variant="h4">Create your account with us below</Typography>

        <Typography variant="body1">
          Already have an account?{" "}
          <MuiLink component={Link} href="/auth/login">
            Login
          </MuiLink>
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={onSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <AddLabelToEl label="Full Name">
            <TextField
              {...register("user_name")}
              fullWidth
              placeholder="Enter your Full Name"
              error={Boolean(errors.user_name)}
              helperText={errors.user_name?.message}
            />
          </AddLabelToEl>

          <AddLabelToEl label="Email Address">
            <TextField
              {...register("email")}
              fullWidth
              placeholder="Enter your email address"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          </AddLabelToEl>

          <AddLabelToEl label="Phone Number">
            <TextField
              {...register("phone")}
              type="tel"
              fullWidth
              placeholder="Enter your Phone Number"
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
          <div>
            <Button type="submit" sx={{ px: 10, py: 1.5 }} size="large">
              Register
            </Button>
          </div>
        </Box>
      </Stack>
    </Box>
  );
}

export default LoginForm;
