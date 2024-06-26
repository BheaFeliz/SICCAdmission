import { Button } from 'flowbite-react';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';

import Loading from '@/components/atoms/Loading';
import PageHeader from '@/components/organisms/PageHeader';
import Template from '@/components/templates/Template';
import { formatDate, formatTime } from '@/hooks/lib/util';

import useHooks from './hooks';

const CardDetails = () => {
  const {
    cardData: schedule,
    students,
    isLoading,
    error,
    breadcrumbs,
    handleDeleteCard,
  } = useHooks();

  if (isLoading) {
    return (
      <Template>
        <Loading />
      </Template>
    );
  }

  if (error) {
    return (
      <Template>
        <div>Error loading schedule: {error.message}</div>
      </Template>
    );
  }

  return (
    <Template>
      <section>
        <PageHeader
          breadcrumbs={breadcrumbs}
          right={
            <Link href='/cards/new'>
              <Button size='xs' color='warning'>
                Create Card
              </Button>
            </Link>
          }
        />
        {schedule ? (
          <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img className="h-12 w-12" src="/img/card-icon.png" alt="Card icon" />
              </div>
              <div>
                <div className="text-xl font-medium text-black">{formatDate(schedule.date)}</div>
                <p className="text-gray-500">Description: {schedule.description}</p>
              </div>
            </div>
            <div>
              <p>Start Time: {formatTime(schedule.startTime)}</p>
              <p>End Time: {formatTime(schedule.endTime)}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mt-4 mb-2">Students in Room:</h3>
              <ul className="list-disc pl-5">
                {students?.map((student) => (
                  <li key={student.id}>{student.name}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-2">
                {students?.length} of 30 occupied
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Link href={`/cards/${schedule.id}/edit`}>
                <FaEdit className="text-blue-500 text-xl cursor-pointer" />
              </Link>
              <FaTrash
                className="text-red-500 text-xl cursor-pointer"
                onClick={() => handleDeleteCard(schedule.id)}
              />
            </div>
          </div>
        ) : (
          <div>No schedule found</div>
        )}
      </section>
    </Template>
  );
};

export default CardDetails;
