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
  visitorsEntry: [] as Array<any>,
  token: getToken(),

});

const fetchData = async () => {
  try {
  //  let  url = config.baseURL+'/api/v1/safety';
   let  url = config.baseURL+'/api/v1/first-aid-checklist';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.visitorsEntry = response.data.data;
    console.log('dataFetched: ', state.visitorsEntry);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const deleteData = async (sID:string) => {
  try {
    // let url = config.baseURL+"/api/v1/safety/"+sID;
    let url = config.baseURL+"/api/v1/first-aid-checklist/delete/"+sID;
    const response = await axios.delete(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    // state.visitorsEntry = response.data.data;

    await fetchData();

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <h2 class="mt-10 text-lg font-medium intro-y">First Aid Checklist List</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
      <router-link :to="{ name: 'hse-first-aid-create' }">
        <Button variant="primary" class="mr-2 shadow-md">
          Add First Aid Checklist
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
        <Table.Thead class="bg-primary text-white">
          <Table.Tr>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase border-r border-secondary">ID</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase border-r border-secondary">First Aid Box No.</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase border-r border-secondary">Location/Authorized dept.</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase border-r border-secondary">Authorized Person</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase border-r border-secondary">Contact No.</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase border-r border-secondary">
              <div class="flex flex-col flex-wrap w-full">
                <div class="w-full text-center border-b border-secondary pb-2 pt-3 -mt-3 h-full">Items</div>
                <div class="flex flex-nowrap pt-2 h-full">
                  <div class="w-1/4 text-center text-wrap px-4 border-r border-secondary">Item Name</div>
                  <div class="w-1/4 text-center text-wrap px-4 border-r border-secondary">Required Quantity</div>
                  <div class="w-1/4 text-center text-wrap px-4 border-r border-secondary">Available Quantity</div>
                  <div class="w-1/4 text-center text-wrap px-4">Remarks</div>
                </div>
              </div>
              <!-- Items
              <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Item Name</Table.Th>
              <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Required Quantity</Table.Th>
              <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Available Quantity</Table.Th>
              <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Remarks</Table.Th> -->
            </Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap uppercase border-r border-secondary">Reference</Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap uppercase">ACTIONS</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody v-if="state.visitorsEntry.length !== 0">
          <Table.Tr  v-for="(report, index) in state.visitorsEntry" :key="index" class="intro-x">
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.id }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.box_no }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.location }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.authorized_person }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.contact_no }}
            </Table.Td>
            <Table.Td class="whitespace-nowrap box text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex flex-nowrap">
                <div class="w-1/4 px-4 text-wrap">
                  {{ report.data[0].item_name }}
                </div>
                <div class="w-1/4 px-4 text-wrap">
                  {{ report.data[0].required_quantity }}
                </div>
                <div class="w-1/4 px-4 text-wrap">
                  {{ report.data[0].available_quantity }}
                </div>
                <div class="w-1/4 px-4 text-wrap">
                  {{ report.data[0].remarks }}
                </div>
              </div>
              <!-- <Table.Td class="whitespace-nowrap box text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                {{ report.data[0].item_name }}
              </Table.Td>
              <Table.Td class="whitespace-nowrap box text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                {{ report.data[0].required_quantity }}
              </Table.Td>
              <Table.Td class="whitespace-nowrap box text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                {{ report.data[0].available_quantity }}
              </Table.Td>
              <Table.Td class="whitespace-nowrap box text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                {{ report.data[0].remarks }}
              </Table.Td> -->
            </Table.Td>
            <Table.Td class=" min-w-60 xl:min-w-80 2xl:min-w-96 box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.reference }}
            </Table.Td>
            <Table.Td
              :class="[
                'box w-56 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600',
                'before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400',
              ]"
            >
              <div class="flex items-center justify-center">
                <!-- <router-link :to="{name:'admin-safety-observatio-update-form', params:{id:report.id} }" class="flex items-center mr-3">
                  <Lucide icon="CheckSquare" class="w-4 h-4 mr-1" />
                  Approved
                </router-link> -->
                <router-link :to="{name:'hse-first-aid-edit', params:{id:report.id} }" class="flex items-center mr-3">
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

