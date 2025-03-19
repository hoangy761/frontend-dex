import { Add01Icon, Delete02Icon } from 'hugeicons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAppByAppId, updateAppByAppId } from '~/api/developer/app.developer.api';
import { UpdateAppInterface, WhitelistDomainsInterface } from '~/api/interfaces/app.interface';
import Button from '~/components/Button';
import CustomModal from '~/components/Modal/Modal';
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
  whitelistDomains: WhitelistDomainsInterface[];
};
type AppDetailProps = {
  app: AppDetailType | undefined;
  setApp: (_app: AppDetailType) => void;
};

// eslint-disable-next-line react/prop-types
function AppDetail({ app, setApp }: AppDetailProps) {
  const [numberOfDomain, setNumberOfDomain] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [whitelistDomains, setWhitelistDomains] = useState<WhitelistDomainsInterface[]>([{ domain: '' }]);
  const navigate = useNavigate();
  useEffect(() => {
    if (app) {
      setName(app.name);
      setDescription(app.description);
      setWhitelistDomains(app.whitelistDomains || [{ domain: '' }]);
    }
  }, [app]);

  async function handleDeleteApp(_id: string) {
    try {
      const res = await deleteAppByAppId(_id);
      if (res.data.success) {
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleModalOpenId() {
    setIsModalOpen(true);
  }
  async function handleUpdateApp() {
    try {
      if (!app) return;
      const body: UpdateAppInterface = {
        name: name || app.name,
        description: description || app.description,
        whitelistDomains: whitelistDomains || app.whitelistDomains,
      };
      const res = await updateAppByAppId(app.id, body);
      if (res.data.success) {
        setApp(res.data.data as AppDetailType);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleUpdateWhitelistDomains(_index: number, _value: string) {
    setWhitelistDomains((prevDomains) =>
      prevDomains.map((item, index) => (index === _index ? { ...item, domain: _value } : item)),
    );
  }
  function handleDeleteWhitelistDomain(_index: number) {
    setWhitelistDomains((prevDomains) => prevDomains.filter((_, index) => index !== _index));
  }

  function handleAddWhitelistDomains() {
    const newDomain = { domain: '' };
    console.log('test:::', whitelistDomains[whitelistDomains.length - 1]);

    if (!whitelistDomains[whitelistDomains.length - 1].domain) return;
    setWhitelistDomains((prevDomains) => [...prevDomains, newDomain]);
  }

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
                <th className="text-start">Created At</th>
                <th className="text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{app.name}</td>
                <td>{app.apiKey.key}</td>
                <td>9999</td>
                <td>{app.createdAt}</td>
                <td className="flex space-x-2">
                  <Button white onClick={handleModalOpenId}>
                    Update
                  </Button>
                  <Button error onClick={() => handleDeleteApp(app.id)} icon={<Delete02Icon />}></Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Update App Info"
        handle={handleUpdateApp}
        acctionName="Update"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block">
              Name<span className="text-error">*</span>
            </label>
            <input
              id="name"
              className="text-black rounded-md w-full h-10 px-4 focus:outline-none"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={app?.name}
            ></input>
          </div>
          <div>
            <label htmlFor="description" className="block">
              Description
            </label>
            <input
              id="description"
              className="text-black rounded-md w-full h-10 px-4 focus:outline-none"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor={`description_${whitelistDomains.length}`} className="block">
              Whitelist domain
            </label>

            {Array.from({ length: whitelistDomains.length }).map((domain, index) => (
              <div key={index} className="flex justify-between space-x-4 space-y-2 items-center">
                <p className="w-8">{index + 1} -</p>
                <input
                  id={`description_${index + 1}`}
                  className="text-black rounded-md flex-1 h-10 px-4 focus:outline-none"
                  type="text"
                  value={whitelistDomains[index]?.domain || ''}
                  onChange={(e) => handleUpdateWhitelistDomains(index, e.target.value)}
                ></input>
                {index + 1 === whitelistDomains.length ? (
                  <Button
                    text
                    className="text-blue-500"
                    onClick={() => handleAddWhitelistDomains()}
                    icon={<Add01Icon />}
                  ></Button>
                ) : (
                  <Button icon={<Delete02Icon />} onClick={() => handleDeleteWhitelistDomain(index)}></Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </CustomModal>
    </div>
  );
}

export default AppDetail;
