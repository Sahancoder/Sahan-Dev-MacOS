import React from 'react';
import { HardDrive, Folder, Image } from 'lucide-react';

const ThisPC = () => {
  const partitions = [
    { name: 'Local Disk (C:)', type: 'System', used: '120 GB', total: '250 GB', icon: <HardDrive className="text-blue-500" size={48} /> },
    { name: 'Local Disk (D:)', type: 'Data', used: '450 GB', total: '1 TB', icon: <HardDrive className="text-green-500" size={48} /> },
    { name: 'Local Disk (E:)', type: 'Projects', used: '80 GB', total: '500 GB', icon: <HardDrive className="text-purple-500" size={48} /> },
  ];

  const folders = [
    { name: 'Documents', icon: <Folder className="text-blue-400" size={48} /> },
    { name: 'Pictures', icon: <Image className="text-pink-400" size={48} /> },
    { name: 'Downloads', icon: <Folder className="text-green-400" size={48} /> },
  ];

  return (
    <div className="h-full bg-gray-50 overflow-auto">
      {/* Partitions Section */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Devices and drives</h2>
        <div className="grid grid-cols-3 gap-4">
          {partitions.map((partition, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                {partition.icon}
                <h3 className="mt-3 font-medium text-sm">{partition.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{partition.type}</p>
                <div className="w-full mt-3">
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${(parseInt(partition.used) / parseInt(partition.total)) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {partition.used} of {partition.total} used
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Folders Section */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Folders</h2>
        <div className="grid grid-cols-4 gap-4">
          {folders.map((folder, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                {folder.icon}
                <h3 className="mt-2 font-medium text-sm">{folder.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThisPC;

