
export const SetupWarning: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ⚠️ Supabase Configuration Required
          </h1>
          <p className="text-gray-600">
            The application cannot connect to the database. Please set up your Supabase credentials.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Setup Steps:</h2>
          <ol className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-primary-600 mr-2">1.</span>
              <span>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">supabase.com</a></span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-primary-600 mr-2">2.</span>
              <span>Run the SQL schema from <code className="bg-gray-200 px-2 py-1 rounded">DATABASE_SCHEMA.md</code> in the Supabase SQL editor</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-primary-600 mr-2">3.</span>
              <span>Copy your Project URL and Anon Key from Supabase Settings → API</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-primary-600 mr-2">4.</span>
              <span>Create a <code className="bg-gray-200 px-2 py-1 rounded">.env</code> file in the project root with:</span>
            </li>
          </ol>
        </div>

        <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm mb-6">
          <div className="text-green-400"># .env</div>
          <div className="mt-2">VITE_SUPABASE_URL=your_supabase_project_url</div>
          <div>VITE_SUPABASE_ANON_KEY=your_supabase_anon_key</div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> After creating your <code className="bg-blue-100 px-2 py-1 rounded">.env</code> file, restart the dev server with <code className="bg-blue-100 px-2 py-1 rounded">npm run dev</code>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Abi wa Ummi Table Water Management System v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};
