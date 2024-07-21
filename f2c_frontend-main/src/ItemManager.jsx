import axios from "axios";
import { useState } from "react";
export default function ItemManager() {
    // const [imgg, setImg] = useState("");
    const [array, setArray] = useState([]);
    const [obj, setObj] = useState({
        email: "",
        category: "",
        item: "",
        pic: null
    })
    function doAdd(event) {
        const { name, value } = event.target;
        setObj({ ...obj, [name]: value });
    }

    async function doFindData() {
        const url = "http://localhost:2003/product/finditem";
        var email = obj.email;
        const servermesg = await axios.post(url,{email});
        if (servermesg.data.status === true) {
            var ans = servermesg.data.res;
            setArray(ans);
            // alert(ans[0].ppicpath);
            // setImg(URL.createObjectURL(ans[0].ppicpath))
            alert("found");
        }
        else {
            alert("not found");
        }
    }

    async function doDelete(object)
    {
        // alert(JSON.stringify(object._id));

        const url = "http://localhost:2003/product/delete-product"
        const serverMsg = await axios.post(url, object);

        // alert(JSON.stringify(serverMsg));
    
    
        if (serverMsg.data.rec.deletedCount == 1)
        {
            alert("Deleted Successfullyyyyy");
            doFindData();
        }
        else
          alert(serverMsg.data.msg + "  " + serverMsg.data.err);

    }
    return (
        <div>
            <div className="flex">
                <div className="w-1/2 ml-10 mt-14">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            onChange={doAdd}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="w-[100px] ml-10 mt-20">
                    <button
                        type="submit"
                        onClick={doFindData}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Fetch
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center mt-10">
                <table className="border-collapse w-3/4">
                    <thead>
                        <tr>
                            <th className="border p-2">Category</th>
                            <th className="border p-2">Item</th>
                            <th className="border p-2">Pic</th>
                            <th className="border p-2">Wanna Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {array.map((objj) => (
                            <tr key={objj.id}>
                                {/* {alert(URL.createObjectURL(objj.ppicpath))} */}
                                <td className="border p-2">{objj.category}</td>
                                <td className="border p-2">{objj.item}</td>
                                <td className="border p-2">
                                    <img src={`http://localhost:2003/uploads/${objj.ppicpath}`} id="prev" alt={objj.ppicpath} className="w-24 h-24" />
                                </td>
                                <td className="border p-2 justify-center">
                                    <button
                                        type="submit"
                                        onClick={() => doDelete(objj)}
                                        className="flex w-1/3 place-content-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            {
                JSON.stringify(obj)
            }
        </div>
    )
}