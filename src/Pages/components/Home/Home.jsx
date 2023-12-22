import Aos from "aos";
import "aos/dist/aos.css";
import { Banner, Footer, Navbar, NewsLetter, Review, WhoUse, Whyus } from "./components";
import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        Aos.init();
    }, []);

    return (
        <div>

            <Navbar />
            <div data-aos="fade-up" data-aos-duration="1000">

                <Banner />
            </div>
            <div data-aos="fade-up" data-aos-duration="1000">

                <Whyus />
            </div>
            <div data-aos="fade-up" data-aos-duration="1000">

                <WhoUse />
            </div>
            <div data-aos="fade-up" data-aos-duration="1000">

                <Review />
            </div>
            <div data-aos="fade-up" data-aos-duration="1000">

                <NewsLetter />
            </div>

            <Footer />

        </div>
    );
};

export default Home;