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
    <div id={id}>
      <Link href={`/artwork/${id}`}>
        <Image
            src={url}
            width={300}
            height={350}
            className="w-1/2 rounded-lg"
            alt={name}
          />
        {/* <img className="w-4/8 rounded-lg" src={url} alt={name}/> */}
      </Link>
      <p className="font-medium md:font-semi-bold text-lg">Name: {name}</p>
      <p className="font-normal md:font-semi-bold text-sm">Votes: {votes} </p>
    </div>
  );
};

export default ArtworkCard;