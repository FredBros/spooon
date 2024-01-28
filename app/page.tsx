import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession()
  return (
    <div>
      <p>{JSON.stringify(session, null, 2)}</p>
      <Button>Click me</Button>
    </div>
  );
}
