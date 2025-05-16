import { useHistory, useParams } from 'react-router-dom';

function BookReaderPage() {
  const { id } = useParams();
  const history = useHistory();

  // Direct link to the images HTML version
  const gutenbergUrl = `https://www.gutenberg.org/cache/epub/${id}/pg${id}-images.html`;

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <button
          onClick={() => history.goBack()}
          className="mb-6 text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Collection
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Reading Options</h1>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 mb-6">
            <a
              href={gutenbergUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200 mb-4"
            >
              Read in Browser
            </a>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-4">
              Opens in a new tab. The book will be displayed using your browser's built-in reader.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Download Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href={`https://www.gutenberg.org/ebooks/${id}.epub.noimages`}
                className="block bg-white dark:bg-gray-600 p-4 rounded-lg border border-gray-200 dark:border-gray-500 hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">EPUB Format</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Best for most e-readers</p>
              </a>
              <a
                href={`https://www.gutenberg.org/files/${id}/${id}-pdf.pdf`}
                className="block bg-white dark:bg-gray-600 p-4 rounded-lg border border-gray-200 dark:border-gray-500 hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">PDF Format</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Best for computers and printing</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookReaderPage;