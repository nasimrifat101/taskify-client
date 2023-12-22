
const NewsLetter = () => {
    return (
        <div className="hero h-[400px] bg-green-300 bg-opacity-50 text-base-300">
        <div className="hero-content text-center">
          <div className="space-y-5">
            <h1 className="text-3xl lg:text-5xl font-bold">Subscribe to our newsletter.</h1>
           <div className="space-x-3 flex">
           <input type="text" className="input input-bordered w-full max-w-xl"/>
          <div className="hidden lg:block"> <button className="btn bg-base-100">Subscribe</button></div>
           </div>
          
          </div>
        </div>
      </div>
    );
};

export default NewsLetter;