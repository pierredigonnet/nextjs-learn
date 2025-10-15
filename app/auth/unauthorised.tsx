import { PageLayout } from "@/components/layout";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default async function UnauthorizedPage() {
  return (
    <Alert>
      <AlertTitle>You need to logged to see this page</AlertTitle>
    </Alert>
  );
}
