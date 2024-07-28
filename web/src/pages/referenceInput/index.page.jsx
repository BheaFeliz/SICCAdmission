import { Card, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import BreadCrumbs from '@/components/atoms/BreadCrumbs';
import PageHeader from '@/components/organisms/PageHeader';
import Template from '@/components/templates/StudentTemplate';
import Loading from '@/components/atoms/Loading';

function Component() {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

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

    // Start loading state
    setLoading(true);
    setError('');

    try {
      // Simulate data fetching
      await fetchData(referenceNumber);
      // Once data is fetched, update the state
      setDataLoaded(true);
      // Navigate to the new route
      router.push(`/referenceRev?ref=${referenceNumber}`);
    } catch (error) {
      setError('Failed to load data');
    } finally {
      // End loading state
      setLoading(false);
    }
  };

  // Simulate data fetching
  const fetchData = (ref) => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <Template>
      <PageHeader>
        <BreadCrumbs />
      </PageHeader>
      {loading ? (
                <Loading /> // Display loading component while data is being fetched
              ) : (

      <div className='flex justify-center items-right'>
        <Card className='w-96 mb-20'>
          <div className='flex flex-col'>
            <label className='text-sm font-medium text-gray-900 dark:text-white'>
              Input Reference Number:
            </label>
            <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
              <TextInput
                label='name'
                type='text'
                id='name'
                value={referenceNumber}
                onChange={handleInputChange}
                variant="outlined"
                className={error ? 'border-red-500' : ''}
              />
              {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
            </h5>

            <div className='w-full px-1 mt-2 flex justify-end'>
              
                <button
                  onClick={handleSubmit}
                  className='mt-12 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                >
                  Submit
                </button>
            </div>
          </div>
        </Card>
      </div>
      )}
    </Template>
  );
}

export default Component;
