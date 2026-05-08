import { withApiHandler } from "@/app/api/_lib/with-api-handler";
import { requireAuth } from "@/app/api/_lib/require-auth";
import { getAccountsForUser } from "./services/get-accounts";

export const GET = withApiHandler(async function GET(request: Request) {
  const { userId } = requireAuth(request);
  return getAccountsForUser(userId);
});
