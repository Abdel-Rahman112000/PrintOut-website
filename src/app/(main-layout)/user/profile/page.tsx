import { withAuth } from "@/guards/auth.guard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const ProfileTabs = dynamic(() => import("./components/tabs"), {
  ssr: false,
});

function UserProfilePage() {
  return (
    <Box py={4}>
      <ProfileTabs />
    </Box>
  );
}

export default withAuth(UserProfilePage);
