import * as React from 'react';

interface LoginPageProps {
}

const LoginPage = ({ }: LoginPageProps) => {
    return (
        <div className="flex min-h-[100svh] flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center">
                    {/* <div className="h-12 w-12 rounded-full bg-[#083434] flex items-center justify-center">
                        <img
                            alt="Your Company"
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
                            className="h-8 w-8"
                        />
                    </div> */}
                </div>
                <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-[#083434]">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6 p-4 md:p-8 rounded-lg md:bg-white md:shadow-sm">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="name@company.com"
                                className="block w-full rounded-md px-3 py-2 text-gray-900 border border-gray-300 focus:border-[#083434] focus:ring focus:ring-[#08343430] focus:ring-opacity-50 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-[#083434] hover:text-[#08343490]">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="block w-full rounded-md px-3 py-2 text-gray-900 border border-gray-300 focus:border-[#083434] focus:ring focus:ring-[#08343430] focus:ring-opacity-50 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-[#083434] border-gray-300 rounded focus:ring-[#083434]"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[#083434] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#083434cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#083434] transition-colors duration-200"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                
                <p className="mt-6 text-center text-sm text-gray-500">
                    Don&apos;t have an account?{' '}
                    <a href="#" className="font-medium text-[#083434] hover:text-[#08343490]">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;