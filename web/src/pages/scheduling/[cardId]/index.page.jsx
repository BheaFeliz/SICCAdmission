import Loading from '@/components/atoms/Loading';
import PageHeader from '@/components/organisms/PageHeader';
import Template from '@/components/templates/Template';

import useCardDetailsHooks from './cardIdHooks';

const CardDetails = () => {
  const {
    cardData: schedule,
    students,
    isLoading,
    error,
    breadcrumbs,
  } = useCardDetailsHooks();

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
        <PageHeader breadcrumbs={breadcrumbs} />
        {schedule ? (
          <div>
            {/* Schedule details */}
            {students && students.length > 0 ? (
              <ul className="list-disc pl-5">
                {students.map((student) => (
                  <li key={student.id}>{student.name}</li>
                ))}
              </ul>
            ) : (
              <p>No students registered for this schedule.</p>
            )}
          </div>
        ) : (
          <p>No schedule found.</p>
        )}
      </section>
    </Template>
  );
};

export default CardDetails;
