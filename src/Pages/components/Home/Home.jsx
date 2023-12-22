import { Banner, Footer, Navbar, NewsLetter, Review, WhoUse, Whyus } from "./components";




const Home = () => {
    return (
        <div>
            <Navbar/>
            <Banner/>
            <Whyus/>
            <WhoUse/>
            <Review/>
            <NewsLetter/>
            <Footer/>
            
        </div>
    );
};

export default Home;