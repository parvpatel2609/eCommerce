import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'


const AdminDashboard = () => {
  const [auth] = useAuth();
  // console.log(auth);

  return (
    <>
      <Layout title={"Admin Dashboard - Amazon"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className='col-md-3'>
              <AdminMenu />
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h3> Name: {auth?.user?.name}</h3>
                <h3> Email: {auth?.user?.email}</h3>
                <h3> Role: {auth?.user?.role}</h3>
              </div>
            </div>
          </div>
        </div>

        {/*Admin Dashboard*/}
      </Layout>
    </>
  )
}

export default AdminDashboard
