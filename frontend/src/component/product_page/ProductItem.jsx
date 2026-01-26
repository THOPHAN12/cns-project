import { Link } from "react-router-dom";

export default function ProductItem({source, alterText, productName, price}) {
    return (<Link to={"/product-detail"} className="h-140 py-5">
        <img src={source} alt={alterText} sizes="14" width={400} height={800} className="object-fill h-4/5"/>
        <p className="font-bold mt-2">{productName}</p>
        <p>{price}</p>
    </Link>)
}