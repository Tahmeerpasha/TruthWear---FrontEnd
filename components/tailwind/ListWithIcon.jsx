import {
    List,
    ListItem,
    ListItemSuffix,
    Card,
    Button,
} from "@material-tailwind/react";
import HomeProductImage from "../User/HomeProductImage";
import { useDispatch } from "react-redux";
import { addToCart, addToCartAsync, removeFromCart } from "@/lib/features/cartSlice";
import { addToCartApi } from "@/logic/utility";


export function ListWithIcon({ item }) {
    const dispatch = useDispatch()
    const handleAddToCart = (product, qty) => {
        if (qty <= 0) {
            dispatch(removeFromCart(product))
        } else {

            dispatch(addToCartAsync({ product, qty }))
            // const prod = { product, qty: qty }
            // dispatch(addToCart(prod))
        }
    }
    const product = item.product
    const quantity = item.qty
    return (
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
                            <Button size="sm" onClick={() => {
                                handleAddToCart(product, quantity - 1)
                                addToCartApi(product, quantity - 1)
                            }}>
                                -
                            </Button>
                            <span className="p-2">{quantity}</span>
                            <Button size="sm" onClick={() => {
                                handleAddToCart(product, quantity + 1)
                                addToCartApi(product, quantity + 1)
                            }}>
                                +
                            </Button>
                        </div>
                    </ListItemSuffix>
                </ListItem>
            </List>
        </Card>
    );
}