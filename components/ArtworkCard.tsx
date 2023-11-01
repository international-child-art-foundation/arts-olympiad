import Link from "next/link";
import Image from "next/image";

type ArtworkCardProps = {
    id: string;
    name: string;
    votes: number;
    url: string; 
}

const ArtworkCard = ({ id, name, votes, url }: ArtworkCardProps) => {
  return (
    <div id={id} className="relative w-full h-full">
      <div className="w-full h-64 rounded-lg overflow-hidden relative">
        <Link href={`/artwork/${id}`}>
          <Image
            fill
            src={url} 
            alt={name}
            className="w-full h-full"
          />
        </Link>
      </div>
      <p className="font-medium md:font-semi-bold text-lg">Name: {name}</p>
      <p className="font-normal md:font-semi-bold text-sm">Votes: {votes} </p>
    </div>
  );
};

export default ArtworkCard;