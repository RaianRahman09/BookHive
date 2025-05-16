import axios from "axios";
import { AlertTriangle, Clock, CreditCard, Mail, Moon, Sun, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useDarkMode } from "./DarkModeProvider";
import LovedBooks from "./LovedBooks";

export default function Dashboard() {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await axios.post("http://localhost:5000/api/check-subscription/", { email: user?.email });
                setStatus(res.data);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Could not fetch subscription status.");
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchStatus();
        } else {
            setLoading(false);
        }
    }, [user?.email]);

    // Determine subscription state
    const hasSubscription = Boolean(status?.subscription);
    const isActive = status?.active;
    let stateLabel = "Not Subscribed";

    if (hasSubscription) {
        stateLabel = isActive ? "Active" : "Expired";
    }

    // Calculate days remaining if active
    const endDate = hasSubscription ? new Date(status.subscription.endDate) : null;
    const today = new Date();
    const diffInDays = endDate ? Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)) : 0;

    if (loading) {
        return (
            <div className="min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500 mx-auto mb-3"></div>
                    <p className="text-gray-600">Loading subscription status...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[300px] flex items-center justify-center">
                <div className="text-center bg-red-50 p-6 rounded-lg max-w-md">
                    <AlertTriangle size={36} className="text-red-500 mx-auto mb-3" />
                    <p className="text-red-600 font-medium mb-1">Error Loading Data</p>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4">
                {/* Profile Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Profile</h2>
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full">
                                <User className="h-6 w-6 text-pink-500 dark:text-pink-300" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-800 dark:text-white">{user?.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subscription Status */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Subscription Status</h2>
                        {loading ? (
                            <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                            </div>
                        ) : error ? (
                            <div className="flex items-center space-x-2 text-red-500">
                                <AlertTriangle size={20} />
                                <span>{error}</span>
                            </div>
                        ) : !status?.subscription ? (
                            <div className="text-center">
                                <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">No Active Subscription</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">Start a subscription to enjoy premium features.</p>
                                <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-lg transition-colors duration-200">
                                    Subscribe Now
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Plan & Status */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Active Plan</p>
                                        <p className="text-lg font-medium text-gray-800 dark:text-white capitalize">{status.subscription.subscriptionPlan}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                                        <div className="flex items-center space-x-2">
                                            {status.active ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                                                    Inactive
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Subscription Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="flex items-start space-x-3">
                                        <Clock className="text-pink-500 dark:text-pink-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-white">Start Date</p>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                {new Date(status.subscription.startDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CreditCard className="text-pink-500 dark:text-pink-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-white">Next Payment</p>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                {new Date(status.subscription.endDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Mail className="text-pink-500 dark:text-pink-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-white">Billing Email</p>
                                            <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Loved Books Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="p-6">
                        <LovedBooks />
                    </div>
                </div>
            </div>
        </div>
    );
}
