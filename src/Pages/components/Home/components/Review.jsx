import axios from "axios";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const Review = () => {
    const [peoples, setPeople] = useState([])

    useEffect(() => {
        axios.get('/review.json')
            .then(res => setPeople(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="max-w-6xl mx-auto min-h-screen space-y-10">
            <p className="text-center lg:text-left lg:text-4xl font-bold pt-10">What People Say About Us</p>
            
            <Marquee>
                {
                    peoples?.map(person => (
                        <div key={person.id} className="card w-64 h-[360px] bg-base-100 shadow-md mx-2">
                            <div className="card-body">
                                <h2 className="card-title">{person?.title}</h2>
                                <p>{person?.date}</p>
                                <p>{person?.review}</p>
                            </div>
                        </div>
                    ))
                }
            </Marquee>
        </div>
    );
};

export default Review;
