import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function ProductItem({source, alterText, productName, price}) {
    return (<Link to={"/product-detail"} className="h-100">
        <div className="w-full flex flex-row justify-end z-50 relative top-8">
            <CiHeart size={32}/>
        </div>
        <img src={source} alt={alterText} className="object-fit h-4/5"/>
        <p className="font-bold mt-2">{productName}</p>
        <p>{price}</p>
    </Link>)
}