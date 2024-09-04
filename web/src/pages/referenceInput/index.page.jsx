import { Button, Card, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import BreadCrumbs from '@/components/atoms/BreadCrumbs';
import Loading from '@/components/atoms/Loading';
import PageHeader from '@/components/organisms/PageHeader';
import Template from '@/components/templates/StudentTemplate';

function Component() {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setReferenceNumber(value);
    if (!value) {
      setError('Reference number is required');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!referenceNumber) {
      setError('Reference number is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await fetchData(referenceNumber);
      router.push(`/referenceRev?ref=${referenceNumber}`);
    } catch (error) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <Template>
      <PageHeader>
        <BreadCrumbs />
      </PageHeader>
      {loading ? (
        <Loading />
      ) : (
        <div className='flex justify-center items-center'>
          <Card className='w-96 mb-20'>
            <div className='flex flex-col'>
              <label htmlFor='referenceNumber' className='text-sm font-medium text-gray-900 dark:text-white'>
                Input Reference Number:
              </label>
              <TextInput
                id='referenceNumber'
                type='text'
                value={referenceNumber}
                onChange={handleInputChange}
                className={`mt-1 ${error ? 'border-red-500' : ''}`}
              />
              {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}

              <div className='flex justify-end mt-4 gap-2'>
            <Link href='/studentdashboard'>
              <Button color='failure'>Cancel </Button>
            </Link>

              <Button onClick={handleSubmit}>
                Login
              </Button>

              </div>
            </div>
          </Card>
        </div>
      )}
    </Template>
  );
}

export default Component;
