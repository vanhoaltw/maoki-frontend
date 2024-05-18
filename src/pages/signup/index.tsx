import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Controller, useForm } from "react-hook-form";
import toastError from "../../utils/toast-error";
import { useState } from "react";
import SetTitle from "../../components/set-title";
import { useSuccess } from "../../hooks";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { register } from "../../api/auth";

export const visibilityToggleIcon = ({ reveal }: { reveal?: boolean }) =>
  reveal ? <AiFillEyeInvisible /> : <AiFillEye />;

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    await register(data)
      .then((response) => {
        useSuccess({ title: response.message });
        navigate("/signin");
      })
      .catch((error) => {
        toastError(error);
      });
    setIsLoading(false);
  };

  return (
    <div>
      <SetTitle title={`Create a new account`} />
      <header>
        <Navbar />
      </header>
      <section className="min-h-[700px] py-12  dark:bg-secondary-700 flex items-center justify-center">
        <div className="relative rounded-lg border dark:border-secondary-800 p-8 shadow  md:w-[650px]">
          <h2 className="text-center mb-4">Create a new account!</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Controller
                name={"name"}
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <TextInput
                    label="Full Name"
                    placeholder={"Name"}
                    error={errors?.name?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Email"
                  type="email"
                  placeholder="Email"
                  error={errors?.email?.message}
                  {...field}
                />
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/,
                    message:
                      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
                  },
                }}
                render={({ field }) => (
                  <PasswordInput
                    label="Password"
                    placeholder="Password"
                    error={errors?.password?.message}
                    visibilityToggleIcon={visibilityToggleIcon}
                    {...field}
                  />
                )}
              />

              <Controller
                name="confirm_password"
                control={control}
                rules={{
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                }}
                render={({ field }) => (
                  <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    id="confirm_password"
                    visibilityToggleIcon={visibilityToggleIcon}
                    error={errors?.confirm_password?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <Button
              loading={isLoading}
              type={"submit"}
              fullWidth
              className="bg-[#824a39] text-white"
            >
              Create an account
            </Button>
            <p>
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-bold text-primary-600 dark:text-white hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SignUp;
