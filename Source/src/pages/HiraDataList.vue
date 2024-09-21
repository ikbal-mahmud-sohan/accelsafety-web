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
  viewData: [] as Array<any>,
});


// Fetch data from the API and update the state
const fetchData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/hira';
    const response = await axios.get(url);
    state.viewData = response.data.data;
    console.log("viewData",state.viewData)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/trainingAttendence/"+sID;
    const response = await axios.delete(url);
    state.viewData = response.data.data;
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
  <h2 class="mt-10 text-lg font-medium intro-y">Training Attendence List</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
      <router-link :to="{ name: 'training-attendences-form' }">
        <Button variant="primary" class="mr-2 shadow-md">
          Add New Training Attendence
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
            <Table.Th class=" min-h-40 text-left border whitespace-nowrap uppercase">serial number</Table.Th>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">Process</Table.Th>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">Activity/Sub Activity</Table.Th>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">Location</Table.Th>
            <Table.Th class=" min-h-40 text-center border uppercase"> <span class="whitespace-nowrap">Type of Activity</span> <br> <span class="whitespace-nowrap">(Normal-N Abnormal-A Emergency-E)</span></Table.Th>
            <Table.Th class=" min-h-40 text-center border uppercase"> <span class="whitespace-nowrap">Occupations/Who is at Risk</span> <br> <span class="whitespace-nowrap">(Specific Role or Person)</span></Table.Th>
            <div class=" min-h-40 font-medium  dark:border-darkmode-300 text-center uppercase border-t border-b">
              <div class="font-medium px-5 py-3 dark:border-darkmode-300 text-center  uppercase min-h-16 flex items-center justify-center">Hazard (Cause-Event-Impact)</div>
              <div class="flex  min-h-20 border-t">
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-40 text-center border-none uppercase">Event</Table.Th></div>
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-40 text-center border-none uppercase">Cause</Table.Th></div>
                <div class="whitespace-nowrap flex items-center justify-center"><Table.Th class="w-40 text-center border-none uppercase">Impact</Table.Th></div>
               
              </div>
            </div>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">Hazard Type</Table.Th>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">Likelihood</Table.Th>
            
            <div class=" min-h-40 font-medium  dark:border-darkmode-300 text-center uppercase border-t border-b">
              <div class="font-medium px-5 py-3 dark:border-darkmode-300 text-center  uppercase min-h-16 flex items-center justify-center">Impact Rating Factors</div>
              <div class="flex  min-h-20 border-t">
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-40 text-center border-none uppercase"> <span class="whitespace-nowrap">Regulatory</span> <br> <span class="whitespace-nowrap">Compliance</span></Table.Th></div>
                <div class="whitespace-nowrap"><Table.Th class="w-40 text-center border-none  uppercase"><span class="whitespace-nowrap">Safety /Occupational</span> <br> <span class="whitespace-nowrap">health</span></Table.Th></div>
              </div>
            </div>
            <Table.Th class=" min-h-40 w-40 text-center border uppercase"><span class="whitespace-nowrap">Impact Score</span> <br> <span class="whitespace-nowrap">(Worst Rating)</span> </Table.Th>
            <Table.Th class=" min-h-40 w-40 text-center border uppercase"><span class="whitespace-nowrap">Overall Risk Score</span> <br> <span class="whitespace-nowrap">(Inherent)</span> </Table.Th>
            <div class=" min-h-40 font-medium  dark:border-darkmode-300 text-center uppercase border-t border-b">
              <div class="font-medium px-5 py-3 dark:border-darkmode-300 text-center  uppercase min-h-16 flex items-center justify-center">Operational Control/Additional control proposed</div>
              <div class="flex  min-h-20 border-t">
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-40 text-center border-none uppercase">Elimination</Table.Th></div>
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-40 text-center border-none uppercase">Substitution</Table.Th></div>
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-40 text-center border-none uppercase">Engineering</Table.Th></div>
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-40 text-center border-none uppercase">Administrative</Table.Th></div>
                <div class="whitespace-nowrap flex items-center justify-center"><Table.Th class="w-40 text-center border-none uppercase">PPE</Table.Th></div>
               
              </div>
            </div>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">Mitigation</Table.Th>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">Type of Mitigation</Table.Th>
            <div class=" min-h-40 font-medium  dark:border-darkmode-300 text-center uppercase border-t border-b">
              <div class="font-medium px-5 py-3 dark:border-darkmode-300 text-center  uppercase min-h-16 flex items-center justify-center">Risk Evaluation</div>
              <div class="flex  min-h-20 border-t">
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-40 text-center border-none uppercase">Control Type</Table.Th></div>
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-40 text-center border-none uppercase">Effectiveness</Table.Th></div>
                <div class="border-r whitespace-nowrap flex items-center justify-center"><Table.Th class="w-40 text-center border-none uppercase">Likelihood</Table.Th></div>
                <div class="border-r whitespace-nowrap"><Table.Th class="w-40 text-center border-none uppercase"><span class="whitespace-nowrap">Impact Score</span> <br> <span class="whitespace-nowrap">(Worst Rating)</span></Table.Th></div>
                <div class="whitespace-nowrap"><Table.Th class="w-40 text-center border-none  uppercase"><span class="whitespace-nowrap">Overall Risk</span> <br> <span class="whitespace-nowrap">Score (Residual)</span></Table.Th></div>
              </div>
            </div>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">Status</Table.Th>
            <Table.Th class=" min-h-40 text-center border whitespace-nowrap uppercase">ACTIONS</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr v-for="(data, index) in state.viewData" :key="index" class="intro-x">
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 ">
              {{ data.id }}
            </Table.Td>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 ">
              {{ data.process }}
            </Table.Td>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 ">
              {{ data.activity }}
            </Table.Td>
            <Table.Td class="box text-center rounded-l-none rounded-r-none border-x-0 ">
              {{ data.location }}
            </Table.Td>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 ">
              {{ data.type_of_activity }}
            </Table.Td>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 ">
              {{ data.occupations }}
            </Table.Td>
            <div class="uppercase">
              <div class="flex w-full ">
                <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 ">
                  {{ data.event }}
                </Table.Td>
                <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 ">
                  {{ data.cause }}
                </Table.Td>
                <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 ">
                  {{ data.impact }}
                </Table.Td>
              </div>
            </div>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 ">
              {{ data.hazard_type }}
            </Table.Td>
            <Table.Td
              :class="[
                'box w-56 rounded-l-none rounded-r-none border-x-0 ',
                'before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400',
              ]"
            >
              <div class="flex items-center justify-center">
                <router-link :to="{name:'training-attendences-update-form', params:{id:data.id} }" class="flex items-center mr-3">
                  <Lucide icon="CheckSquare" class="w-4 h-4 mr-1" />
                  Edit
                </router-link>
                <a
                  class="flex items-center text-danger"
                  href="javascript:;"
                  @click="deleteData(data.id)">
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
