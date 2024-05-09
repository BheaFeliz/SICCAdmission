import { Card } from 'flowbite-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { SiGoogleforms } from 'react-icons/si';

import PageHeader from '@/components/organisms/PageHeader';
import SelectInput from '@/components/organisms/SelectInput';
import TextInput from '@/components/organisms/TextInput';
import Template from '@/components/templates/StudentTemplate';
import { Civilstatus, dateoption, famBackground, Gender, IndigentP, ofw, SBarangay, Scategory, SCitym, Scourse, SDistrict, sex, SProvice, Studenttype, suffixoption } from '@/hooks/redux/const';

const Registration = () => {
  const breadcrumbs = [
    {
      href: '#',
      title: 'Application Form',
      icon: SiGoogleforms,
    },
  ];

  const [showTextInput, setShowTextInput] = useState(false);
  const [showFamilyBackgroundInput, setShowFamilyBackgroundInput] = useState(false);
  const [showOFWInput, setShowOFWInput] = useState(false);
  const [showWorkingStudentInput, setShowWorkingStudentInput] = useState(false);
  const [showFreshmenInput, setShowFreshmenInput] = useState(false);
  const [showTransfereeInput, setShowTransfereeInput] = useState(false);

  const handleStudentTypeChange = (e) => {
    const value = e.target.value;
    setShowFreshmenInput(value === 'college1');
    setShowTransfereeInput(value === 'trans');
  };

  const handleIndigentChange = (e) => {
    const value = e.target.value;
    const selectedOption = IndigentP.find(option => option.value === value);
    setShowTextInput(selectedOption && selectedOption.showTextInput);
  };

  const handleFamilyBackgroundChange = (e) => {
    const value = e.target.value;
    const selectedOption = famBackground.find(option => option.value === value);
    setShowFamilyBackgroundInput(selectedOption && selectedOption.showTextInput);
  };

  const handleOFWChange = (e) => {
    const value = e.target.value;
    const selectedOption = ofw.find(option => option.value === value);
    
    if (selectedOption && selectedOption.showTextInput) {
      setShowOFWInput(true);
    } else {
      setShowOFWInput(false);
    }
  };

  const handleStudentCategoryChange = (e) => {
    const value = e.target.value;
    setShowWorkingStudentInput(value === "Wstudent");
  };

  return (
    <Template>
      <PageHeader breadcrumbs={breadcrumbs} />
      <Card>
      <form>
        <div className=" style=min-height: 140px;">
          <div className="m-5 grid gap-5 mb-6 md:grid-cols-4">
            <TextInput 
              label="First Name" 
              name="fname" 
            />
            <TextInput 
              label="Last Name" 
              name="lname" 
            />
            <TextInput 
              label="Middle Name" 
              name="mname" 
            />
            <SelectInput 
              options={suffixoption} 
              name="pref" 
            />
          </div>
          <div className="m-5 grid gap-5 mb-6 md:grid-cols-4">
            <TextInput 
              label="Age" 
              name="age" 
            />
            <div className='grid grid-cols-3 gap-1'>
              <SelectInput 
                options={dateoption}
              />
              <TextInput 
                label="Day" 
                name="date"
              />
              <TextInput 
                label="Year" 
                name="year"
              />
            </div>
            <SelectInput 
              options={sex} 
              name="Sex" 
            />
            <SelectInput 
              options={Gender} 
              name="Gender" 
            />
          </div>
          <div className="m-5 grid gap-5 mb-6 md:grid-cols-4">
            <SelectInput 
              options={Civilstatus} 
              name="civilstatus" 
            />
            <TextInput 
              label="Mobile Number" 
              name="contactnumber" 
            />
            <TextInput 
              label="Email Address" 
              name="email" 
            />
            <TextInput 
              label="Place of Birth (City/Municipality)" 
              name="pBirth"
            />
          </div>
          <div className="m-5 grid gap-5 mb-6 md:grid-cols-2">
            <SelectInput 
              options={IndigentP}
              name="IndigentP" 
              onChange={handleIndigentChange} 
            />
            {showTextInput && 
              <TextInput 
                label="If yes, specify the Indigenous group you belong to." 
                type="text" 
                name="IndigentPy" 
                className="form-input" 
              />
            }
          </div>

          <div className='p-4'>
            <p>Demographic Data:</p>
          </div>
          <div className="m-5 grid gap-5 mb-6 md:grid-cols-3">
            <TextInput 
              label="Purok/Block/Sitio"
            />
            <SelectInput
              options={SDistrict}
              label="District"
            />
            <SelectInput
              options={SBarangay}
              label="Barangay"
            />
            <SelectInput
              options={SCitym}
              label="City/Municipality"
            />
            <SelectInput
              options={SProvice}
              label="Province"
            />
            <TextInput
              label="Zip Code"
            />
          </div>


          <div className='p-4'>
            <p>Family Background:</p>
          </div>
          <div className="m-5 grid gap-5 mb-6 md:grid-cols-3 ">
            <SelectInput
              options={famBackground}
              name="familyBackground"
              onChange={handleFamilyBackgroundChange}
              className="w-full md:w-auto"
            />
            {showFamilyBackgroundInput && 
              <TextInput 
                label="Specify since when?"
                type="text" 
                name="sinceWhen" 
                className="form-input" 
              />
            }
            <TextInput
              label="Number of siblings in the family"
            />
            <TextInput
              label="Who Will support your study?"
            />
          </div>
          <div className="m-5 grid gap-5 mb-6 md:grid-cols-2">
            <SelectInput 
              options={ofw}
              onChange={handleOFWChange}
              name="ofw"
              className="w-full md:w-auto"
            />
            {showOFWInput && 
              <TextInput 
                label="Specify the job/profession of a family member abroad." 
                type="text" 
                name="ofwProfession" 
                className="form-input" 
              />
            }

            <SelectInput
              options={Scategory}
              label="Student Category"
              name="Studenttype"
              onChange={handleStudentCategoryChange}
            />
            {showWorkingStudentInput && 
              <TextInput 
                label="Nature of work" 
                type="text" 
                name="studentCategory" 
                className="form-input" 
              />
            }
          </div>

          <div className="m-5 grid gap-5 mb-6 md:grid-cols-1">
            <SelectInput 
              options={Studenttype}
              name="StudentType"
              onChange={handleStudentTypeChange}
            />
          </div>

          {showFreshmenInput && (
            <div>
              <p>Freshmen:</p>
              <div className="m-5 grid gap-5 mb-6 md:grid-cols-4">
                <TextInput 
                  label="Last School Attended" 
                  type="text" 
                  name="nameSchool" 
                  className="form-input" 
                />
                <TextInput 
                  label="Academic track" 
                  type="text" 
                  name="Atrack" 
                  className="form-input" 
                />
                <TextInput 
                  label="Address City/Municipality/Province" 
                  type="text" 
                  name="AMprovince" 
                  className="form-input" 
                />
                <TextInput 
                  label="Year Graduate" 
                  type="text" 
                  name="Ygraduate" 
                  className="form-input" 
                />
              </div>
            </div>
          )}

          {showTransfereeInput && (
            <div>
              <p>Transferee:</p>
              <div className="m-5 grid gap-5 mb-6 md:grid-cols-4">
                <TextInput 
                  label="Last School Attended" 
                  type="text" 
                  name="nameSchool" 
                  className="form-input" 
                />
                <TextInput 
                  label="Course" 
                  type="text" 
                  name="Atrack" 
                  className="form-input" 
                />
                <TextInput 
                  label="Address City/Municipality/Province" 
                  type="text" 
                  name="AMprovince" 
                  className="form-input" 
                />
                <TextInput 
                  label="Year Attended" 
                  type="text" 
                  name="Ygraduate" 
                  className="form-input" 
                />
              </div>
            </div>
          )}

        <div className="m-5 grid gap-5 mb-6 md:grid-cols-1">
          <SelectInput options={Scourse} name="selectcourse"/>
        </div>

        </div>
        <div className='p-4'>
            <p>CONFORME:</p>
          </div>
        <Card>
        <div>
          <p>By signing below, I hereby certify that all the information written 
          in this application are complete and accurate. I agree to update the
           Office of Admissions and the Registrar Office for any changes. I 
           acknowledge that I have read and understood the Samal Island City College 
           (SICC) Admissions Privacy Notice posted in the office premises. I understand 
           that by applying for admission/registering as a student of this institutuion, 
           I allow SICC through the Office of Admissions to collect, record, organize, 
           update or modify, retrieve, consult, utilize, consolidate, block, erase or 
           delete any information which are a part of my personal data for historical, 
           statistical, research and evaluation purposes pursuant to the provisions of
            the Republic Act No. 10173 of the Philippines, Data Privacy Act of 2012 and 
            its corresponding Implementing Rules and Regulations. I also agree, if accepted 
            as a student, that my odmission, matriculation, legibility for any assistance/grant,
             and graduation are subject to the rules and regulations of this institution.
             </p>
             </div> 
             </Card>
             <div>
            <Link
              href='/profile/change-password'
              className='mt-12 inline-flex 
              items-center rounded-lg border 
              border-gray-300 bg-white px-4 py-2 
              text-center text-sm font-medium 
              text-gray-900 hover:bg-gray-100 
              focus:outline-none focus:ring-4 
              focus:ring-gray-200 dark:border-gray-600 
              dark:bg-gray-800 dark:text-white 
              dark:hover:border-gray-700 
              dark:hover:bg-gray-700 dark:focus:ring-gray-700'
            >
              Proceed
            </Link>
          </div>
      </form>
      </Card>
      
      
            

    </Template>
  );
};

export default Registration;
