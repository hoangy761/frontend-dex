import React from 'react';
import Button from '~/components/Button';
type ApiKeyType = {
  id: string;
  key: string;
  accessLevel: string;
  type: string;
};
export type AppDetailType = {
  id: string;
  isActve: boolean;
  name: string;
  description: string;
  apiKey: ApiKeyType;
  createdAt: string;
};
type AppDetailProps = {
  app: AppDetailType | undefined;
};

// eslint-disable-next-line react/prop-types
function AppDetail({ app }: AppDetailProps) {
  return (
    <div>
      {app && (
        <div className="bg-black rounded-md mt-1 p-6">
          <table className="w-full ">
            <thead className="border-b-2 rounded-md border-slate-700">
              <tr>
                <th className="text-start">name</th>
                <th className="text-start">key</th>
                <th className="text-start">Number users</th>
                <th className="text-start">Updated</th>
                <th className="text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{app.name}</td>
                <td>{app.apiKey.key}</td>
                <td>9999</td>
                <td>{app.createdAt}</td>
                <td>
                  <Button white>Delete</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AppDetail;
