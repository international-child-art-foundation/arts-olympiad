const page = (props) => {
  console.log(props);
  return (
    <div>gallery page of {props.params.galleryId}</div>
  );
};
export default page;