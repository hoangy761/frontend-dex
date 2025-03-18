import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAppByAppId } from '~/api/developer/app.developer.api';
import Loading from '~/components/Loading';
import Header from '~/pages/Dashboard/Header';
import AppDetail, { AppDetailType } from './AppDetail';
function DeveloperApp() {
  const [app, setApp] = useState<AppDetailType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      _getAppByAppId(id);
    }
  }, [id]);
  async function _getAppByAppId(_id: string) {
    try {
      setIsLoading(true);
      const data = await getAppByAppId(_id);
      setApp(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Not found');
    }
  }
  return (
    <div>
      <Header />
      {isLoading ? <Loading /> : <AppDetail app={app} />}
      <span>{errorMessage}</span>
    </div>
  );
}

export default DeveloperApp;
