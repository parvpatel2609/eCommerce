import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import Layout from './../../components/Layout/Layout';
import { Link } from 'react-router-dom';

const Products = () => {

    const [products, setProducts] = useState([]);

    //get all products
    const getAllProducts = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/product/get-products`);
            console.log(res);
            if (res?.data.success) {
                setProducts(res?.data.products);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong to getting all products");
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);


    return (
        <Layout title='Admin - All Products'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Products List</h1>
                    {/*
                    <div className="card" style={{ width: '18rem' }}>
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    */}

                    <div className='d-flex'>
                        {products?.map((item) => (
                            <Link key={item._id} to={`/dashboard/admin/product/${item.slug}`} className=''>
                                <div className="card m-2" style={{ width: '18rem' }} >
                                    <img src={item.image} className="card-img-top" alt={item.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
