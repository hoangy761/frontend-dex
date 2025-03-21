import { BookOpen02Icon } from 'hugeicons-react';
import React from 'react';
import { AppDetailInterface } from '~/api/interfaces/app.interface';
import Button from '~/components/Button';
import { formatAddress } from '~/utils';
import { formatDate } from '~/utils/time.format.utils';
interface AppsProps {
  apps: AppDetailInterface[] | undefined;
}

function ListApiKeys({ apps }: AppsProps) {
  return (
    <div>
      <table className="w-full ">
        <thead className="border-b-2 rounded-md border-slate-700">
          <tr>
            <th className="text-start">No</th>
            <th className="text-start">Key</th>
            <th className="text-start">name</th>
            <th className="text-start">Description</th>
            <th className="text-start">Updated</th>
            <th className="text-start">Whitelist domain</th>
            <th className="text-start">Action</th>
          </tr>
        </thead>
        <tbody>
          {apps &&
            apps.length > 0 &&
            apps.map((app, index) => (
              <tr key={app.id}>
                <td>{index + 1}</td>
                <td>{formatAddress(app.apiKey.key)}</td>
                <td>{app.name}</td>
                <td>{app.apiKey.description}</td>
                <td>{formatDate(app.updatedAt)}</td>
                <td>
                  {app.whitelistDomains &&
                    app.whitelistDomains.length > 0 &&
                    app.whitelistDomains.map((domain, index) => (
                      <span key={index}>
                        {domain.domain} {' / '}
                      </span>
                    ))}
                </td>
                <td className="">
                  <Button text to={`/profile/apps/${app.id}`} icon={<BookOpen02Icon />}>
                    Detail
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListApiKeys;
