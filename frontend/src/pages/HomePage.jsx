import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);

    //fetching all categories
    const getAllCategory = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/category/getallcategory`);
            console.log(res);
            if (res?.data.success) {
                setCategories(res?.data.category);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    //get products
    const getAllProducts = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/product/get-products`);
            if (res?.data.success) {
                setProducts(res?.data.products);
            }
        }
        catch (error) {
            console, log(error);
            toast.error("Inside Homepage error to get all products")
        }
    }

    useEffect(() => {
       if(!checked.length || !radio.length)  getAllProducts();
    }, [checked.length, radio.length]);

    //filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        }
        else {
            all = all.filter(c => c !== id)
        }
        setChecked(all)
    }

    //get filttered products
    const filteredProduct = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/product/product-filter`, {checked, radio});

            if(res?.data){
                setProducts(res?.data.products);
            }
        } 
        catch (error) {
            console.log(error);    
        }
    } 

    useEffect(() => {
        if(checked.length || radio.length) filteredProduct();
    }, [checked,radio]);

    return (
        <Layout title={"All Products - Best Offers"}>
            <div className='row mt-3'>
                <div className='col-md-3'>
                    <h4 className='text-center'>Filter by category</h4>
                    <div className='d-flex flex-column'>
                        {categories.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => { handleFilter(e.target.checked, c._id) }}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>

                    {/* Price Filter */}
                    <h4 className='text-center mt-4'>Filter by Price</h4>
                    <div className='d-flex flex-column'>
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices.map(p => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                </div>
                <div className='col-md-9'>
                    {JSON.stringify(checked, null, 4)}
                    <h1 className='text-center'>All Products</h1>
                    <div className='d-flex flex-wrap'>
                        {products?.map((item) => (
                            <div className="card m-2" style={{ width: '18rem' }} >
                                <img src={item.image} className="card-img-top" alt={item.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description.substring(0,30)}</p>
                                    <p className="card-text"> ₹ {item.price}</p>
                                    <button className="btn btn-info m-2">More Details</button>
                                    <button className="btn btn-warning m-1">Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage;
