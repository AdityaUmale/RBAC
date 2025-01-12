const UnauthorizedPage = () => {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4">You don't have permission to access this page.</p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Go to Home
        </button>
      </div>
    );
  };
  
  export default UnauthorizedPage;