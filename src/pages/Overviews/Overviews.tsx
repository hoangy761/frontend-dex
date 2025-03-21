import React, { useEffect, useState } from 'react';
import Header from './Header';
import ListApiKeys from './ListApiKeys';
import Box from '~/components/Box';
import { getAppsByDeveloper } from '~/api/developer/app.developer.api';
import { AppDetailInterface } from '~/api/interfaces/app.interface';
import Loading from '~/components/Loading';
const Overviews = () => {
  const [apps, setApps] = useState<AppDetailInterface[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    handleGetMyApps(1, 10);
  }, []);

  async function handleGetMyApps(_page: number, _limit: number) {
    try {
      setIsLoading(true);
      const res = await getAppsByDeveloper(_page, _limit);
      if (res.data.success) {
        const data = res.data.data as { apps: AppDetailInterface[] };
        setApps(data.apps);
      }
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
      throw new Error('Error:::::::', error);
    }
  }
  return (
    <div className="w-full">
      <Box>
        <Header />
      </Box>
      <Box>{isLoading ? <Loading /> : <ListApiKeys apps={apps} />}</Box>
    </div>
  );
};
export default Overviews;
