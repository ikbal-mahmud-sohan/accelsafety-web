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
import { getToken } from './../auth/setToken';

// Reactive state
const state = reactive({
  energyrecords: [] as Array<any>,
  dynamicHeaders: [] as Array<string>, // Headers that include all dynamic fields
  token: getToken(),
});

// Fetch data and setup headers
const fetchData = async () => {
  try {
    const url = config.baseURL + '/api/v1/energy-records';
    const response = await axios.get(url, {
      headers: {
        'Authorization': state.token,
      },
    });

    state.energyrecords = response.data;

    // Extract unique dynamic keys from the first record
    if (state.energyrecords.length > 0) {
      const firstRecord = state.energyrecords[0];
      state.dynamicHeaders = Object.keys(firstRecord).filter(
        (key) =>
          ![
            'Month', // Existing static field
            'UnitName', 
            'EmployeeName', 
            'Designation', 
            'ItemName', 
            'ItemCode', 
            'Type',
          ].includes(key)
      );
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Fetch data on mount
onMounted(() => {
  fetchData();
});
</script>



<template>
  <h2 class="mt-10 text-lg font-medium intro-y">Energy Records List</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <!-- Action Buttons -->
    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
      <router-link :to="{ name: 'energy-records-create' }">
        <Button variant="primary" class="mr-2 shadow-md">
          Add New Energy Records
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

    <!-- Data Table -->
    <div class="col-span-12 overflow-auto intro-y">
      <Table class="border-spacing-y-[10px] border-separate -mt-2">
        <!-- Headers -->
        <Table.Thead>
          <Table.Tr>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Month</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Unit Name</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Employee Name</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Item Name</Table.Th>
            <Table.Th class="text-left border-b-0 whitespace-nowrap uppercase">Item Code</Table.Th>
            <Table.Th v-for="header in state.dynamicHeaders" :key="header" class="text-left border-b-0 whitespace-nowrap uppercase">
              {{ header }}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <!-- Body -->
        <Table.Tbody v-if="state.energyrecords.length !== 0">
          <Table.Tr v-for="(record, index) in state.energyrecords" :key="index" class="intro-x">
            <!-- Static Fields -->
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ record.Month }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ record.UnitName }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ record.EmployeeName }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ record.ItemName	 }}
            </Table.Td>
            <Table.Td class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
              {{ record.ItemCode }}
            </Table.Td>
            <!-- Dynamic Fields -->
            <Table.Td
              v-for="header in state.dynamicHeaders"
              :key="header"
              class="box w-40 text-left rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600"
            >
              {{ record[header] || 0 }} {{ record.EnergyUsed }}
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody v-else>
          <div class="w-40 px-4 py-4 text-red-600">
            No data
          </div>
        </Table.Tbody>
      </Table>
    </div>

    <!-- Pagination -->
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
  </div>
</template>


