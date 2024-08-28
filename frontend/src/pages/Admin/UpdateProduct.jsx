import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select;

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");
    const [photo, setPhoto] = useState(null);
    const [existingPhoto, setExisitingPhoto] = useState();

    const navigate = useNavigate();
    const params = useParams();

    //get single product
    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/product/get-products/${params.slug}`);
            console.log(res);
            if (res?.data) {
                setName(res?.data.product.name);
                setDescription(res?.data.product.description);
                setPrice(res?.data.product.price);
                setQuantity(res?.data.product.quantity);
                setCategory(res?.data.product.category._id);
                setShipping(res?.data.product.shipping);
                setId(res?.data.product._id);
                setExisitingPhoto(res?.data.product.image);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Somthing went wrong");
        }
    }

    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);

    //fetching all categories
    const getAllCategory = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/category/getallcategory`);
            // console.log(res);
            if (res?.data.success) {
                setCategories(res?.data.category);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Error in getting category");
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    //update product
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            // const productData = new FormData();
            // productData.append("name", name);
            // productData.append("description", description);
            // productData.append("price", price);
            // productData.append("quantity", quantity);
            // // if (photo) productData.append("image", photo);
            // productData.append("category", category);
            // productData.append("shipping", shipping);
            // productData.append("image", photo);

            let res;

            if (photo) {
                // if the image is updated
                // res = await axios.put(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/product/update-product-with-image/${id}`, productData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // });

                const formData = new FormData();
                formData.append("name", name);
                formData.append("description", description);
                formData.append("price", price);
                formData.append("quantity", quantity);
                formData.append("category", category);
                formData.append("shipping", shipping);
                formData.append("photo", photo);

                res = await axios.put(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/product/update-product-with-image/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                // image is not updated
                res = await axios.put(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/product/update-product/${id}`, { name, description, price, category, quantity, shipping });
            }

            //if response comes from server
            if (res?.data.success) {
                toast.success("Product created successfully");
                navigate('/dashboard/admin/products');
            }
            else {
                toast.error(res?.data.message || "Failed to create product");
                console.log(res?.data);
            }
        }
        catch (error) {
            console.log("Error inside creating new product: ", error);
            toast.error("Something went wrong");
        }
    }

    //delete the product function
    const handleDelete = async () => {
        try {
            let answer = window.confirm("Are you really want to delete this product?");
            if(!answer) return;
            const res = await axios.delete(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/product/delete-product/${id}`);
            if(res?.data){
                console.log(res);
                toast.success(res?.data.message);
                navigate('/dashboard/admin/products');
            }
        } 
        catch (error) {
            console.log(error);
            toast.error("Something went wrong to delete product")    
        }
    }


    return (
        <Layout title={"Update Product-Dashboard"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h2>Update Product</h2>
                        <div className='m-1'>
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size='large'
                                showSearch
                                className='form-select mb-3'
                                value={category}
                                onChange={(value) => { setCategory(value) }}>
                                {
                                    categories?.map(item => (
                                        <Option key={item._id} value={item._id}> {item.name} </Option>
                                    ))
                                }
                            </Select>

                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary'>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type='file' name='photo' accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>

                            <div className='mb-3'>
                                {photo ? (
                                    <div className='tesxt-center'>
                                        <img src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={'200px'}
                                            className='img img-responsive' />
                                    </div>
                                ) : existingPhoto ? (
                                    <div className='text-center'>
                                        <img src={existingPhoto}
                                            alt="product_photo"
                                            height={'200px'}
                                            className='img img-responsive' />
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <p>No image available</p>
                                    </div>
                                )}
                            </div>

                            <div className='mb-3'>
                                <input type='text'
                                    value={name}
                                    placeholder='Product name'
                                    className='form-control'
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>

                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="Product description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="Quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping"
                                    size="large"
                                    showSearch
                                    value={shipping ? shipping.toString() : ""}
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                >
                                    <Option value="not shipped">Not shipped</Option>
                                    <Option value="shipped">shipped</Option>
                                    <Option value="delivered">delivered</Option>
                                </Select>
                            </div>

                            <div className='mb-3'>
                                <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
                                <button className='btn btn-danger ml-3' onClick={handleDelete}>Delete Product</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct
