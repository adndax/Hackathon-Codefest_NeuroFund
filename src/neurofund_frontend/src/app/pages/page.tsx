"use client";
import { useState, useEffect } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../../declarations/neurofund_backend'; 

const agent = new HttpAgent({
  host: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:4943' 
    : 'https://ic0.app'
});

// Untuk development
if (process.env.NODE_ENV === 'development') {
  agent.fetchRootKey().catch(console.error);
}

const neurofundBackend = Actor.createActor(idlFactory, {
  agent,
  canisterId: process.env.NEXT_PUBLIC_NEUROFUND_BACKEND_CANISTER_ID!,
});

export default function TestPage() {
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [canisterId, setCanisterId] = useState('');

  useEffect(() => {
    setCanisterId(process.env.NEXT_PUBLIC_NEUROFUND_BACKEND_CANISTER_ID || 'Not set');
  }, []);

  const testConnection = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Testing connection to backend...');
      const result = await neurofundBackend.greet('Frontend');
      setGreeting(result as string);
      console.log('Success:', result);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
    
    setLoading(false);
  };

  const testTime = async () => {
    setLoading(true);
    setError('');
    
    try {
      const time = await neurofundBackend.getCurrentTime();
      console.log('Current time from backend:', time);
      alert(`Current time: ${time}`);
    } catch (err) {
      console.error('Error getting time:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
    
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Backend Connection Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Environment Info:</h3>
        <p><strong>Canister ID:</strong> {canisterId}</p>
        <p><strong>Network:</strong> {process.env.NODE_ENV}</p>
        <p><strong>Agent Host:</strong> {process.env.NODE_ENV === 'development' ? 'http://localhost:4943' : 'https://ic0.app'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Test Functions:</h3>
        <button 
          onClick={testConnection} 
          disabled={loading}
          style={{ 
            marginRight: '10px', 
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Testing...' : 'Test Greet Function'}
        </button>

        <button 
          onClick={testTime} 
          disabled={loading}
          style={{ 
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Testing...' : 'Test Time Function'}
        </button>
      </div>

      {greeting && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Result:</h3>
          <p style={{ 
            padding: '10px', 
            backgroundColor: '#d4edda', 
            border: '1px solid #c3e6cb',
            borderRadius: '5px',
            color: '#155724'
          }}>
            {greeting}
          </p>
        </div>
      )}

      {error && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Error:</h3>
          <p style={{ 
            padding: '10px', 
            backgroundColor: '#f8d7da', 
            border: '1px solid #f5c6cb',
            borderRadius: '5px',
            color: '#721c24'
          }}>
            {error}
          </p>
        </div>
      )}

      <div>
        <h3>Debug Info:</h3>
        <p>Check browser console for detailed logs</p>
      </div>
    </div>
  );
}