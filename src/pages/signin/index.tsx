import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { login } from "../../redux/authSlice";
import toastError from "../../utils/toast-error";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { auth } from "../../api";
import { AuthType } from "../../types";
import SetTitle from "../../components/set-title";
import { useSuccess } from "../../hooks";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { visibilityToggleIcon } from "../signup";

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthType.Login>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<AuthType.Login> = async (
    data: AuthType.Login
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await auth.login({
        email: data.email,
        password: data.password,
      });
      useSuccess({ title: result.message });
      dispatch(login({ token: result.token, user: result.user }));
      reset();
      navigate(location?.state?.from?.pathname || "/");
    } catch (error: any) {
      toastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SetTitle title={`SignIn Your Account`} />
      <header>
        <Navbar />
      </header>
      <section className="flex min-h-[600px] items-center justify-center dark:bg-secondary-700">
        <div className="relative rounded-lg border dark:border-secondary-500 p-8 shadow md:w-[450px]">
          <h2 className="text-center mb-4">Sign In your account!</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
              }}
              render={({ field }) => (
                <TextInput
                  type="email"
                  label="Email"
                  placeholder="Email"
                  error={errors.email?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field }) => (
                <div>
                  <PasswordInput
                    label="Password"
                    visibilityToggleIcon={visibilityToggleIcon}
                    placeholder="Password"
                    error={errors.password?.message}
                    {...field}
                  />
                </div>
              )}
            />

            <Button loading={!!isLoading} type={"submit"} fullWidth className="bg-[#824a39] text-white">
              Sign In
            </Button>

            <p>
              Create an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-primary-600 dark:text-white hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SignIn;
