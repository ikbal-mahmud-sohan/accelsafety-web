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
import { getToken } from '../auth/setToken'


const state = reactive({
  // visitorsEntry: [] as Array<any>,
  EmergencyRes: [] as Array<any>,
  EmergencyRes01: [] as Array<any>,
  EmergencyRes02: [] as Array<any>,
  EmergencyRes03: [] as Array<any>,
  EmergencyRes04: [] as Array<any>,
  token: getToken(),

});

const fetchData = async () => {
  try {
  //  let  url = config.baseURL+'/api/v1/safety';
   let  url = config.baseURL+'/api/v1/emergency-response-team/show-by-type?type=site_main_controller';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    // state.visitorsEntry = response.data.data;
    state.EmergencyRes = response.data.data;
    console.log("shamim", state.EmergencyRes);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const fetchData01 = async () => {
  try {
  //  let  url = config.baseURL+'/api/v1/safety';
   let  url = config.baseURL+'/api/v1/emergency-response-team/show-by-type?type=site_incident_controller';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    // state.visitorsEntry = response.data.data;
    state.EmergencyRes01 = response.data.data;
    console.log("shamim01", state.EmergencyRes01);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const fetchData02 = async () => {
  try {
  //  let  url = config.baseURL+'/api/v1/safety';
   let  url = config.baseURL+'/api/v1/emergency-response-team/show-by-type?type=first_aider';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    // state.visitorsEntry = response.data.data;
    state.EmergencyRes02 = response.data.data;
    console.log("shamim02", state.EmergencyRes02);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const fetchData03 = async () => {
  try {
  //  let  url = config.baseURL+'/api/v1/safety';
   let  url = config.baseURL+'/api/v1/emergency-response-team/show-by-type?type=fire_fighter';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    // state.visitorsEntry = response.data.data;
    state.EmergencyRes03 = response.data.data;
    console.log("shamim03", state.EmergencyRes03);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const fetchData04 = async () => {
  try {
  //  let  url = config.baseURL+'/api/v1/safety';
   let  url = config.baseURL+'/api/v1/emergency-response-team/show-by-type?type=fire_rescuer';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    // state.visitorsEntry = response.data.data;
    state.EmergencyRes04 = response.data.data;
    console.log("shamim04", state.EmergencyRes04);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const deleteData = async (sID:string) => {
  try {
    // let url = config.baseURL+"/api/v1/safety/"+sID;
    let url = config.baseURL+"/api/v1/emergency-response-team/delete/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    // state.visitorsEntry = response.data.data;

    await fetchData();
    await fetchData01();
    await fetchData02();
    await fetchData03();
    await fetchData04();

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
  fetchData01();
  fetchData02();
  fetchData03();
  fetchData04();
});
</script>

<template>
  <h2 class="mt-10 text-lg font-medium intro-y">Emergency Response Team</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
      <router-link :to="{ name: 'hse-emergency-response-create' }">
        <Button variant="primary" class="mr-2 shadow-md">
          Add New Emergency Response Team
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
    <!-- <div class="col-span-12 overflow-auto intro-y " >
      <Table class="border-spacing-y-[10px] border-separate -mt-2">
        <Table.Thead>
          <Table.Tr>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">ID</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Unit Name</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Visitor Name</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Company Name</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Whom To Meet</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Visit Purpose</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Temp Id Card No</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Time of Entry</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Time of Exit</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Signature</Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap uppercase">ACTIONS</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody v-if="state.visitorsEntry.length !== 0">
          <Table.Tr  v-for="(report, index) in state.visitorsEntry" :key="index" class="intro-x">
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.id }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.unit_name }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.visitor_name }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.company_name }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.whom_to_meet }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.visit_purpose }}
            </Table.Td>
            
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.temp_id_card_no }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.time_of_entry }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.time_of_exit }}
            </Table.Td>
            <Table.Td  class="box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600"
            >
              <div class="flex justify-center">
                <template v-if="report.signature && report.signature.length > 0">
                  <div class="w-16 h-16 image-fit zoom-in" v-for="(img, index) in report.signature" :key="index">
                    <Tippy
                      as="img"
                      alt="safety"
                      class="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                      :src="`${config.baseURL}${img}`"
                      :content="`safety`"
                    />
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
                <router-link :to="{name:'hse-visitors-entry-edit', params:{id:report.id} }" class="flex items-center mr-3">
                  <Lucide icon="CheckSquare" class="w-4 h-4 mr-1" />
                  Edit
                </router-link>
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
        <Table.Tbody v-else class=" ">
          <div class="w-40 px-4 py-4 text-red-600">
            No data
          </div>
        </Table.Tbody>
      </Table>
    </div> -->
    <!-- END: Data List -->

    <!-- BEGIN: EMERGENCY RES List -->
     <div class="col-span-12 overflow-auto intro-y ">
       <div class="w-full p-5 mt-5 intro-y box">
          <div class="flex flex-wrap">
            <div class="w-full lg:w-1/2 pb-4">
              <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 mr-0 lg:mr-2">
                <div class="font-bold bg-primary text-white text-base text-center mb-4">Chief Warden</div>
                <div v-if="state.EmergencyRes.length !== 0" class="w-full">
                  <div v-for="(report, index) in state.EmergencyRes" :key="index" class="w-full flex justify-center items-center">
                    <div class="relative box zoom-in mb-3 flex items-center px-4 py-4 border border-primary w-60">
                        <div class="image-fit h-12 w-12 flex-none overflow-hidden rounded-md">
                            <img :src="report.image || '../src/assets/images/icon_02/placeholder_dp.png'" :alt="report.name" class="rounded-full">
                        </div>
                        <div class="ml-3 mr-auto">
                            <div class="font-medium">{{ report.name}}</div>
                            <div class="mt-0.5 text-xs text-slate-500">{{ report.designation }}</div>
                            <div class="mt-0.5 text-xs text-slate-500">{{ report.phone }}</div>
                        </div>
                        <div class="absolute top-2 -right-2 flex flex-col justify-between h-full">
                          <router-link :to="{name:'hse-emergency-response-edit', params:{id:report.id} }" class="flex items-center mr-3">
                            <Lucide icon="EditIcon" class="w-4 h-4 mr-1" />
                          </router-link>
                          <a
                            class="flex items-center mb-4"
                            href="javascript:;"
                            @click="deleteData(report.id)">
                            <Lucide icon="Trash2" class="w-4 h-4 mr-1" />
                          </a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/2 pb-4">
              <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 ml-0 lg:ml-2">
                <div class="font-bold bg-primary text-white text-base text-center mb-4">Deputy Chief Warden</div>
                <div v-if="state.EmergencyRes01.length !== 0" class="w-full">
                  <div v-for="(report, index) in state.EmergencyRes01" :key="index" class="w-full flex justify-center items-center">
                    <div class="relative box zoom-in mb-3 flex items-center px-4 py-4 border border-primary w-60">
                        <div class="image-fit h-12 w-12 flex-none overflow-hidden rounded-md">
                            <img :src="report.image || '../src/assets/images/icon_02/placeholder_dp.png'" :alt="report.name" class="rounded-full">
                        </div>
                        <div class="ml-3 mr-auto">
                            <div class="font-medium">{{ report.name}}</div>
                            <div class="mt-0.5 text-xs text-slate-500">{{ report.designation }}</div>
                            <div class="mt-0.5 text-xs text-slate-500">{{ report.phone }}</div>
                        </div>
                        <div class="absolute top-2 -right-2 flex flex-col justify-between h-full">
                          <router-link :to="{name:'hse-emergency-response-edit', params:{id:report.id} }" class="flex items-center mr-3">
                            <Lucide icon="EditIcon" class="w-4 h-4 mr-1" />
                          </router-link>
                          <a
                            class="flex items-center mb-4"
                            href="javascript:;"
                            @click="deleteData(report.id)">
                            <Lucide icon="Trash2" class="w-4 h-4 mr-1" />
                          </a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/3 pb-4 lg:pb-0">
              <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 mr-0 lg:mr-2">
                <div class="font-bold bg-success text-white text-base text-center mb-4">First Aider</div>
                <div v-if="state.EmergencyRes02.length !== 0" class="w-full">
                  <div v-for="(report, index) in state.EmergencyRes02" :key="index" class="w-full flex justify-center items-center">
                    <div class="relative box zoom-in mb-3 flex items-center px-4 py-4 border border-success w-60">
                        <div class="image-fit h-12 w-12 flex-none overflow-hidden rounded-md">
                            <img :src="report.image || '../src/assets/images/icon_02/placeholder_dp.png'" :alt="report.name" class="rounded-full">
                        </div>
                        <div class="ml-3 mr-auto">
                            <div class="font-medium">{{ report.name}}</div>
                            <div class="mt-0.5 text-xs text-slate-500">{{ report.designation }}</div>
                            <div class="mt-0.5 text-xs text-slate-500">{{ report.phone }}</div>
                        </div>
                        <div class="absolute top-2 -right-2 flex flex-col justify-between h-full">
                          <router-link :to="{name:'hse-emergency-response-edit', params:{id:report.id} }" class="flex items-center mr-3">
                            <Lucide icon="EditIcon" class="w-4 h-4 mr-1" />
                          </router-link>
                          <a
                            class="flex items-center mb-4"
                            href="javascript:;"
                            @click="deleteData(report.id)">
                            <Lucide icon="Trash2" class="w-4 h-4 mr-1" />
                          </a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/3 pb-4 lg:pb-0">
              <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 mx-0 lg:mx-2">
                <div class="font-bold bg-danger text-white text-base text-center mb-4">Fire Fighter</div>
                <div v-if="state.EmergencyRes03.length !== 0" class="w-full">
                  <div v-for="(report, index) in state.EmergencyRes03" :key="index" class="w-full flex justify-center items-center">
                    <div class="relative box zoom-in mb-3 flex items-center px-4 py-4 border border-danger w-60">
                        <div class="image-fit h-12 w-12 flex-none overflow-hidden rounded-md">
                            <img :src="report.image || '../src/assets/images/icon_02/placeholder_dp.png'" :alt="report.name" class="rounded-full">
                        </div>
                        <div class="ml-3 mr-auto">
                            <div class="font-medium">{{ report.name}}</div>
                            <div class="mt-0.5 text-xs text-slate-500">{{ report.designation }}</div>
                            <div class="mt-0.5 text-xs text-slate-500">{{ report.phone }}</div>
                        </div>
                        <div class="absolute top-2 -right-2 flex flex-col justify-between h-full">
                          <router-link :to="{name:'hse-emergency-response-edit', params:{id:report.id} }" class="flex items-center mr-3">
                            <Lucide icon="EditIcon" class="w-4 h-4 mr-1" />
                          </router-link>
                          <a
                            class="flex items-center mb-4"
                            href="javascript:;"
                            @click="deleteData(report.id)">
                            <Lucide icon="Trash2" class="w-4 h-4 mr-1" />
                          </a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/3">
              <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400 ml-0 lg:ml-2">
                <div class="font-bold bg-warning text-white text-base text-center mb-4">Fire Rescuer</div>
                <div v-if="state.EmergencyRes04.length !== 0" class="w-full">
                  <div v-for="(report, index) in state.EmergencyRes04" :key="index" class="w-full flex justify-center items-center">
                    <div class="relative box zoom-in mb-3 flex items-center px-4 py-4 border border-warning w-60">
                        <div class="image-fit h-12 w-12 flex-none overflow-hidden rounded-md">
                            <img :src="report.image || '../src/assets/images/icon_02/placeholder_dp.png'" :alt="report.name" class="rounded-full">
                        </div>
                        <div class="ml-3 mr-auto">
                            <div class="font-medium">{{ report.name}}</div>
                            <div class="mt-0.5 text-xs text-slate-500">{{ report.designation }}</div>
                            <div class="mt-0.5 text-xs text-slate-500">{{ report.phone }}</div>
                        </div>
                        <div class="absolute top-2 -right-2 flex flex-col justify-between h-full">
                          <router-link :to="{name:'hse-emergency-response-edit', params:{id:report.id} }" class="flex items-center mr-3">
                            <Lucide icon="EditIcon" class="w-4 h-4 mr-1" />
                          </router-link>
                          <a
                            class="flex items-center mb-4"
                            href="javascript:;"
                            @click="deleteData(report.id)">
                            <Lucide icon="Trash2" class="w-4 h-4 mr-1" />
                          </a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
       </div>
     </div>
    <!-- END: EMERGENCY RES List -->
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

