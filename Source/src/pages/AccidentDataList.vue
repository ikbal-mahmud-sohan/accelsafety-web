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

// Define your state using the reactive function
const state = reactive({
  accidentReports: [] as Array<any>,
});

// Fetch data from the API and update the state
const fetchData = async () => {
  try {
    const response = await axios.get('http://accelsafety.test/api/v1/accident');
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
  <h2 class="mt-10 text-lg font-medium intro-y">Accident List</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
      <!-- <Button variant="primary" class="mr-2 shadow-md">
        Add New Accident
      </Button> -->
      <router-link :to="{ name: 'accident-form' }">
        <Button variant="primary" class="mr-2 shadow-md">
          Add New Accident
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
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase"> MONTH </Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase"> date </Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">NAME</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase"> DESIGNATIONS</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">SUPERVISOR</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">department</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">type of accident</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">description</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">zone location</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">precise location</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">injury type</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">affected body parts</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">property damaged</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">root cause</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">action</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">days lost</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">remarks</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">type of victim employee</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">responsible name</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">deadline</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">verified image</Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap uppercase">STATUS</Table.Th>
            <Table.Th class="text-center border-b-0 whitespace-nowrap uppercase">ACTIONS</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr v-for="(report, index) in state.accidentReports" :key="index" class="intro-x">
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.id }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.month }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.date }}
            </Table.Td>
            <Table.Td class="box text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.name }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.designation }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.supervisor }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.department }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.type_of_accident }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              <div class="relative group">
                <div class="lg:truncate w-32" v-html="report.description"></div>
                <div class="top-0 left-0 absolute w-72 bg-white shadow-xl rounded-md z-50 px-4 py-4 hidden group-hover:block" v-html="report.description"></div>
              </div>
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.zone_location }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.precise_location }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.injury_type }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.affected_body_parts }}
            </Table.Td>
            <Table.Td
              class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600"
            >
              <div
                :class="[
                  'flex items-center justify-center',
                  { 'text-success':report.property_damaged },
                  { 'text-danger': !report.property_damaged },
                ]"
              >
                <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                {{ report.property_damaged ? "YES" : "NO" }}
              </div>
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.root_cause }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              
              <div class="relative group">
                <div class="lg:truncate w-32">
                  {{ report.action }}
                </div>
                <div class="top-0 left-0 absolute w-72 bg-white shadow-xl rounded-md z-50 px-4 py-4 hidden group-hover:block">
                  {{ report.action }}
                </div>
              </div>
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.days_lost }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.remarks }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.type_of_victim_employee }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.responsible_name }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.deadline }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ report.verified_image }}
            </Table.Td>
            <Table.Td
              class="box w-40 text-center rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600"
            >
              <div
                :class="[
                  'flex items-center justify-center',
                  { 'text-success':report.status },
                  { 'text-danger': !report.status },
                ]"
              >
                <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                {{ report.status ? "Active" : "Inactive" }}
              </div>
            </Table.Td>
            <Table.Td
              :class="[
                'box w-56 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600',
                'before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400',
              ]"
            >
              <div class="flex items-center justify-center">
                <a class="flex items-center mr-3" href="">
                  <Lucide icon="CheckSquare" class="w-4 h-4 mr-1" />
                  Edit
                </a>
                <a
                  class="flex items-center text-danger"
                  href="#"
                  @click="(event) => {
                      event.preventDefault();
                      setDeleteConfirmationModal(true);}">
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
