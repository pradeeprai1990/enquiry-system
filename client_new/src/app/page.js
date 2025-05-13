"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { ToastContainer, toast } from 'react-toastify';
export default function Home() {
  let [enquiryList, setEnquiryList] = useState([])
  let [currenId,setCurrentId]=useState(null)
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')
  let saveEnquiry = (event) => {
    event.preventDefault();
    let obj = {
      name,
      email,
      phone
    }

    if(currenId){
        //Update
        axios.put(`http://localhost:8000/enquiry/update/${currenId}`, obj)
        .then((res) => res.data)
        .then((finaLres) => {
          if (finaLres.status) {
            toast.success(finaLres.msg)
            setName('')
            setEmail('')
            setPhone('')
            setCurrentId(null)
            getProduct()
          }
      })
    }
    else{
      axios.post('http://localhost:8000/enquiry/save', obj)
      .then((res) => res.data)
      .then((finaLres) => {
        if (finaLres.status) {
          toast.success(finaLres.msg)
          setName('')
          setEmail('')
          setPhone('')
         
          getProduct()
        }
      })
    }

    
  }


  let getProduct = () => {
    axios.get(`http://localhost:8000/enquiry/view`)
      .then((res) => res.data)
      .then((finalRes) => {
        setEnquiryList(finalRes.data)
      })
  }

  useEffect(() => {
    getProduct()
  }, [])

  let deleteRow = (delId) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/enquiry/delete/${delId}`)
          .then((res) => res.data)
          .then((finalres) => {

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });

            getProduct()
          })
      }
    });


  }


  let getSingleRow=(id)=>{
    setCurrentId(id)
    axios.get(`http://localhost:8000/enquiry/single/${id}`)
    .then((res)=>res.data)
    .then((finalRes)=>{
      console.log(finalRes.data)
      setName(finalRes.data.name)
      setEmail(finalRes.data.email)
      setPhone(finalRes.data.phone)
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-[30%_auto] gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Contact Form</h2>
          <form onSubmit={saveEnquiry} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              { currenId ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Contact List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  enquiryList.length >= 1 ?
                    enquiryList.map((items, index) => {

                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> {index + 1} </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> {items.name}

                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{items.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{items.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={()=>getSingleRow(items._id)} className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                            <button className="text-red-600 hover:text-red-900"
                              onClick={() => deleteRow(items._id)}>


                              Delete</button>
                          </td>
                        </tr>
                      )
                    })


                    :
                    <tr>
                      <td colSpan={6}> No Data Found </td>
                    </tr>


                }


              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
