import { useAuth } from '../../context/auth';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { ArrowPathIcon, Bars3Icon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'


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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <NavLink href="#" className="-m-1.5 p-1.5">
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
          <NavLink to="#" className="text-sm font-semibold leading-6 text-gray-900"> Home </NavLink>
          <NavLink to="#" className="text-sm font-semibold leading-6 text-gray-900"> Category </NavLink>
          <NavLink to="#" className="text-sm font-semibold leading-6 text-gray-900"> Cart </NavLink>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {
            !auth.user ? (
              <>
                <NavLink to="/register" className="text-sm font-semibold leading-6 text-gray-900">
                  Register<span aria-hidden="true">&rarr;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </NavLink>
                <NavLink to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                  Log in<span aria-hidden="true">&rarr;</span>
                </NavLink>
              </>
            ) : (
              <>
                <h1>Hello &nbsp;&nbsp;&nbsp;</h1>
                <NavLink onClick={handleLogOut} className="text-sm font-semibold leading-6 text-gray-900">
                  LogOut<span aria-hidden="true">&rarr;</span>
                </NavLink>
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