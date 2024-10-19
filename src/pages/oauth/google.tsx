import NicknamePage from "@/components/auth/NicknamePage";

export default function GoogleSignupPage() {
  const provider = "google";
  return <NicknamePage provider={provider} />;
}
