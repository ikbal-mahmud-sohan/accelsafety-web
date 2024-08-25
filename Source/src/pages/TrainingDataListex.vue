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
   let  url = config.baseURL+'/api/v1/training-assesments';
    const response = await axios.get(url);
    state.viewData = response.data.TrainingAssessment;
    console.log("res",response.data)
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
  <h2 class="mt-10 text-lg font-medium intro-y">Training List</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
      <!-- <Button variant="primary" class="mr-2 shadow-md">
        Add New Accident
      </Button> -->
      <router-link :to="{ name: 'training-form' }">
        <Button variant="primary" class="mr-2 shadow-md">
          Add New Training
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
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase"> serial number </Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase"> employee name </Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase"> designation </Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase"> department </Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase"> employee type </Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase"> special training need </Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase"> status </Table.Th>
            <Table.Th 
              v-for="(training, index) in state.viewData[0]?.employee?.assign_trainings || []"
              :key="'header-' + index"
              class="text-left border-b-0 whitespace-nowrap uppercase"
            >
              Training Topic {{ index + 1 }}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr v-for="(data, index) in state.viewData" :key="index" class="intro-x">
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ data.employee.id }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ data.employee.name }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ data.employee.designation }}
            </Table.Td>
            <Table.Td class="box text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ data.employee.department }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ data.employee.employee_type }}
            </Table.Td>
            <Table.Td class="box w-64  text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <!-- {{ data.employee.assign_special_trainings }} -->
              <div class="flex">
                <div class="px-1" v-for="(spt, index) in data.employee.assign_special_trainings" :key="index">
                  {{spt.special_training}}
              </div>
              </div>
            </Table.Td>
            <Table.Td class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div
                :class="[
                  'flex items-center justify-center',
                  { 'text-success':data.main_status },
                  { 'text-danger': !data.main_status },
                ]"
              >
                <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                {{ data.main_status ? "Completed" : "Incompleted" }}
              </div>
            </Table.Td>
              <!-- <div class="flex items-center h-full w-full bg-white ">
                  <div class="flex items-center h-full w-full border-y border-[#e2e8f0]"  v-for="(ast, index) in data.employee.assign_trainings" :key="index">
                      <Table.Td class=" w-40 text-left border-none">
                          {{ ast.training_topic.name }}
                      </Table.Td>
                    <Table.Td class=" w-40 text-center border-none">
                      <div
                        :class="[
                          'flex items-center justify-center',
                          { 'text-success':ast.status },
                          { 'text-danger': !ast.status },
                        ]"
                      >
                        <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                        {{ ast.status ? "Completed" : "Incompleted" }}
                      </div>
                    </Table.Td>
                      <Table.Td class=" w-40 text-left border-none">
                          {{ ast.date }}
                      </Table.Td>
                  </div>
              </div> -->
              <!-- Dynamic Columns -->
            <Table.Td class="box w-full text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="flex items-center h-full w-full bg-white">
                <div
                  v-for="(ast, index) in data.employee.assign_trainings"
                  :key="index"
                  class="flex items-center h-full w-1/4 border-y border-[#e2e8f0]"
                >
                  <Table.Td class="w-full text-left border-none">
                    {{ ast.training_topic.name }}
                  </Table.Td>
                  <Table.Td class="w-full text-center border-none">
                    <div
                      :class="[
                        'flex items-center justify-center',
                        { 'text-success': ast.status },
                        { 'text-danger': !ast.status },
                      ]"
                    >
                      <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                      {{ ast.status ? 'Completed' : 'Incompleted' }}
                    </div>
                  </Table.Td>
                  <Table.Td class="w-full text-left border-none">
                    {{ ast.date }}
                  </Table.Td>
                </div>
              </div>
            </Table.Td>

            
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ data.additional_resources }}
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
