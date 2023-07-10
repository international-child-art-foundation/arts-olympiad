import { NextPage } from "next";

interface PageProps {
  params: {
    galleryId: string;
  };
}

const artworkPage: NextPage<PageProps> = (props) => {
  console.log(props);
  return <div>gallery page of {props.params.galleryId}</div>;
};

export default artworkPage;
