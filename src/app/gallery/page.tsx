import ArtworkList from "../../../components/ArtworkList";

export default function page() {
  return (
    <div>
      {/* yellow container */}
      <div className="flex justify-between items-center md:flex-col py-10 px-5 bg-main-yellow">
        <div className="text-left md:text-center">
          <h1 className="font-bold text-4xl">Gallery</h1>
          <p className="font-medium md:font-semi-bold text-lg">You can vote only once, so share with friends.</p>
          <p className="font-medium md:font-semi-bold text-lg">Vote until <span className="font-extrabold"> June 29, 2014 </span> (12:00) midnight EST </p>
        </div>
        {/* image container */}
        <div className="text-left md:py-5">
          <div className="h-40 w-32 bg-red-600"> </div>
        </div>
      </div>
      {/* search container */}
      <div className="bg-neutral-white md:bg-main-yellow pt-6 md:pt-0 pb-10 px-5">
        <div className=" mx-auto max-w-4xl">
          <form className="space-y-4">
            <div className="flex gap-4">
              <div className="w-full">
                <input type="text" id="firstName" name="firstName" placeholder="First Name" className="w-full border border-main-blue border-2 rounded-lg py-2 px-4" />
              </div>
              <div className="w-full">
                <input type="text" id="lastName" name="lastName" placeholder="Last Name" className="w-full border border-main-blue border-2 rounded-lg py-2 px-4" />
              </div>
            </div>
            <div className="w-full">
              <input type="number" id="age" name="age" placeholder="Age" className="w-full border border-main-blue border-2 rounded-lg py-2 px-4" />
            </div>
            <div className="flex gap-4">
              <div className="w-full">
                <input type="text" id="country" name="country" placeholder="Country" className="w-full border border-main-blue border-2 rounded-lg py-2 px-4" />
              </div>
              <div className="w-full">
                <input type="text" id="city" name="city" placeholder="City" className="w-full border border-main-blue border-2 rounded-lg py-2 px-4" />
              </div>
            </div>
            <button type="submit" className="w-full bg-main-blue text-white py-2 px-4 rounded-lg">Search</button>
          </form>
        </div>
      </div>
      {/* filter toggle */}
      <div className="flex justify-between bg-neutral-white px-5 py-5 lg:px-20">
        <p>search by time</p>
        <p>Filter Icon</p>
      </div>
      {/* image container */}
      <div className="bg-neutral-white px-5 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4">
          <ArtworkList />
        </div>
      </div>
    </div>
  );
}