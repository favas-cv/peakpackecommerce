import { Link } from "react-router-dom";

function Activitybar() {
    return (
        <>
            <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-4">
                <Link to="shop?category=Trekking" className="hover:text-orange-400 px-2">
                    [Trekking]
                </Link>
                <Link to="shop?category=Camping" className="hover:text-orange-400 px-2">
                    [Camping]
                </Link>
                <Link to="shop?category=Summer-Trips" className="hover:text-orange-400 px-2">
                    [Summer Trips]
                </Link>
                <Link to="shop?category=Beach-Trips" className="hover:text-orange-400 px-2">
                    [Beach Trips]
                </Link>
                <Link to="shop?category=Winter-Trips" className="hover:text-orange-400 px-2">
                    [Winter Trips]
                </Link>
            </div>
        </>
    );
}

export default Activitybar;
