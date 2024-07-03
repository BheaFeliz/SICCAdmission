import React, { useEffect, useState } from "react";

import Loading from "@/components/atoms/Loading";
import PageHeader from "@/components/organisms/PageHeader";
import Template from "@/components/templates/Template";

import { getStudentsByCardId } from "../api/api";
import useCardDetailsHooks from "./cardIdHooks";

const CardDetails = () => {
  const {
    cardData: schedule,
    isLoading,
    error,
    breadcrumbs,
  } = useCardDetailsHooks();

  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState("");

  // Fetch students when cardId (schedule.id) changes
  useEffect(() => {
    const fetchStudents = async () => {
      if (schedule && schedule.id) {
        try {
          const fetchedStudents = await getStudentsByCardId(schedule.id);
          setStudents(fetchedStudents);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    };

    fetchStudents();
  }, [schedule]);

  const handleAddStudent = async (event) => {
    event.preventDefault();
    if (newStudent.trim() === "") return;

    try {
      const response = await fetch(`/api/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newStudent, cardId: schedule.id }),
      });

      if (response.ok) {
        const createdStudent = await response.json();
        setStudents((prevStudents) => [...prevStudents, createdStudent]);
        setNewStudent("");
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(`/api/students/${studentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setStudents((prevStudents) => prevStudents.filter(student => student.id !== studentId));
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

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
            <h3>Schedule for Card {schedule.id}</h3>
            {students && students.length > 0 ? (
              <ul className="list-disc pl-5">
                {students.map((student) => (
                  <li key={student.id}>
                    {student.name} 
                    <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No students registered for this schedule.</p>
            )}
            <form onSubmit={handleAddStudent}>
              <input
                type="text"
                value={newStudent}
                onChange={(e) => setNewStudent(e.target.value)}
                placeholder="Add new student"
              />
              <button type="submit">Add Student</button>
            </form>
          </div>
        ) : (
          <p>No schedule found.</p>
        )}
      </section>
    </Template>
  );
};

export default CardDetails;
