import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const CreateCategory = () => {
    return (
        <Layout title={"Create Category-Dashboard"}>
            <div className="container-fluid m-3 p-3">
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h2>Create Category</h2>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
