import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutate } from '../hooks/useMutate';
import Cookies from 'js-cookie';
import { notify } from '../../utils/toast';
import type { CError_TP } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Button } from '../atoms/buttons/Button';

type LoginResponse_TP = {
    token: string;
};

type LoginData_TP = {
    phone: string;
    password: string;
};

const Login = () => {
    const navigate = useNavigate();
    const { mutate, isLoading } = useMutate<LoginResponse_TP, LoginData_TP>({
        endpoint: 'auth/login',
        mutationKey: ['login'],
        onSuccess: (data: LoginResponse_TP) => {
            Cookies.set('token', data?.data?.token);
            notify('success', 'Login successful');
            navigate('/dashboard');
        },
        onError: (err: CError_TP) => {
            notify('error', err.response?.data?.message || 'Login failed');
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Login to Dashboard</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Enter your credentials</p>
                    </div>

                    <Formik
                        initialValues={{ phone: '', password: '' }}
                        onSubmit={(values) => {
                            mutate(values);
                        }}
                    >
                        <Form className="space-y-5">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    Phone Number
                                </label>
                                <Field
                                    name="phone_number"
                                    type="text"
                                    placeholder="Enter phone number"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primaryDark dark:focus:border-primaryLight focus:ring-1 focus:ring-primaryDark dark:focus:ring-primaryLight outline-none transition"
                                />
                                <ErrorMessage name="phone_number" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    Password
                                </label>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primaryDark dark:focus:border-primaryLight focus:ring-1 focus:ring-primaryDark dark:focus:ring-primaryLight outline-none transition"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                loading={isLoading}
                                // variant="primary"
                                fullWidth={true}
                            >
                                Login
                            </Button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login;