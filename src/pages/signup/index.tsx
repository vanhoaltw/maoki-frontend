import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Button from "../../components/ui/button";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <section className="flex min-h-[900px] items-center justify-center">
        <div className="relative rounded-lg border p-8 shadow md:w-[450px]">
          <h2>Create a new account!</h2>
          <div className="mt-4 flex items-center justify-center">
            <button
              type="button"
              className="mb-2 mr-2 rounded-lg border border-secondary-200 bg-white py-1 pe-4 ps-2 text-sm font-medium text-secondary-900 hover:bg-secondary-100 hover:text-primary-600 focus:z-10 focus:outline-none focus:ring-4 focus:ring-secondary-200 dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white dark:focus:ring-secondary-700"
            >
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="google"
                className="inline-block h-8 w-8"
              />
              Continue with Google
            </button>
          </div>
          <div className="inline-flex w-full items-center justify-center">
            <hr className="my-4 h-px w-full border-0 bg-secondary-200 dark:bg-secondary-700" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-secondary-900 dark:bg-secondary-900 dark:text-white">
              or
            </span>
          </div>
          <form>
            <div className="mb-6">
              <label htmlFor="name"> Name</label>
              <input type="text" id="name" placeholder="Name" required />
            </div>

            <div className="mb-6">
              <label htmlFor="email"> email</label>
              <input type="email" id="email" placeholder="Email" required />
            </div>

            <div className="mb-6">
              <label htmlFor="photoURL"> Profile Photo URL</label>
              <input
                type="url"
                id="photoURL"
                placeholder="Photo URL"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phone"> Phone Number</label>
              <input type="text" id="phone" placeholder="Phone" required />
            </div>
            <div className="mb-6">
              <label htmlFor="age"> Age</label>
              <input type="url" id="age" placeholder="Age" required />
            </div>

            <div className="mb-6">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <select
                id="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose Your Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-6 relative">
              <label htmlFor="password"> Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
              />
              <AiFillEyeInvisible className="absolute right-4 top-1/2 text-2xl text-secondary-600 cursor-pointer" />

              {/* <AiFillEye className="absolute right-4 top-1/2 text-2xl text-secondary-600 cursor-pointer" /> */}
            </div>

            <div className="mb-6 relative">
              <label htmlFor="confirm_password"> Confirm Password</label>
              <input
                type="password"
                id="confirm_password"
                placeholder="Confirm Password"
                required
              />
              <AiFillEyeInvisible className="absolute right-4 top-1/2 text-2xl text-secondary-600 cursor-pointer" />

              {/* <AiFillEye className="absolute right-4 top-1/2 text-2xl text-secondary-600 cursor-pointer" /> */}
            </div>

            <Button type={"submit"} className="w-full mb-6">
              Create an account
            </Button>
            <p>
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-bold text-primary-600 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SignUp;
