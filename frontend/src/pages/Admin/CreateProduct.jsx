import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();

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

    //create product
    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            if(shipping=='0'){
                setShipping("not shipped");
            }
            else if(shipping=='1'){
                setShipping("shipped");
            }
            else{
                setShipping("delivered");
            }
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("image", photo);
            productData.append("category", category);
            productData.append("shipping", shipping);

            const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/product/create-product`,productData); 
            if(res?.data?.success){
                toast.success("Product created successfully");
                navigate('/dashboard/admin/products');
            }
            else{
                toast.error(res?.data?.message || "Failed to create product");
                console.log(res?.data);
            }
        } 
        catch (error) {
            console.log("Error inside creating new product: ",error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout title={"Create Product-Dashboard"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h2>Create Product</h2>
                        <div className='m-1'>
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size='large'
                                showSearch
                                className='form-select mb-3'
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
                                {photo && (
                                    <div className='tesxt-center'>
                                        <img src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={'200px'}
                                            className='img img-responsive' />
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
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
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
                                <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct
