import Link from "next/link";
type ArtworkCardProps = {
    id: string;
    name: string;
    votes: number;
}

const ArtworkCard = ({ id, name, votes }: ArtworkCardProps) => {
  return (
    <div id={id}>
      {/* picture placeholder */}
      {/* /artist/{artistId}/artwork/{artworkId} */}
      <Link href="/auth/login">
        <img className="w-full rounded-lg" src="https://picsum.photos/seed/picsum/300/300" alt="" />
      </Link>
      <p className="font-medium md:font-semi-bold text-lg">id: {id} </p>
      <p className="font-medium md:font-semi-bold text-lg">Name: {name}</p>
      <p className="font-normal md:font-semi-bold text-sm">Votes: {votes} </p>
    </div>
  );
};

export default ArtworkCard;