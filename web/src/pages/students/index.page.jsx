import { PDFDocument, rgb } from 'pdf-lib';
import React, { useState } from 'react';
import { AiFillFilePdf } from "react-icons/ai";
import { IoAccessibilitySharp } from "react-icons/io5";

import Loading from '@/components/atoms/Loading';
import Paginations from '@/components/atoms/Pagination';
import PageHeader from '@/components/organisms/PageHeader';
import SelectInput from '@/components/organisms/SelectInput';
import Table from '@/components/organisms/Table';
import Template from '@/components/templates/Template';
import { capitalizeFirstLetter } from '@/hooks/lib/util';
import { Scourse, SDistrict } from '@/hooks/redux/const';

import useHooks from './hooks';

const Dashboard = () => {
  const {
    registrations,
    isLoading,
    currentPage,
    onPageChange,
  } = useHooks();

  const breadcrumbs = [
    {
      href: '#',
      title: 'Student Admission',
      icon: IoAccessibilitySharp,
    },
  ];

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  const courseLabelMap = Scourse.reduce((acc, course) => {
    acc[course.value] = course.label;
    return acc;
  }, {});

  const districtLabelMap = SDistrict.reduce((acc, district) => {
    acc[district.value] = district.label;
    return acc;
  }, {});

  const uniqueAges = [...new Set(registrations.map((reg) => reg.age))].map((age) => ({ value: age, label: age }));
  const uniqueSexes = [...new Set(registrations.map((reg) => reg.sex))].map((sex) => ({ value: sex, label: capitalizeFirstLetter(sex) }));
  const uniqueGenders = [...new Set(registrations.map((reg) => reg.gender))].map((gender) => ({ value: gender, label: capitalizeFirstLetter(gender) }));

  const rows = [
    { key: 'id', header: 'ID', render: (item) => item.id },
    { key: 'lname', header: 'Last Name', render: (item) => item.lname },
    { key: 'fname', header: 'First Name', render: (item) => item.fname },
    { key: 'age', header: 'Age', render: (item) => item.age },
    { key: 'sex', header: 'Sex', render: (item) => capitalizeFirstLetter(item.sex) },
    { key: 'gender', header: 'Gender', render: (item) => capitalizeFirstLetter(item.gender) },
    { key: 'contactnumber', header: 'Contactnumber', render: (item) => item.contactnumber },
    { key: 'email', header: 'Email', render: (item) => item.email },
    { 
      key: 'Scourse',  
      header: 'Course', 
      render: (item) => courseLabelMap[item.selectcourse] || item.selectcourse 
    },
    { 
      key: 'district',  
      header: 'District', 
      render: (item) => districtLabelMap[item.district] || item.district 
    },
    { 
      key: 'action', 
      header: 'Action', 
      render: (item) => (
        <div className="flex space-x-2">
          <button
            onClick={() => generatePdf(item)}
            className="bg-red-500 text-white p-2 rounded"
          >
            <AiFillFilePdf size={24} />
          </button>
        </div>
      )
    },
  ];

  const applyFilters = (registrations) => {
    return registrations.filter((reg) => {
      return (
        (!selectedCourse || reg.selectcourse === selectedCourse) &&
        (!selectedDistrict || reg.district === selectedDistrict) &&
        (!selectedAge || reg.age.toString() === selectedAge) &&
        (!selectedSex || reg.sex.toLowerCase() === selectedSex.toLowerCase()) &&
        (!selectedGender || reg.gender.toLowerCase() === selectedGender.toLowerCase())
      );
    });
  };

  const generatePdf = async (item) => {
    const url = '/Admission_Application-Form1.pdf';
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText(`${item.lname}`, { x: 53, y: 705, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.fname}`, { x: 130, y: 705, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.mname}`, { x: 220, y: 705, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.pref}`, { x: 350, y: 705, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.age}`, { x: 430, y: 700, size: 12, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.monthoption}`, { x: 495, y: 700, size: 9, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.date},`, { x: 527, y: 700, size: 9, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.year}`, { x: 540, y: 700, size: 9, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.contactnumber}`, { x: 170, y: 636, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.email}`, { x: 435, y: 636, size: 9, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.pbirth}`, { x: 170, y: 623, size: 9, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.pbs}`, { x: 170, y: 585, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.barangay}`, { x: 260, y: 585, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.cityM}`, { x: 340, y: 585, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.province}`, { x: 400, y: 585, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.Zcode}`, { x: 530, y: 593, size: 10, color: rgb(0, 0, 0) });

    firstPage.drawText(`${item.F_nameSchool}`, { x: 53, y: 400, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.F_Atrack}`, { x: 206, y: 400, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.F_AMprovince}`, { x: 275, y: 400, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.F_Ygrad}`, { x: 460, y: 400, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.T_nameSchool}`, { x: 53, y: 352, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.T_Atrack}`, { x: 206, y: 352, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.T_AMprovince}`, { x: 275, y: 352, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.T_Ygrad}`, { x: 460, y: 352, size: 10, color: rgb(0, 0, 0) });
   

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    
    window.open(blobUrl, '_blank');
  };

  const filteredRegistrations = applyFilters(registrations);

  // Calculate the slice of registrations to display based on the current page
  const itemsPerPage = 10;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedData = filteredRegistrations.slice(startIdx, endIdx);

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />

      <div className="container mx-auto p-2">
        <div className="flex flex-wrap justify-start items-center mb-8 space-x-4">
          <SelectInput
            options={[{ value: '', label: 'Course' }, ...Scourse]}
            name='course'
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          />
          <SelectInput
            options={[{ value: '', label: 'District' }, ...SDistrict]}
            name='district'
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          />
          <SelectInput
            options={[{ value: '', label: 'Age' }, ...uniqueAges]}
            name='age'
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
          />
          <SelectInput
            options={[{ value: '', label: 'Sex' }, ...uniqueSexes]}
            name='sex'
            value={selectedSex}
            onChange={(e) => setSelectedSex(e.target.value)}
          />
          <SelectInput
            options={[{ value: '', label: 'Gender' }, ...uniqueGenders]}
            name='gender'
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : (
          <>
            <Table rows={rows} data={paginatedData} />
            <div className="mt-4 flex justify-center">
              <Paginations
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalPages={Math.ceil(filteredRegistrations.length / itemsPerPage)}
              />
            </div>
          </>
        )}
      </div>
    </Template>
  );
};

export default Dashboard;
