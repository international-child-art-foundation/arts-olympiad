import { Metadata, NextPage } from "next";
import Link from "next/link";
import { artworks } from "../../../../mock/artworks";
import { sharedOpenGraph } from "@/app/shared-metadata";

interface PageProps {
  params: {
    artworkId: string;
  };
}

export const metadata: Metadata = {
  title: "Gallery | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Gallery | My Favorite Sport",
  }
};

export async function generateStaticParams() {
  const routes = artworks.map(artwork => ({
    artworkId: artwork.id.toString(),
  }));

  return routes;
}

const ArtworkPage: NextPage<PageProps> = (props) => {
  const artwork = artworks.find(artwork => artwork.id === Number(props.params.artworkId));

  if (!artwork) {
    return <div>No artwork found.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-evenly h-screen text-center bg-neutral-white">
      <div className="w-full flex items-left md:pt-10 md:pl-20">
        <Link href="/gallery" className="w-full md:w-3/5 h-auto">
          <img src="/gallery/back-button.svg" alt="A button to go back to the Gallery page"/>
        </Link>
      </div>
      <div className="flex justify-between px-4 py-10 mx-auto w-5/6 md:w-3/5">
        <div className="flex flex-col items-left text-left">
          <div className="text-xl font-bold">{artwork.name}</div>
          <ul>
            <li>{artwork.country}</li>
            <li>Age: {artwork.age}</li>
          </ul>
        </div>
        <div className="bg-yellow-200 rounded-full w-24 h-24 flex items-center justify-center flex-col">
          <div className="text-3xl">{artwork.votes}</div>
          <p>votes</p>
        </div>
      </div>
      <div className="flex justify-center w-5/6 md:w-4/5 h-auto overflow-hidden pb-10">
        <img src={artwork.url} alt="sample artwork depicting various sports"/>
      </div>
      <div className="pb-10 w-5/6 md:w-4/5 flex justify-center">
        <Link href="https://artsolympiad.info/artwok_select.php" className="bg-blue-500 text-white py-2 rounded-full w-full md:w-1/3 block text-center">Vote</Link>
      </div>
    </div>
  );
  
  
};

export default ArtworkPage; 