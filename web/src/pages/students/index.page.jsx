import { Button, TextInput } from 'flowbite-react';
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

  const [searchQuery, setSearchQuery] = useState('');
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
    { key: 'contactnumber', header: 'Contact Number', render: (item) => item.contactnumber },
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
      const matchesSearch = searchQuery
      ? reg.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.fname.toLowerCase().includes(searchQuery.toLowerCase())
      : true;


      return (
        matchesSearch &&
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

    const getTextOrNA = (text) => text ? text : 'N/A';

    const drawTextOrCheckmarkForSex = (text, xMale, yMale, xFemale, yFemale) => {
      if (text.toLowerCase() === 'male') {
        firstPage.drawText('X', { x: xMale, y: yMale, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'female') {
        firstPage.drawText('X', { x: xFemale, y: yFemale, size: 10, color: rgb(0, 0, 0) });
      }
    };

    const drawTextOrCheckmarkForGender = (text, xMan, yMan, xWoman, yWoman, xLGBTQA, yLGBTQA) => {
      if (text.toLowerCase() === 'man') {
        firstPage.drawText('X', { x: xMan, y: yMan, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'woman') {
        firstPage.drawText('X', { x: xWoman, y: yWoman, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'lgbtqa+') {
        firstPage.drawText('X', { x: xLGBTQA, y: yLGBTQA, size: 10, color: rgb(0, 0, 0) });
      }
    };

    const drawTextOrCheckmarkForcivil = (text, xSingle, ySingle, xMarried, yMarried, xWidowed, yWidowed, xSingleP, ySingleP, xCohabitingL, yCohabitingL) => {
      if (text.toLowerCase() === 'single') {
        firstPage.drawText('X', { x: xSingle, y: ySingle, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'married') {
        firstPage.drawText('X', { x: xMarried, y: yMarried, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'widowed') {
        firstPage.drawText('X', { x: xWidowed, y: yWidowed, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === ' singleparent') {
        firstPage.drawText('X', { x: xSingleP, y: ySingleP, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'livein') {
        firstPage.drawText('X', { x: xCohabitingL, y: yCohabitingL, size: 10, color: rgb(0, 0, 0) });
      }
    };

    const drawTextOrCheckmarkForIndigent = (text, xYes, yYes, xNo, yNo) => {
      if (text.toLowerCase() === 'yes') {
        firstPage.drawText('X', { x: xYes, y: yYes, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'no') {
        firstPage.drawText('X', { x: xNo, y: yNo, size: 10, color: rgb(0, 0, 0) });
      } 
    };

    const drawTextOrCheckmarkForFamilyBackground = (text, xPlt, yPlt, xDf, yDf, xDm, yDm, xDr, yDr, xMr, yMr, xPssw, yPssw) => {
      if (text.toLowerCase() === 'plt') {
        firstPage.drawText('X', { x: xPlt, y: yPlt, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'df') {
        firstPage.drawText('X', { x: xDf, y: yDf, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'df') {
        firstPage.drawText('X', { x: xDm, y: yDm, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'dm') {
        firstPage.drawText('X', { x: xDr, y: yDr, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'mr') {
        firstPage.drawText('X', { x: xMr, y: yMr, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'pssw') {
        firstPage.drawText('X', { x: xPssw, y: yPssw, size: 10, color: rgb(0, 0, 0) });
      } 
    };

    const drawTextOrCheckmarkForOfw = (text, xYess, yYess, xNoo, yNoo) => {
      if (text.toLowerCase() === 'yes') {
        firstPage.drawText('X', { x: xYess, y: yYess, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'no') {
        firstPage.drawText('X', { x: xNoo, y: yNoo, size: 10, color: rgb(0, 0, 0) });
      } 
    };

    const drawTextOrCheckmarkForStudentType = (text, xCollege, yCollege, xTrans, yTrans, xReturnee, yReturnee, xCrossenrolle, yCrossenrolle) => {
      if (text.toLowerCase() === 'college1') {
        firstPage.drawText('X', { x: xCollege, y: yCollege, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'trans') {
        firstPage.drawText('X', { x: xTrans, y: yTrans, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'returnee') {
        firstPage.drawText('X', { x: xReturnee, y: yReturnee, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'crossenrolle') {
        firstPage.drawText('X', { x: xCrossenrolle, y: yCrossenrolle, size: 10, color: rgb(0, 0, 0) });
      } 
    };

    const drawTextOrCheckmarkForStuddentCategory = (text, xFtime, yFtime, xWstudent, yWstudent) => {
      if (text.toLowerCase() === 'Ftime') {
        firstPage.drawText('X', { x: xFtime, y: yFtime, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'Wstudent') {
        firstPage.drawText('X', { x: xWstudent, y: yWstudent, size: 10, color: rgb(0, 0, 0) });
      } 
    };

    const drawTextOrCheckmarkForCourse = (text, xBsab, yBsab, xBse, yBse, xBpa, yBpa, xBstmt, yBstmt, xBsc, yBsc) => {
      if (text.toLowerCase() === 'bsab') {
        firstPage.drawText('X', { x: xBsab, y: yBsab, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'bse') {
        firstPage.drawText('X', { x: xBse, y: yBse, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'bpa') {
        firstPage.drawText('X', { x: xBpa, y: yBpa, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'bstmt') {
        firstPage.drawText('X', { x: xBstmt, y: yBstmt, size: 10, color: rgb(0, 0, 0) });
      } else if (text.toLowerCase() === 'bsc') {
        firstPage.drawText('X', { x: xBsc, y: yBsc, size: 10, color: rgb(0, 0, 0) });
      } 
    };

    firstPage.drawText(`${item.reference_number}`, { x: 500, y: 864, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.lname}`, { x: 53, y: 705, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.fname}`, { x: 130, y: 705, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.mname}`, { x: 220, y: 705, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.pref}`, { x: 350, y: 705, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.age}`, { x: 430, y: 700, size: 12, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.monthoption} ${item.date}, ${item.year}`, { x: 494, y: 700, size: 8.5, color: rgb(0, 0, 0) });
    drawTextOrCheckmarkForSex(item.sex, 100, 681, 140, 681);
    drawTextOrCheckmarkForGender(item.gender, 117, 668, 164, 668, 230, 668);
    drawTextOrCheckmarkForcivil(item.civilstatus, 120, 655, 164, 655, 210, 655, 270, 655, 340, 655);
    firstPage.drawText(`${item.contactnumber}`, { x: 170, y: 636, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.email}`, { x: 435, y: 636, size: 9, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.pbirth}`, { x: 170, y: 623, size: 9, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.pbs}`, { x: 170, y: 585, size: 10, color: rgb(0, 0, 0) });
    drawTextOrCheckmarkForIndigent(item.indigentP, 270, 613, 300, 613);
    firstPage.drawText(`${item.indigentPy}`, { x: 419, y: 613, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.barangay}`, { x: 260, y: 585, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.cityM}`, { x: 340, y: 585, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.province}`, { x: 400, y: 585, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.Zcode}`, { x: 530, y: 593, size: 10, color: rgb(0, 0, 0) });
    drawTextOrCheckmarkForFamilyBackground(item.familyB, 85, 546, 85, 533, 85, 520, 267, 547, 267, 533, 267, 520);
    firstPage.drawText(`${item.sincewhen}`, { x: 386, y: 521, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.Nsibling}`, { x: 234, y: 505, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(`${item.supstudy}`, { x: 463, y: 505, size: 10, color: rgb(0, 0, 0) });
    drawTextOrCheckmarkForOfw(item.indigentP, 288, 493, 322, 493);
    firstPage.drawText(`${item.ofwprofession}`, { x: 421, y: 492, size: 10, color: rgb(0, 0, 0) });
    drawTextOrCheckmarkForStudentType(item.studenttype, 139, 465, 266, 465, 373, 465, 445, 465);
    drawTextOrCheckmarkForStuddentCategory(item.StudentCat, 174, 448, 301, 448);
    firstPage.drawText(`${item.Nwork}`, { x: 455, y: 448, size: 10, color: rgb(0, 0, 0) });

    firstPage.drawText(getTextOrNA(item.F_nameSchool), { x: 53, y: 400, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(getTextOrNA(item.F_Atrack), { x: 206, y: 400, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(getTextOrNA(item.F_AMprovince), { x: 275, y: 400, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(getTextOrNA(item.F_Ygrad), { x: 460, y: 400, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(getTextOrNA(item.T_nameSchool), { x: 53, y: 352, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(getTextOrNA(item.T_Atrack), { x: 206, y: 352, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(getTextOrNA(item.T_AMprovince), { x: 275, y: 352, size: 10, color: rgb(0, 0, 0) });
    firstPage.drawText(getTextOrNA(item.T_Ygrad), { x: 460, y: 352, size: 10, color: rgb(0, 0, 0) });

    drawTextOrCheckmarkForCourse(item.selectcourse, 83, 317, 83, 303, 231, 936, 231, 303, 410, 317);

   

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    
    window.open(blobUrl, '_blank');
  };

  const filteredRegistrations = applyFilters(registrations);

  const resetFilters = () => {
    setSelectedCourse('');
    setSelectedDistrict('');
    setSelectedAge('');
    setSelectedSex('');
    setSelectedGender('');
  };

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

        <TextInput
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
          <Button  color="blue" onClick={resetFilters}>
          Reset Filters
          </Button>
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
