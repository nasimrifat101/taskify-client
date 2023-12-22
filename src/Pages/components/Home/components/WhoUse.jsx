import axios from "axios";
import { useEffect, useState } from "react";

const WhoUse = () => {
    const [peoples, setPeople] = useState([])

    useEffect(() => {
        axios.get('/poeple.json')
            .then(res => setPeople(res.data))
            .catch(err => console.log(err))
    }, [])


    return (
        <div className="max-w-6xl mx-auto min-h-screen ">
            <div className="my-auto space-y-10">
                <p className="text-center lg:text-left lg:text-4xl font-bold pt-10">Most Beneficial To</p>
                <div className="p-2 lg:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        peoples?.map(person => (
                            <div key={person.id} className="card lg:w-96 bg-base-100 hover:shadow-green-400 hover:shadow-xl ease-linear duration-500">
                                <div className="card-body">
                                    <h2 className="lg:card-title">{person?.title}</h2>
                                    <p className="text-xs lg:text-lg">{person?.description}</p>

                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    );
};

export default WhoUse;