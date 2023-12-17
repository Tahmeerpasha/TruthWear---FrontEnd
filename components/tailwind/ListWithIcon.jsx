import {
    List,
    ListItem,
    ListItemSuffix,
    Card,
    Button,
} from "@material-tailwind/react";
import HomeProductImage from "../User/HomeProductImage";
import { useDispatch } from "react-redux";
import { addToCartAsync, removeFromCart } from "@/lib/features/cartSlice";
import { useEffect } from "react";


export function ListWithIcon({ item }) {
    console.log(item)
    const dispatch = useDispatch()
    const product = item.product
    const handleAddToCart = (qty) => {
        const quantity = qty === 0 ? -1 : 1
        dispatch(addToCartAsync(product, quantity))
    }

    useEffect(() => {
        if (item.qty <= 0) {
            dispatch(removeFromCart(product))
        }
    }, [item.qty])

    return (
        <div>
            {item.qty <= 0 ? (
                <div>No Items in cart</div>
            ) : (
                <Card className="w-full">
                    <List >
                        <ListItem ripple={false} className=" flex justify-between py-1 pr-1 pl-4 items-start">
                            <div>
                                <HomeProductImage style={'h-[30%] w-auto rounded-xl p-2 bg-gray-300'} productInfo={product} />
                            </div>
                            <div className="flex justify-start flex-col p-3 pt-2 ">
                                <span className="text-3xl text-black font-bold">{product.productName}</span>
                                <span className="p-1 text-gray-800">{product.description}</span>
                                <span className="p-2 text-red-300">Rs.{product.price}/-</span>
                            </div>
                            <ListItemSuffix className="flex flex-col  items-center">
                                Quantity
                                <div className='flex justify-between items-center w-full p-0'>
                                    <Button size="sm"
                                        onClick={() => {
                                            handleAddToCart(0)
                                        }}
                                    >
                                        -
                                    </Button>
                                    <span className="p-2">
                                        {item.qty}
                                    </span>
                                    <Button size="sm"
                                        onClick={() => {
                                            handleAddToCart(1)
                                        }}
                                    >
                                        +
                                    </Button>
                                </div>
                            </ListItemSuffix>
                        </ListItem>
                    </List>
                </Card>)}
        </div>
    );
}