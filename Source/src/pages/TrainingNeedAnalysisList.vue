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

// Define your state using the reactive function
const state = reactive({
  viewData: [] as Array<any>,
  headers: [] as Array<any>,   
  maxLen: 0 as number,
  token: getToken(),
});

// Fetch data from the API and update the state
const fetchData = async () => {
  console.log("tr",state.token)
  try {
    let  url = config.baseURL+'/api/v1/training-assesments';
    const response = await axios.get(url,{
                headers: {
                    'Authorization': state.token,
                },
                });
    state.viewData = response.data.TrainingAssessment;

    // let maxTrainingLength = 0;
    // state.viewData.forEach((item) => {
    //   const length = item.employee.assign_trainings?.length || 0;
    //   if (length > maxTrainingLength) {
    //     maxTrainingLength = length;
    //   }
    //   state.maxLen = maxTrainingLength
    // });


    // Assuming each training object has a 'assign_trainings' array to derive headers
    if (state.viewData.length) {
      const firstTraining = state.viewData[0].employee.assign_trainings;
      state.headers = firstTraining.map((_: any, index: number) => ({
        name: `Training Topic ${index + 1}`,
        date: `Training Date ${index + 1}`,
        status: `Training Status ${index + 1}`
      }));
    }

    console.log("res", response.data);
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
  <h2 class="mt-10 text-lg font-medium intro-y">Training Need Analysis List</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <!-- BEGIN: Data List -->
    <div class="col-span-12 overflow-auto intro-y">
      <Table class="border-spacing-y-[10px] border-separate -mt-2">
        <Table.Thead>
          <Table.Tr>
            <!-- Static Headers -->
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">serial number</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">employee name</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">designation</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">department</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">employee type</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">status</Table.Th>
            
            <!-- Dynamic Headers -->
            <template v-for="header in state.headers" :key="header.name">
              <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">{{ header.name }}</Table.Th>
              <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">{{ header.date }}</Table.Th>
              <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">{{ header.status }}</Table.Th>
            </template>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr v-for="(data, index) in state.viewData" :key="index" class="intro-x bg-white my-2">
            <!-- Static Data Columns -->
            <Table.Td>{{ data.employee.id || '' }}</Table.Td>
            <Table.Td>{{ data.employee.name || '' }}</Table.Td>
            <Table.Td>{{ data.employee.designation || '' }}</Table.Td>
            <Table.Td>{{ data.employee.department || '' }}</Table.Td>
            <Table.Td>{{ data.employee.employee_type || '' }}</Table.Td>
            <Table.Td>
              <div :class="['flex items-center justify-center', data.main_status ? 'text-success' : 'text-danger']">
                <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                {{ data.main_status ? "Completed" : "Incomplete" }}
              </div>
            </Table.Td>
            
            <!-- Dynamic Data Columns -->
            <template v-for="(ast, index) in data.employee.assign_trainings" :key="index">
              <Table.Td>
              {{ ast.training_topic?.name || '' }}
              </Table.Td>
              <Table.Td class="text-center">
                <span v-if="ast.date" class="">{{ ast.date }}</span>
                <Button v-else variant="soft-pending" rounded class="w-24 mb-2 mr-1">
                  Pending
                </Button>
              </Table.Td>
              <Table.Td>
                <div :class="['flex items-center justify-center', ast.status ? 'text-success' : 'text-danger']">
                  <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                  {{ ast.status ? "Completed" : "Incomplete" }}
                </div>
              </Table.Td>
           </template>
             <!-- <template v-for="(ast, index) in data.employee.assign_trainings" :key="index">
             <p>{{index}}</p>
                  <Table.Td v-if="index<state.maxLen" class="text-center">
                    <Button variant="soft-danger" rounded class="w-24 mb-2 mr-1">
                      No Data
                    </Button>
                  </Table.Td>
                  <Table.Td v-if="data.employee.assign_trainings.length<state.maxLen" class="text-center">
                    <Button variant="soft-danger" rounded class="w-24 mb-2 mr-1">
                      No Data
                    </Button>
                  </Table.Td>
                  <Table.Td v-if="data.employee.assign_trainings.length<state.maxLen" class="text-center">
                    <Button variant="soft-danger" rounded class="w-24 mb-2 mr-1">
                      No Data
                    </Button>
                  </Table.Td>
            </template> -->
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


