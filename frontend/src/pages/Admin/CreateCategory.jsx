import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';

const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //handle form 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/category/create-category`, { name });
            console.log(res);
            if (res?.data.success) {
                toast.success(`${res.data.category.name} category is created`);
                setName("");
                getAllCategory();
            }
            else {
                toast.error(res.data.message)
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form");
        }
    }

    //update category function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/category/update-category/${selected._id}`, { name: updatedName });
            // console.log(res);
            if (res?.data.success) {
                toast.success(`${res.data.category.name} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }
            else {
                console.log(res);
                toast.error(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong in updating categories form");
        }
    }

    //delete category function
    const handleDelete = async (id) => {

        try {
            const res = await axios.delete(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/category/delete-category/${id}`);
            // console.log(res);
            if (res?.data.success) {
                toast.success(res.data.message);
                getAllCategory();
            }
            else {
                console.log(res);
                toast.error(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong in updating categories form");
        }
    }

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

    return (
        <Layout title={"Create Category-Dashboard"}>
            <div className="container-fluid m-3 p-3">
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h2>Manage Category</h2>
                        <div className='p-3 w-50'>
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {categories?.map((item) => (
                                        <>
                                            <tr key={item._id}>
                                                <td>{item.name}</td>
                                                <td>
                                                    <button className='btn btn-primary ms-2'
                                                        onClick={() => {
                                                            setVisible(true),
                                                            setUpdatedName(item.name),
                                                            setSelected(item)
                                                        }}>
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-danger ms-2"
                                                        onClick={() => {handleDelete(item._id)}}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Modal
                        onCancel={() => { setVisible(false) }}
                        footer={null}
                        visible={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName}
                                handleSubmit={handleUpdate} />
                    </Modal>

                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
