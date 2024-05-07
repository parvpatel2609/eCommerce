import { useAuth } from '../../context/auth';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react'
import { Dialog,Popover } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Navbar() {

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //handleLogout arrow function
  const handleLogOut = () => {
    try {
      setAuth({
        ...auth,
        user: null,
        token: "",
        role: ""
      });
      localStorage.removeItem('auth');
      navigate("/login");
      toast.success("Logout SuccessFully");
    }
    catch (error) {
      console.log("Error in Logout");
    }
  }

  // useEffect(() => {
  //   console.log(auth);
  // }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <NavLink to={"/"} className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Company Logo" />
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <NavLink to="#" className="font-bold leading-6 text-gray-900"> Home </NavLink>
          <NavLink to="#" className="font-bold leading-6 text-gray-900"> Category </NavLink>
          <NavLink to="#" className="font-bold leading-6 text-gray-900"> Cart </NavLink>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {
            !auth?.user ? (
              <>
                <NavLink to="/register" className="font-bold leading-6 text-gray-900">
                  Register<span aria-hidden="true">&rarr;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </NavLink>
                <NavLink to="/login" className="font-bold leading-6 text-gray-900">
                  Log in<span aria-hidden="true">&rarr;</span>
                </NavLink>
              </>
            ) : (
              <>
                <div className="dropdown">
                  <NavLink className="nav-link  d-flex align-items-center" to="" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={auth.user.photo} alt="Profile Photo"
                      style={{ height: '2.5rem', width: '2.5rem', objectFit: 'cover' }}
                      className="profile-circle" />
                  </NavLink>

                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><a className="dropdown-item" href="#">My Profile</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Logout</a></li>
                  </ul>
                </div>

                {/*
                  <h1 className="text-sm font-semibold leading-6 text-gray-900">
                    {auth.user.name} &nbsp;&nbsp;&nbsp;
                  </h1> 
                */}
                <div className='mx-3'>
                  <NavLink onClick={handleLogOut} className="font-bold leading-6 text-gray-900">
                    LogOut
                  </NavLink>
                </div>
              </>
            )
          }
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <NavLink to="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Home
                </NavLink>
                <NavLink to="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Category
                </NavLink>
                <NavLink to="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Cart
                </NavLink>
              </div>
              <div className="py-6">
                {
                  !auth.user ? (
                    <>
                      <NavLink to="/register" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Register
                      </NavLink>
                      <NavLink to="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Log in
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <h3>Hello</h3>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}