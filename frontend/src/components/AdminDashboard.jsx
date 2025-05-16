import { useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { useDarkMode } from './DarkModeProvider';
import { Redirect } from 'react-router-dom';
import BookList from './BookList';
import UploadBooks from './UploadBooks';
import Users from './Users';

const tabs = [
  { name: 'Upload', id: 'add' },
  { name: 'User List', id: 'list' },
  { name: 'Book List', id: 'book_list' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('add');
  const { user } = useContext(AuthContext);
  const { isDarkMode } = useDarkMode();

  if (!user?.isAdmin) {
    return <Redirect to="/signin" />;
  }

  return (
    <div className={`max-w-4xl mx-auto mt-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg`}>
      {/* Tab headers */}
      <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                `px-6 py-3 font-medium focus:outline-none border-b-2 transition-colors ` +
                (activeTab === tab.id
                  ? `border-pink-500 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`
                  : `border-transparent ${isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:border-gray-600' : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'}`)
              }
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab panels */}
      <div className={`p-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        {activeTab === 'add' && <UploadBooks />}
        {activeTab === 'list' && <Users />}
        {activeTab === 'book_list' && <BookList />}
      </div>
    </div>
  );
};

export default AdminDashboard;
