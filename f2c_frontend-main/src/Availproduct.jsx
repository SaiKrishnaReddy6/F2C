import { useEffect, useState } from "react"
import axios from "axios";
export default function Availproduct() {
    const [imgg, setImg] = useState("");
    const milkProducts = ["Milk", "Cheese", "Yogurt", "Butter", "Cream", "Cottage Cheese", "Condensed Milk", "Ice Cream"];
    const vegetables = ["carrot", "broccoli", "tomato", "spinach", "cucumber", "bell pepper", "onion", "sweet potato"];
    const fruits = ["apple", "banana", "orange", "strawberry", "grape", "watermelon", "kiwi", "pineapple", "mango", "pear"];
    const [items, setItems] = useState(
        {
            email: "",
            category: "",
            item: "",
            city: "",
            sitem:"",
            // ppic: null
        }
    )
    const [array, setArray] = useState([]);
    const [formCleared, setFormCleared] = useState(false);
    function doAvail(event) {
        var { name, value } = event.target;
        setItems({ ...items, [name]: value });
        if (event.target.value == "Milk Product") {
            setArray(milkProducts);
        }
        else if (event.target.value == "Veg") {
            setArray(vegetables);
        }
        else if (event.target.value == "Fruits") {
            setArray(fruits);
        }
    }
    
    function doSave(event)
    {
        var { name, value } = event.target;
        alert(value);
        setItems({ ...items, [name]: value });
       
    }
    useEffect(()=>{
        var val= "";
        if(items.sitem)
        {
             val = items.sitem + " , " + items.item;
        }
        else{
            val = items.item;
        }
        setItems({ ...items, ["sitem"]: val });
    },[items.item])

    // function doSaveCate(event)
    // {
    //     var { name, value } = event.target;
    //     setItems({ ...items, [name]: value });
    //     event.target.disabled = true;
    // }
    // useEffect(()=>{
    //     var cate = document.getElementById("category");
    //     cate.disabled = true;
    // },[items.category])
    

    // function doupdatepic(event) {
    //     setItems({ ...items, ["ppic"]: event.target.files[0] });
    //     setImg(URL.createObjectURL(event.target.files[0]))
    // }
    function doClearForm(event)
    {
        setItems({...items, ["category"]:"", ["sitem"]:"", ["item"]:""});
        setFormCleared(false);
    }

    async function doAddItems() {
        const url = "http://localhost:2003/product/addItem";
        alert(JSON.stringify(items));
        var formdata = new FormData();
        for (var prop in items) {
            formdata.append(prop, items[prop]);//key value pair
        }

        // alert(JSON.stringify(formdata));
        // const servermesg = await axios.post(url, formdata, { headers: { 'Content-Type': 'multipart/form-data' } });
        const servermesg = await axios.post(url, items);
        if (servermesg.data.status === true) {
            // alert(JSON.stringify(servermesg.data.city));
            setItems({ ...items, ["city"]: servermesg.data.city });
            alert("done");
        }
        else {
            alert(JSON.stringify(servermesg.data.msg) + " " + JSON.stringify(servermesg.data.err))
        }
    }
    return (
        <div className=" px-5">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Avail Product
                </h2>
            </div>
            <div className="ml-10">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="mt-2 w-1/2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        onChange={doAvail}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div className="ml-10 flex mt-5">
                <div className="mt-2 w-1/2 ">
                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                        Product Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        type="text"
                        required
                        onChange={(event)=>{
                            alert(event.target.value);
                            items.category != ""? alert("firstly publish this category or clear the form"): doAvail(event)
                        }}
                        value={items.category}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option defaultChecked>
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

            </div>
            <div className="flex ml-10 mt-5">
                <div className="mt-2 w-1/4">
                    <label htmlFor="item" className="block text-sm font-medium leading-6 text-gray-900">
                        Item of selected category
                    </label>
                    <select
                        id="item"
                        name="item"
                        type="text"
                        required
                        value={items.item}
                        onChange={doSave}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option defaultChecked >select</option>
                        {
                            array.map((obj) => (
                                (<option key={obj}> {obj}
                                </option>)
                            ))
                        }
                    </select>
                </div>
                <div className="ml-4 w-1/4 mt-2">
                    <label htmlFor="sItems" className="block text-sm font-medium leading-6 text-gray-900">
                        Selected Items
                    </label>
                    <div>
                        <input
                            id="sItems"
                            name="sItems"
                            type="text"
                            required
                            readOnly
                            value={items.sitem}
                            onChange={doAvail}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <div className="flex ml-10 mt-2">
                <p>clear form?</p>
                <input className="ml-2 mt-1" onClick={doClearForm} checked={formCleared} type="checkbox"></input>
            </div>
            {/* <div className="flex ml-4 mt-2">
                <div className=" mt-2 w-1/4 ml-5">
                    <label htmlFor="ppic" className="block text-sm font-medium leading-6 text-gray-900">
                        Product Pic
                    </label>
                    <input
                        id="ppic"
                        name="ppic"
                        type="file"
                        required
                        onChange={doupdatepic}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <img src={imgg} id="prev" alt={items.ppicpath} className="w-24 h-24 ml-2"></img>
            </div> */}
            <div className="mt-8 ml-5 flex place-content-center">
                <button
                    type="submit"
                    onClick={doAddItems}
                    className="flex w-[100px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Publish
                </button>
            </div>
            {JSON.stringify(items)}
        </div>
    )
}