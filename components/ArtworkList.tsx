import ArtworkCard from "./ArtworkCard"
const ArtworkList = () => { 

    // replace w/ getArtWorks()
    const artworks = [
        {
            id: '1',
            name: 'name1',
            votes: 1
        },
        {
            id: '2',
            name: 'name2',
            votes: 2
        },
        {
            id: '3',
            name: 'name3',
            votes: 3
        },
        {
            id: '4',
            name: 'name4',
            votes: 4
        },
    ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4">
        {artworks.map(artwork => (
            <ArtworkCard 
            key={artwork.id} 
            id={artwork.id}
            name={artwork.name}
            votes={artwork.votes}
            />
        ))}
    </div>
  )
}
export default ArtworkList