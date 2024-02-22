import { getUser } from "@/src/query/user.query";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LastTab from "./LastTab";
import MostLikedTab from "./MostLikedTab";
import YtNewsTab from "./YtNewsTab";
import { getAuthSession } from "@/lib/auth";
import LikedTab from "./LikedTab";
import Header from "./Header";

export default async function ChanelPage({
  params,
}: {
  params: { chanellId: string };
}) {
  const channelId = params.chanellId;
  const session = await getAuthSession();
  const isLogged = session ? true : false;
  return (
    <div>
      <Header channelId={channelId} userId={session?.user.id}/>
      <Tabs defaultValue="last" className="">
        <TabsList className="flex flex-col sm:flex-row h-24 sm:h-auto">
          <TabsTrigger value="last">Nouveautés</TabsTrigger>
          <TabsTrigger value="mostLiked">Les plus aimées</TabsTrigger>
          <TabsTrigger value="liked" disabled={!isLogged}>
            Mes recettes
          </TabsTrigger>
          <TabsTrigger value="ytNews">Actualité Youtube</TabsTrigger>
        </TabsList>
        <TabsContent value="last">
          <LastTab channelId={channelId} userId={session?.user.id} />
        </TabsContent>
        <TabsContent value="mostLiked">
          <MostLikedTab channelId={channelId} userId={session?.user.id} />
        </TabsContent>
        <TabsContent value="liked">
          <LikedTab channelId={channelId} userId={session?.user.id} />
        </TabsContent>
        <TabsContent value="ytNews">
          <YtNewsTab channelId={channelId} isLogged={isLogged}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
