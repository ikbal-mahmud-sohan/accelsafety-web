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
import { getToken } from './../auth/setToken'

const state = reactive({
  noiseIntensityMeasurementData: [] as Array<any>,
  token: getToken(),

});

const fetchData = async () => {
  try {
   let  url = config.baseURL+'/api/v1/bench-cutting-machine-checklists';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.noiseIntensityMeasurementData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteData = async (sID:string) => {
  try {
    let url = config.baseURL+"/api/v1/bench-cutting-machine-checklists/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.noiseIntensityMeasurementData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <h2 class="mt-10 text-lg font-medium intro-y">List Bench Cutting Machine</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
      <router-link :to="{ name: 'bench-cutting-machine-checklists-create' }">
        <Button variant="primary" class="mr-2 shadow-md">
          Add Bench Cutting Machine
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
    <div class="col-span-12 overflow-auto intro-y " >
      <Table class="border-spacing-y-[10px] border-separate -mt-2">
        <Table.Thead>
          <Table.Tr>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">SL No</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Checked By</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Checked Date</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Reviewed By</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Reviewed Date</Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap uppercase">ACTIONS</Table.Th>
          </Table.Tr>
        </Table.Thead>
       
        <Table.Tbody v-if="state.noiseIntensityMeasurementData.length !== 0">
          <Table.Tr  v-for="(report, index) in state.noiseIntensityMeasurementData" :key="index" class="intro-x">
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.id }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.checked_by }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.checked_by_date }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.checked_by_date }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.reviewed_by_date }}
            </Table.Td>
           
            <Table.Td
              :class="[
                'box w-56 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600',
                'before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400',
              ]"
            >
              <div class="flex items-center justify-center">
                <!-- <router-link :to="{name:'safety-observatio-update-form', params:{id:report.id} }" class="flex items-center mr-3">
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
        <Table.Tbody v-else class=" ">
          <div class="w-40 px-4 py-4 text-red-600">
            No data
          </div>
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
