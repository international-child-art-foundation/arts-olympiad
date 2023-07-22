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
  const index = (Number(id) - 1) % 7; 
  return artworks[index];
}

const ArtworkPage: NextPage<PageProps> = (props) => {
  const artwork = getArtworkById(props.params.artworkId);

  if (!artwork) {
    return <div>No artwork found.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-evenly h-screen text-center bg-neutral-white">
      <div className="flex justify-between md:w-1/4 px-4 px-0 mx-auto sm: w-3/4">
        <div>
          <div className="text-xl font-bold">{artwork.name}</div>
          <ul>
            <li>New York, U.S.A.</li>
            <li>Age 12</li>
          </ul>
        </div>
        <div className="bg-yellow-200 rounded-full w-24 h-24 flex items-center justify-center flex-col">
          <div className="text-3xl">{artwork.votes}</div>
          <p>votes</p>
        </div>
      </div>
      <img src={artwork.url} alt="sample artwork depicting various sports" className="md: transform md:scale-125"/>
      <Link href="/vote" className="bg-blue-500 text-white px-24 py-2 rounded-full">Vote</Link>
    </div>
  );
  
  
};

export default ArtworkPage; 