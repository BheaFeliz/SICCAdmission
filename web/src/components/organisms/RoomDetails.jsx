import React, { useEffect } from 'react';

import StudentTable from '@/components/organisms/StudentTable';
import Template from '@/components/templates/Template';
import { useGetScheduleByIdQuery } from '@/hooks/api/scheduleApi';
import { useGetRegistrationByIdQuery } from '@/hooks/api/studentApi';

const RoomDetails = ({ cardId }) => {
  const { data: scheduling, error: scheduleError, isLoading: scheduleLoading } = useGetScheduleByIdQuery(cardId);
  const { data: students, error: studentsError, isLoading: studentsLoading } = useGetRegistrationByIdQuery(cardId);

  useEffect(() => {
    if (scheduleError || studentsError) {
      console.error('Error fetching data', { scheduleError, studentsError });
    }
  }, [scheduleError, studentsError]);

  if (scheduleLoading || studentsLoading) return <div>Loading...</div>;

  const noDataMessage = "No students found for this schedule.";

  if (scheduleError || studentsError) {
    return (
      <div>
        <p>Error loading data</p>
        {scheduleError && <p>Schedule Error: {scheduleError.message}</p>}
        {studentsError && (
          <>
            <p>Students Error: {studentsError.message}</p>
            {studentsError.message?.includes('No query results for model') && (
              <p>{noDataMessage}</p>
            )}
          </>
        )}
      </div>
    );
  }

  const studentList = students?.registrations || [];
  const roomFull = studentList.length >= 30;

  const columns = [
    { key: 'id', header: 'ID', render: (student) => student.id },
    { key: 'fname', header: 'First Name', render: (student) => student.fname },
    { key: 'lname', header: 'Last Name', render: (student) => student.lname },
    { key: 'age', header: 'Age', render: (student) => student.age },
    { key: 'sex', header: 'Sex', render: (student) => student.sex },
    { key: 'gender', header: 'Gender', render: (student) => student.gender },
    { key: 'contactnumber', header: 'Contact Number', render: (student) => student.contactnumber },
    { key: 'email', header: 'Email', render: (student) => student.email },
    { key: 'course', header: 'Course', render: (student) => student.course },
    { key: 'district', header: 'District', render: (student) => student.district },
  ];

  return (
    <Template>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{scheduling?.roomName || 'Room Name Not Available'}</h2>
        <div className="mb-4">
          <p><strong>Schedule Date:</strong> {scheduling?.date || 'Date Not Available'}</p>
          <p><strong>Start Time:</strong> {scheduling?.startTime || 'Start Time Not Available'}</p>
          <p><strong>End Time:</strong> {scheduling?.endTime || 'End Time Not Available'}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Students:</h3>
          {studentList.length > 0 ? (
            <StudentTable columns={columns} data={studentList} />
          ) : (
            <p>{noDataMessage}</p>
          )}
        </div>
        <div className="mt-4">
          <p>{roomFull ? 'Room Full' : `Slots Available: ${30 - studentList.length}`}</p>
        </div>
      </div>
    </Template>
  );
};

export default RoomDetails;
