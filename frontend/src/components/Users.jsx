import { useEffect, useState } from 'react';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:5000/api/subscribers/');
            const data = await res.json();
            setUsers(data);
        })();
    }, []);

    // Accepts either a Date or a date-string, returns 0 if expired
    const calculateDaysRemaining = (endDateInput) => {
        const today = new Date();
        // Parse the incoming value if it's not already a Date
        const endDate = endDateInput instanceof Date
            ? endDateInput
            : new Date(endDateInput);

        // Normalize both dates to midnight to avoid fractional days
        const utcToday = Date.UTC(
            today.getFullYear(), today.getMonth(), today.getDate()
        );
        const utcEnd = Date.UTC(
            endDate.getFullYear(), endDate.getMonth(), endDate.getDate()
        );

        const diffInMs = utcEnd - utcToday;
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

        return diffInDays > 0 ? diffInDays : 0;
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Subscribers List</h2>
            <div className="space-y-4">
                {users.map((sub) => {
                    const daysLeft = calculateDaysRemaining(sub.endDate);

                    return (
                        <div
                            key={sub._id}
                            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-md rounded-lg p-4"
                        >
                            <div>
                                <p className="text-lg font-medium">{sub.userId}</p>
                                <p className="text-sm text-gray-500">
                                    Plan: {sub.subscriptionPlan}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Started: {new Date(sub.startDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Ends: {new Date(sub.endDate).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="mt-2 md:mt-0">
                                {sub.isActive ? (
                                    daysLeft === 0 ? (
                                        <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                                            Expired
                                        </span>
                                    ) : (
                                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                            {daysLeft} day{daysLeft > 1 ? 's' : ''} remaining
                                        </span>
                                    )
                                ) : (
                                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">
                                        Inactive
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Users;
