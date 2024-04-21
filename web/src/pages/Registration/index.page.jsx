import Link from 'next/link'

import DatePicker from "@/components/organisms/DatePicker";
import SelectInput from "@/components/organisms/SelectInput";
import TextInput from "@/components/organisms/TextInput";
import StudentTemplate from "@/components/templates/StudentTemplate";

const Registration = () => {
  return (
    <StudentTemplate>

        <form>
          <div className=" style=min-height: 140px;">

            {/* lastname,first,middle */}
          <label className="text-sm font-small text-gray-900 dark:text-white">Personal Information:</label>

          <div className="m-5 grid gap-5 mb-6 md:grid-cols-4">
          <div>
          <label className="text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <TextInput
            label='Dela Cruz' 
            />
            </div>

          <div>
          <label className="text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <TextInput
            label='Juan' 
            />
            </div>

            <div>
          <label className="text-sm font-medium text-gray-900 dark:text-white">Middle name</label>
            <TextInput
            label='Luna' 
            />
            </div>

            <div>
            <label className="text-sm font-medium text-gray-900 dark:text-white">Prefix</label>
              <SelectInput className=" w-40"
              options={[
                { value: '', label: '-select-', disabled: true }, // Default option
                { value: 'Jr.', label: 'Jr.' },
                { value: 'Sr.', label: 'Sr.' },
                // Add more options as needed
              ]}
              />
            </div>
            </div>
              
            <div className=" m-5 grid gap-5 mb-6 md:grid-cols-5">

            <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Age</label>
            <TextInput 
            label='Age' 
            />
          </div>

          <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Birthdate</label>
            <DatePicker/>
          </div>


          <div>
          <label className="text-sm font-medium text-gray-900 dark:text-white">Sex</label>
              <SelectInput
              options={[
                { value: '', label: '-select-', disabled: true },
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                // Add more options as needed
              ]}
              />
            </div>

            <div>
          <label className="text-sm font-medium text-gray-900 dark:text-white">Gender</label>
              <SelectInput
              options={[
                { value: '', label: '-select-', disabled: true }, // Default option
                { value: 'Man', label: 'Man' },
                { value: 'Women', label: 'Women' },
                { value: 'LGBTAQA+', label: 'LGBTAQA+' },
                // Add more options as needed
              ]}
              />
            </div>

            <div>
          <label className="text-sm font-medium text-gray-900 dark:text-white">Civil Status</label>
              <SelectInput className=" w-32"
              options={[
                { value: '', label: '-select-', disabled: true }, // Default option
                { value: 'Single', label: 'Single' },
                { value: 'Married', label: 'Married' },
                { value: 'Widowed', label: 'Widowed' },
                { value: 'Single Parent', label: 'Cohabiting/Live-in' },
                // Add more options as needed
              ]}
              />
            </div>

            </div>

            <div className="m-5 grid gap-5 mb-6 md:grid-cols-3">
          <div>
          <label className="text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
            <TextInput 
            />
            </div>
            <div>
          <label className="text-sm font-medium text-gray-900 dark:text-white">email</label>
            <TextInput 
            />
            </div>
            <div>
          <label className="text-sm font-medium text-gray-900 dark:text-white">Place of Birth</label>
            <TextInput 
            />
            </div>
            </div>

            <div className="m-5 grid gap-5 mb-6 md:grid-cols-2">
            <div><label className="text-sm font-medium text-gray-900 dark:text-white">Are you member of indigineous People&apos;s Community?</label>
          
              <SelectInput
              options={[
                { value: '', label: '-select-', disabled: true }, // Default option
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
                // Add more options as needed
              ]}
              />
            </div>

            <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">If yes, specify</label>
            <TextInput 
            />
            </div>
            </div>

            <label className="text-sm font-small text-gray-900 dark:text-white">Permanent Address:</label>

            <div className="m-5 grid gap-5 mb-6 md:grid-cols-2">
            <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Purok,Block,Sitio</label>
            <TextInput 
            />
            </div>
            <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Barangay</label>
          <SelectInput
              options={[
                { value: '', label: '-select-', disabled: true }, // Default option
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
                // Add more options as needed
              ]}
              />
            </div>
            <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">City, Municipality</label>
          <SelectInput
              options={[
                { value: '', label: '-select-', disabled: true }, // Default option
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
                // Add more options as needed
              ]}
              />
            </div>
            <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Postal Code</label>
            <TextInput 
            />
            </div>
            </div>

            <label className="text-sm font-small text-gray-900 dark:text-white">Family Background:</label>

            <div className="m-5 grid gap-5 mb-6 md:grid-cols-2">
              <div>
            <label className="text-sm font-medium text-gray-900 dark:text-white">Current Status</label>
          <SelectInput
              options={[
                { value: '', label: '-select-', disabled: true }, // Default option
                { value: 'Parent living together', label: 'Parent living together' },
                { value: 'Deceased Father', label: 'Deceased Father' },
                { value: 'Deceased Mother', label: 'Deceased Mother' },
                { value: 'Father Remarried', label: 'Father Remarried' },
                { value: 'Mother Remarried', label: 'Mother Remarried' },
                // Add more options as needed
              ]}
              />
              </div>

              <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Parents Separated, since when?</label>
            <TextInput 
            />
            </div>

            <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Number of sibling in the Family</label>
            <TextInput 
            />
            </div>

            <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Who will support your study?</label>
            <TextInput 
            />
            </div>

            <div>
            <label className="text-sm font-medium text-gray-900 dark:text-white">Do you have a family member who is an OFW</label>
          <SelectInput
              options={[
                { value: '', label: '-select-', disabled: true }, // Default option
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
                // Add more options as needed
              ]}
              />
              </div>

              <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">If yes specified</label>
            <TextInput 
            />
            </div>

              </div>

              <label className="text-sm font-small text-gray-900 dark:text-white">Type of student:</label>

              <div className="m-5 grid gap-5 mb-6 md:grid-cols-1">

              <div>
            <label className="text-sm font-medium text-gray-900 dark:text-white">Select</label>
          <SelectInput
              options={[
                { value: '', label: '-select-', disabled: true }, // Default option
                { value: 'yes', label: '1st Year College' },
                { value: 'no', label: 'Transferee' },
                { value: 'yes', label: 'Returnee' },
                { value: 'no', label: 'Cross-Enrollee' },
                // Add more options as needed
              ]}
              />
              </div>

              </div>

              <label className="text-sm font-small text-gray-900 dark:text-white">Student Category:</label>

              <div className="m-5 grid gap-5 mb-6 md:grid-cols-2">

              <div>
            <label className="text-sm font-medium text-gray-900 dark:text-white">Select</label>
          <SelectInput
              options={[
                { value: '', label: '-select-', disabled: true }, // Default option
                { value: 'yes', label: 'Full Time' },
                { value: 'no', label: 'Working Student' },
                // Add more options as needed
              ]}
              />
              </div>

              <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Nature of Work</label>
            <TextInput 
            />
            </div>

              </div>

              <label className="text-sm font-small text-gray-900 dark:text-white">Educational Background:</label>
              <div><label className="text-xl font-small text-gray-900 dark:text-white">Freshmen:</label></div>

              <div className="m-5 grid gap-5 mb-6 md:grid-cols-4">

              <div >
          <label className="text-xs font-medium text-gray-900 dark:text-white">Name of Senior High School last Attend</label>
            <TextInput 
            />
            </div>

            <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Academic track</label>
            <TextInput 
            />
            </div>

            <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Address:City-Municipality-Province</label>
            <TextInput 
            />
            </div>

            <div >
          <label className="text-sm font-small text-gray-900 dark:text-white">Year Graduated</label>
            <TextInput 
            />
            </div>

              </div>
              <div><label className="text-xl font-small text-gray-900 dark:text-white">Transferee:</label></div>

              <div className="m-5 grid gap-5 mb-6 md:grid-cols-4">

              <div >
          <label className="text-xs font-medium text-gray-900 dark:text-white">Name of Senior High School last Attend</label>
            <TextInput 
            />
            </div>

            <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Academic track</label>
            <TextInput 
            />
            </div>

            <div >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Address:City-Municipality-Province</label>
            <TextInput 
            />
            </div>

            <div >
          <label className="text-sm font-small text-gray-900 dark:text-white">Year Graduated</label>
            <TextInput 
            />
            </div>

              </div>

              <div><label className="text-sm font-small text-gray-900 dark:text-white">Course applied for:</label></div>

              <div className="m-5 grid gap-5 mb-6 md:grid-cols-4">

              <div>
            <label className="text-sm font-medium text-gray-900 dark:text-white">Select Course</label>
          <SelectInput
              options={[
                { value: '', label: '-select-', disabled: true }, // Default option
                { value: 'yes', label: 'BS Agri Business' },
                { value: 'no', label: 'BS Entrepreneurship' },
                { value: 'yes', label: 'Bachelor of Public Administration' },
                { value: 'no', label: 'BS Tourism Management' },
                { value: 'yes', label: 'BS Criminology' },
                // Add more options as needed
              ]}
              />
              </div>


                </div>


                  {/* to follow ang function ug next page */}
                <div>
            <Link
              href='/profile/change-password'
              className='mt-12 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
            >
              Next
            </Link>
          </div>

                





            </div>
            </form>

            </StudentTemplate>
  
  );
}

export default Registration;
