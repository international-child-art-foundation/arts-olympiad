import { NextPage } from "next";
import Link from "next/link";

interface PageProps {
  params: {
    artworkId: string;
  };
}

const artworks = [
  {"id": 1, "name": "Teruhito Sekine", "votes": 12, "url":"/gallery/artwork-1.png" },
  {"id": 2, "name": "Teruhito Sekine", "votes": 15, "url":"/gallery/artwork-2.png"},
  {"id": 3, "name": "Teruhito Sekine", "votes": 2,  "url":"/gallery/artwork-3.png" },
  {"id": 4, "name": "Teruhito Sekine", "votes": 23, "url":"/gallery/artwork-4.png" },
  {"id": 5, "name": "Teruhito Sekine", "votes": 12, "url":"/gallery/artwork-5.png" },
  {"id": 6, "name": "Teruhito Sekine", "votes": 15, "url":"/gallery/artwork-6.png" },
  {"id": 7, "name": "Teruhito Sekine", "votes": 2, "url":"/gallery/artwork-7.png" }
];

function getArtworkById(id:string) {
  return artworks.find(artwork => artwork.id === Number(id));
}

const ArtworkPage: NextPage<PageProps> = (props) => {
  const artwork = getArtworkById(props.params.artworkId);

  if (!artwork) {
    return <div>No artwork found.</div>;
  }

  return (
    <div className="text-center h-screen flex flex-col justify-center">
      <div className="text-xl font-bold">{artwork.name}</div>
      <div className="text-lg">Votes: {artwork.votes}</div>
      <div className="flex justify-center">
        <div className="grid place-items-center">
          <img src={artwork.url} alt={artwork.name} />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/vote" className="bg-blue-500 text-white px-16 py-2 rounded-full inline-block max-w-full">Vote</Link>
      </div>
    </div>
  );
};

export default ArtworkPage; 