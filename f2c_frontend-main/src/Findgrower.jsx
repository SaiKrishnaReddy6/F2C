import axios from "axios";
import { useState, useEffect } from "react";
export default function Findgrower() {
    const [array, setArray] = useState([]);
    const [data, setData] = useState([]);
    const milkProducts = ["Milk", "Cheese", "Yogurt", "Butter", "Cream", "Cottage Cheese", "Condensed Milk", "Ice Cream"];
    const vegetables = ["carrot", "broccoli", "tomato", "spinach", "cucumber", "bell pepper", "onion", "sweet potato"];
    const fruits = ["apple", "banana", "orange", "strawberry", "grape", "watermelon", "kiwi", "pineapple", "mango", "pear"];
    const [arr, setArr] = useState([]);
    function doAvail(event) {
        var { name, value } = event.target;
        setItems({ ...items, [name]: value });
        if (event.target.value == "Milk Product") {
            setArr(milkProducts);
        }
        else if (event.target.value == "Veg") {
            setArr(vegetables);
        }
        else if (event.target.value == "Fruits") {
            setArr(fruits);
        }
    }
    const [items, setItems] = useState(
        {
            category: "",
            sitem: "",
            city: ""
        }
    )
    function addCity(event) {
        var { name, value } = event.target;
        setItems({ ...items, [name]: value });
    }

    useEffect(() => {
        doFindd();
    }, [items.sitem]);

    async function doFindd() {
        if (items.category && items.sitem) {
            const url = "http://localhost:2003/product/doFindCity";
            var obj = {
                category: items.category,
                sitem: items.sitem
            }
            const servermesg = await axios.post(url, obj);
            if (servermesg.data.status === true) {
                if (servermesg.data.res) {
                    alert(servermesg.data.res);
                    setArray(servermesg.data.res);
                    // const ans = servermesg.data.res;
                    // alert(JSON.stringify(ans));
                    // const UniqueArray =[];
                    // ans.map((obj)=>(
                    //     UniqueArray.ap(obj.city)
                    // ))
                    // setArray(UniqueArray);
                    // alert("done");
                }
            }
            else {
                alert(JSON.stringify(servermesg.data.msg) + " " + JSON.stringify(servermesg.data.err))
            }
        }
    }
    async function doSave(event) {
        var { name, value } = event.target;
        setItems({ ...items, [name]: value });
    }

    async function doFindGrower() {
        const url = "http://localhost:2003/product/doFindGrower";
        const servermesg = await axios.post(url, items);
        alert(JSON.stringify(servermesg.status));
        if (servermesg.data) {
                alert(JSON.stringify(servermesg.data));
                setData(servermesg.data);
                alert("done");
        }
        else {
            alert(JSON.stringify(servermesg.data.msg) + " " + JSON.stringify(servermesg.data.err))
        }
    }

    return (
        <>
            <div className=" px-5">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Find Growers
                    </h2>
                </div>
                <div className="ml-10 grid grid-cols-3 mt-5">
                    <div className="mt-2 w-1/2 ">
                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                            Product Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            type="text"
                            required
                            onChange={doAvail}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option>
                                Select
                            </option>
                            <option>
                                Milk Product
                            </option>
                            <option>
                                Veg
                            </option>
                            <option>
                                Fruits
                            </option>
                        </select>
                    </div>
                    <div className="mt-2 w-1/2">
                        <label htmlFor="sitem" className="block text-sm font-medium leading-6 text-gray-900">
                            Item of selected category
                        </label>
                        <select
                            id="sitem"
                            name="sitem"
                            type="text"
                            required
                            onChange={doSave}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            <option>select</option>
                            {
                                arr.map((obj) => (
                                    (<option key={obj}> {obj}
                                    </option>)
                                ))
                            }
                        </select>
                    </div>
                    <div className="mt-2 w-1/2">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            City
                        </label>
                        <select name="city" onChange={addCity} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option>select</option>
                            {
                                array.map((objj) => (
                                    <option key={objj.id}>{objj.city}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="mt-8 ml-5 flex place-content-center">
                    <button
                        type="submit"
                        onClick={doFindGrower}
                        className="flex w-[100px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Search
                    </button>
                </div>
                {JSON.stringify(items)}
                <div className="flex">
                    {data.map((obj) => (
                        <div className="h-64 w-52 border border-black">
                            <table key={obj.id}>
                                <tbody>
                                    <tr>
                                        <td>
                                            email: {obj.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            category: {obj.category}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            item: {obj.sitem}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            city: {obj.city}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}