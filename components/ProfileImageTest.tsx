"use client";

import { useState } from 'react';
import ProfileAvatar from './ProfileAvatar';

const ProfileImageTest = () => {
  const [testUrl, setTestUrl] = useState('https://lh3.googleusercontent.com/a/ACg8ocJevwp5Nq3Tf1Y96wVA');

  const testUrls = [
    'https://lh3.googleusercontent.com/a/ACg8ocJevwp5Nq3Tf1Y96wVA',
    'https://lh3.googleusercontent.com/a/ACg8ocJevwp5Nq3Tf1Y96wVA?sz=200',
    'https://lh3.googleusercontent.com/a/ACg8ocJevwp5Nq3Tf1Y96wVA?sz=150',
    'https://via.placeholder.com/150',
    'https://picsum.photos/150/150'
  ];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Profile Image Test</h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">Test URL:</label>
        <input
          type="text"
          value={testUrl}
          onChange={(e) => setTestUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Current Test:</h3>
        <div className="flex items-center space-x-4">
          <ProfileAvatar profileImg={testUrl} fullName="Test User" size="lg" />
          <div>
            <p><strong>URL:</strong> {testUrl}</p>
            <p><strong>Length:</strong> {testUrl.length}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Quick Tests:</h3>
        <div className="grid grid-cols-2 gap-4">
          {testUrls.map((url, index) => (
            <div key={index} className="border p-2 rounded">
              <ProfileAvatar profileImg={url} fullName={`Test ${index + 1}`} size="md" />
              <p className="text-xs mt-1 truncate">{url}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Direct Image Test:</h3>
        <div className="space-y-2">
          {testUrls.map((url, index) => (
            <div key={index} className="flex items-center space-x-2">
              <img 
                src={url} 
                alt={`Test ${index + 1}`}
                className="w-8 h-8 rounded-full"
                onLoad={() => console.log(`Direct image ${index + 1} loaded:`, url)}
                onError={() => console.log(`Direct image ${index + 1} failed:`, url)}
              />
              <span className="text-sm">{url}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileImageTest;
