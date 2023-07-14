import ArtworkCard from "./ArtworkCard";
const ArtworkList = () => { 

  // replace w/ getArtWorks()
  const artworks = [
    {
      id: "1",
      name: "name1",
      votes: 10,
      url: "/gallery/artwork-1.png"
    },
    {
      id: "2",
      name: "name2",
      votes: 2,
      url: "/gallery/artwork-1.png"
    },
    {
      id: "3",
      name: "name3",
      votes: 3,
      url: "/gallery/artwork-1.png"
    },
    {
      id: "4",
      name: "name4",
      votes: 4,
      url: "/gallery/artwork-1.png"
    },
  ];
  return (
    <>
      {artworks.map(artwork => (
        <ArtworkCard 
          key={artwork.id} 
          id={artwork.id}
          name={artwork.name}
          votes={artwork.votes}
          url={artwork.url}
        />
      ))}
    </>
  );
};
export default ArtworkList;