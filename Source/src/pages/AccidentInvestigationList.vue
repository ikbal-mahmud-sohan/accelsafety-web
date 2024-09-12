<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import _ from 'lodash';
import Button from '@/components/Base/Button';
import Pagination from '@/components/Base/Pagination';
import { FormInput, FormSelect } from '@/components/Base/Form';
import Lucide from '@/components/Base/Lucide';
import Tippy from '@/components/Base/Tippy';
import { Dialog, Menu } from '@/components/Base/Headless';
import Table from '@/components/Base/Table';
import config from "@/config";

// Define your state using the reactive function
const state = reactive({
  accidentReports: [] as Array<any>,
});


// Fetch data from the API and update the state
const fetchData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/accident-investigation';
    const response = await axios.get(url);
    state.accidentReports = response.data.data;
    console.log("sohan",state.accidentReports)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/accident-investigation/"+sID;
    const response = await axios.delete(url);
    state.accidentReports = response.data.data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call fetchData when the component is mounted
onMounted(() => {
  fetchData();
});
</script>

<template>
  <h2 class="mt-10 text-lg font-medium intro-y">Accident Investigation List</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
      <!-- <Button variant="primary" class="mr-2 shadow-md">
        Add New Accident
      </Button> -->
      <router-link :to="{ name: 'accident-investigation-form' }">
        <Button variant="primary" class="mr-2 shadow-md">
          Add New Accident Investigation
        </Button>
      </router-link>
      <Menu>
        <Menu.Button :as="Button" class="px-2 !box">
          <span class="flex items-center justify-center w-5 h-5">
            <Lucide icon="Plus" class="w-4 h-4" />
          </span>
        </Menu.Button>
        <Menu.Items class="w-40">
          <Menu.Item>
            <Lucide icon="Printer" class="w-4 h-4 mr-2" /> Print
          </Menu.Item>
          <Menu.Item>
            <Lucide icon="FileText" class="w-4 h-4 mr-2" /> Export to Excel
          </Menu.Item>
          <Menu.Item>
            <Lucide icon="FileText" class="w-4 h-4 mr-2" /> Export to PDF
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <div class="hidden mx-auto md:block text-slate-500">
        Showing 1 to 10 of 150 entries
      </div>
      <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
        <div class="relative w-56 text-slate-500">
          <FormInput
            type="text"
            class="w-56 pr-10 !box"
            placeholder="Search..."
          />
          <Lucide
            icon="Search"
            class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
          />
        </div>
      </div>
    </div>

    <!-- BEGIN: Data List -->
    <div class="col-span-12 overflow-auto intro-y ">
      <Table class="border-spacing-y-[10px] border-separate -mt-2">
        <Table.Thead>
          <Table.Tr>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase"> ID </Table.Th>
            
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Investigator Name 1</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Investigator Designation 1 </Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Investigator Sign 1</Table.Th>

            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Investigator Name 2</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Investigator Designation 2 </Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Investigator Sign 2</Table.Th>

            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Investigator Name 3</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Investigator Designation 3 </Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Investigator Sign 3</Table.Th>

            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Investigator Name 4</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Investigator Designation 4 </Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Investigator Sign 4</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">name of the factory</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">date of accident</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">accident time</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">accident shift</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">date of accident</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">effected body part</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Type Of Employee</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Type Of Accident</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Nature Of Injury</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Employee Name</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Employee Department</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Employee ID</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">employee job title</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">employee age</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">employee phone no</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">employee address</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">employee experience</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">area in charge name</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">area in charge phone no</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">witness name</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">witness phone no</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Accident Details</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">accident exact location</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">accident initiatives</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Unsafe Acts</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Unsafe Conditions</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">unsafe acts why therefore 1</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">unsafe conditions why therefore 1</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">management deficiency why therefore 1</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">unsafe acts why therefore 2</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">unsafe conditions why therefore 2</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">management deficiency why therefore 2</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">unsafe acts why therefore 3</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">unsafe conditions why therefore 3</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">management deficiency why therefore 3</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">unsafe acts why therefore 4</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">unsafe conditions why therefore 4</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">management deficiency why therefore 4</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">unsafe acts why therefore 5</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">unsafe conditions why therefore 5</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">management deficiency why therefore 5</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">unsafe acts title</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">unsafe conditions title</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">management deficiency title</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">root cause des1</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">root cause des2</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">root cause des3</Table.Th>

            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Management Deficiencies</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Root Cause 1</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">corrective action 1</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">person assigned 1</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">target date 1</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">complete date 1</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">root cause 2</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">corrective action 2</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">person assigned 2</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">target date 2</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">complete date 2</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">root cause 3</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">corrective action 3</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">person assigned 3</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">target date 3</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">complete date 3</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">reviewed by department name</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">reviewed by department signature</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">reviewed by unit name</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">reviewed by unit signature</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">approved by name</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">approved by signature</Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap uppercase">ACTIONS</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr v-for="(report, index) in state.accidentReports" :key="index" class="intro-x">
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.id }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.name_1 }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 whitespace-nowrap">
              {{ report.investigation_designation_1 }}
            </Table.Td>
            <Table.Td  class="box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex justify-center">
                <template v-if="report.investigation_sign_1 && report.investigation_sign_1.length > 0">
                  <div class="w-40 h-20 image-fit zoom-in" v-for="(img, index) in report.investigation_sign_1" :key="index">
                    <Tippy as="img" alt="safety" class=" shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]" :src="`${config.baseURL}${img}`" :content="`safety`"/>
                  </div>
                </template>
                <template v-else>
                  <span>No Data</span>
                </template>
              </div>
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.name_2 }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 whitespace-nowrap">
              {{ report.investigation_designation_2 }}
            </Table.Td>
            <Table.Td  class="box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex justify-center">
                <template v-if="report.investigation_sign_2 && report.investigation_sign_2.length > 0">
                  <div class="w-40 h-20 image-fit zoom-in" v-for="(img, index) in report.investigation_sign_2" :key="index">
                    <Tippy as="img" alt="safety" class=" shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]" :src="`${config.baseURL}${img}`" :content="`safety`"/>
                  </div>
                </template>
                <template v-else>
                  <span>No Data</span>
                </template>
              </div>
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.name_3 }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 whitespace-nowrap">
              {{ report.investigation_designation_3 }}
            </Table.Td>
            <Table.Td  class="box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex justify-center">
                <template v-if="report.investigation_sign_3 && report.investigation_sign_3.length > 0">
                  <div class="w-40 h-20 image-fit zoom-in" v-for="(img, index) in report.investigation_sign_3" :key="index">
                    <Tippy as="img" alt="safety" class=" shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]" :src="`${config.baseURL}${img}`" :content="`safety`"/>
                  </div>
                </template>
                <template v-else>
                  <span>No Data</span>
                </template>
              </div>
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.name_4 }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 whitespace-nowrap">
              {{ report.investigation_designation_4 }}
            </Table.Td>
            <Table.Td  class="box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex justify-center">
                <template v-if="report.investigation_sign_4 && report.investigation_sign_4.length > 0">
                  <div class="w-40 h-20 image-fit zoom-in" v-for="(img, index) in report.investigation_sign_4" :key="index">
                    <Tippy as="img" alt="safety" class=" shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]" :src="`${config.baseURL}${img}`" :content="`safety`"/>
                  </div>
                </template>
                <template v-else>
                  <span>No Data</span>
                </template>
              </div>
            </Table.Td>

            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.name_of_the_factory }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.date_of_accident }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.accident_time }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.accident_shift }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.date_of_accident }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.effected_body_part }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex">
                <div class="px-1" v-for="(data, index) in report.type_of_employee" :key="index">
                  {{ data }}.
                </div>
              </div>
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex">
                <div class="px-1" v-for="(data, index) in report.type_of_accident" :key="index">
                  {{ data }}.
                </div>
              </div>
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex">
                <div class="px-1" v-for="(data, index) in report.nature_of_injury" :key="index">
                  {{ data }}.
                </div>
              </div>
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.employee_name }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.employee_department }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.emp_id }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.employee_job_title }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.employee_age }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.employee_phone_no }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.employee_address }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.employee_experience }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.area_in_charge_name }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.area_in_charge_phone_no }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.witness_name }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.witness_phone_no }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="relative group">
                <div class="lg:truncate w-32" v-html="report.accident_details"></div>
                <div class="top-0 left-0 absolute w-72 bg-white shadow-xl rounded-md z-50 px-4 py-4 hidden group-hover:block" v-html="report.accident_details"></div>
              </div>
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.accident_exact_location }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.accident_exact_location }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex">
                <div class="px-1" v-for="(data, index) in report.unsafe_acts" :key="index">
                  {{ data }}.
                </div>
              </div>
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex">
                <div class="px-1" v-for="(data, index) in report.unsafe_conditions" :key="index">
                  {{ data }}.
                </div>
              </div>
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex">
                <div class="px-1" v-for="(data, index) in report.management_deficiencies" :key="index">
                  {{ data }}.
                </div>
              </div>
            </Table.Td>

            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.unsafe_acts_why_therefore_1 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.unsafe_conditions_why_therefore_1 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.management_deficiency_why_therefore_1 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.unsafe_acts_why_therefore_2 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.unsafe_conditions_why_therefore_2 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.management_deficiency_why_therefore_2 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.unsafe_acts_why_therefore_3 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.unsafe_conditions_why_therefore_3 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.management_deficiency_why_therefore_3 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.unsafe_acts_why_therefore_4 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.unsafe_conditions_why_therefore_4 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.management_deficiency_why_therefore_4 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.unsafe_acts_why_therefore_5 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.unsafe_conditions_why_therefore_5 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.management_deficiency_why_therefore_5 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.unsafe_acts_title }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.unsafe_conditions_title }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.management_deficiency_title }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.root_cause_des1 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.root_cause_des2 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.root_cause_des3 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.root_cause_1 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.corrective_action_1 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.person_assigned_1 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.target_date_1 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.complete_date_1 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.root_cause_2 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.corrective_action_2 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.person_assigned_2 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.target_date_2 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.complete_date_2 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.root_cause_3 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.corrective_action_3 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.person_assigned_3 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.target_date_3 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.complete_date_3 }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.reviewed_by_department_name }}
            </Table.Td>
            <Table.Td  class="box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex justify-center">
                <template v-if="report.reviewed_by_department_signature && report.reviewed_by_department_signature.length > 0">
                  <div class="w-40 h-20 image-fit zoom-in" v-for="(img, index) in report.reviewed_by_department_signature" :key="index">
                    <Tippy as="img" alt="safety" class=" shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]" :src="`${config.baseURL}${img}`" :content="`safety`"/>
                  </div>
                </template>
                <template v-else>
                  <span>No Data</span>
                </template>
              </div>
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.reviewed_by_unit_name }}
            </Table.Td>
            <Table.Td  class="box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex justify-center">
                <template v-if="report.reviewed_by_unit_signature && report.reviewed_by_unit_signature.length > 0">
                  <div class="w-40 h-20 image-fit zoom-in" v-for="(img, index) in report.reviewed_by_unit_signature" :key="index">
                    <Tippy as="img" alt="safety" class=" shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]" :src="`${config.baseURL}${img}`" :content="`safety`"/>
                  </div>
                </template>
                <template v-else>
                  <span>No Data</span>
                </template>
              </div>
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.approved_by_name }}
            </Table.Td>
            <Table.Td  class="box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex justify-center">
                <template v-if="report.approved_by_signature && report.approved_by_signature.length > 0">
                  <div class="w-40 h-20 image-fit zoom-in" v-for="(img, index) in report.approved_by_signature" :key="index">
                    <Tippy as="img" alt="safety" class=" shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]" :src="`${config.baseURL}${img}`" :content="`safety`"/>
                  </div>
                </template>
                <template v-else>
                  <span>No Data</span>
                </template>
              </div>
            </Table.Td>

            
            <Table.Td
              :class="[
                'box w-56 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600',
                'before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400',
              ]"
            >
              <div class="flex items-center justify-center">
                <!-- <router-link :to="{name:'accident-update-form', params:{id:report.id} }" class="flex items-center mr-3">
                  <Lucide icon="CheckSquare" class="w-4 h-4 mr-1" />
                  Edit
                </router-link> -->
                <a
                  class="flex items-center text-danger"
                  href="javascript:;"
                  @click="deleteData(report.id)">
                  <Lucide icon="Trash2" class="w-4 h-4 mr-1" /> Delete
                </a>
              </div>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Pagination -->
    <div class="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
      <Pagination class="w-full sm:w-auto sm:mr-auto">
        <Pagination.Link>
          <Lucide icon="ChevronsLeft" class="w-4 h-4" />
        </Pagination.Link>
        <Pagination.Link>
          <Lucide icon="ChevronLeft" class="w-4 h-4" />
        </Pagination.Link>
        <Pagination.Link>...</Pagination.Link>
        <Pagination.Link>1</Pagination.Link>
        <Pagination.Link active>2</Pagination.Link>
        <Pagination.Link>3</Pagination.Link>
        <Pagination.Link>...</Pagination.Link>
        <Pagination.Link>
          <Lucide icon="ChevronRight" class="w-4 h-4" />
        </Pagination.Link>
        <Pagination.Link>
          <Lucide icon="ChevronsRight" class="w-4 h-4" />
        </Pagination.Link>
      </Pagination>
      <FormSelect class="w-20 mt-3 !box sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </FormSelect>
    </div>
    <!-- END: Pagination -->
  </div>
</template>
