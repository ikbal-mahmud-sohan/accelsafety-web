import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/themes";
import { getToken } from "../auth/setToken";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/Login.vue"),
    },
    {
      path: "/",
      component: Layout,
      children: [
        
        // {
        //   path: "/dashboard",
        //   name: "dashboard-overview-1",
        //   component: () => import("../pages/DashboardOverview1.vue"),
        // },
        {
          path: "/dashboard",
          name: "dashboard-overview-1",
          component: () => import("../pages/DashboardSafetyObservation.vue"),
        },
        {
          path: "dashboard-overview-2",
          name: "dashboard-overview-2",
          component: () => import("../pages/DashboardEnergy.vue"),
        },
        {
          path: "dashboard-overview-3",
          name: "dashboard-overview-3",
          component: () => import("../pages/DashboardOverview3.vue"),
        },
        {
          path: "dashboard-overview-4",
          name: "dashboard-overview-4",
          component: () => import("../pages/DashboardOverview4.vue"),
        },
        {
          path: "categories",
          name: "categories",
          component: () => import("../pages/Categories.vue"),
        },
        {
          path: "add-product",
          name: "add-product",
          component: () => import("../pages/AddProduct.vue"),
        },
        {
          path: "product-list",
          name: "product-list",
          component: () => import("../pages/ProductList.vue"),
        },
        {
          path: "product-grid",
          name: "product-grid",
          component: () => import("../pages/ProductGrid.vue"),
        },
        {
          path: "transaction-list",
          name: "transaction-list",
          component: () => import("../pages/TransactionList.vue"),
        },
        {
          path: "transaction-detail",
          name: "transaction-detail",
          component: () => import("../pages/TransactionDetail.vue"),
        },
        {
          path: "seller-list",
          name: "seller-list",
          component: () => import("../pages/SellerList.vue"),
        },
        {
          path: "seller-detail",
          name: "seller-detail",
          component: () => import("../pages/SellerDetail.vue"),
        },
        {
          path: "reviews",
          name: "reviews",
          component: () => import("../pages/Reviews.vue"),
        },
        {
          path: "inbox",
          name: "inbox",
          component: () => import("../pages/Inbox.vue"),
        },
        {
          path: "file-manager",
          name: "file-manager",
          component: () => import("../pages/FileManager.vue"),
        },
        {
          path: "point-of-sale",
          name: "point-of-sale",
          component: () => import("../pages/PointOfSale.vue"),
        },
        {
          path: "chat",
          name: "chat",
          component: () => import("../pages/Chat.vue"),
        },
        {
          path: "post",
          name: "post",
          component: () => import("../pages/Post.vue"),
        },
        {
          path: "calendar",
          name: "calendar",
          component: () => import("../pages/Calendar.vue"),
        },
        {
          path: "crud-data-list",
          name: "crud-data-list",
          component: () => import("../pages/CrudDataList.vue"),
        },
        {
          path: "crud-form",
          name: "crud-form",
          component: () => import("../pages/CrudForm.vue"),
        },
        // accSafety
        {
          path: "accident-data-list",
          name: "accident-data-list",
          component: () => import("../pages/AccidentDataList.vue"),
        },
        {
          path: "accident-form",
          name: "accident-form",
          component: () => import("../pages/AccidentForm.vue"),
        },
        {
          path: "accident-input",
          name: "accident-input",
          component: () => import("../pages/AccidentInput.vue"),
        },
        {
          path: "accident/:id/update",
          name: "accident-update-form",
          component: () => import("../pages/AccidentUpdateForm.vue"),
        },
        {
          path: "accident-investigations",
          name: "accident-investigation-list",
          component: () => import("../pages/AccidentInvestigationList.vue"),
        },
        {
          path: "accident-investigation/:id",
          name: "accident-investigation-form",
          component: () => import("../pages/AssignAccidentInvestigation.vue"),
        },
        {
          path: "accident-investigation/:id/update",
          name: "accident-investigation-update-form",
          component: () => import("../pages/AccidentInvestigationUpdateForm.vue"),
        },
        {
          path: "accident-investigation/:id/admin/update",
          name: "accident-investigation-admin-update",
          component: () => import("../pages/AccidentInvestigationForm.vue"),
        },
        // Safety Observation
        {
          path: "safety-observations",
          name: "safety-observation-data-list",
          component: () => import("../pages/SafetyObservationtDataList.vue"),
        },
        {
          path: "safety-observation-create",
          name: "safety-observation-form",
          component: () => import("../pages/SafetyObservationForm.vue"),
        },
        // Energy
        {
          path: "energy-records-create",
          name: "energy-records-create",
          component: () => import("../pages/EnergyRecordsForm.vue"),
        },
        {
          path: "energy-records-list",
          name: "energy-records-list",
          component: () => import("../pages/EnergyRecordsList.vue"),
        },
        {
          path: "waste-consumption-create",
          name: "waste-consumption-create",
          component: () => import("../pages/WasteConsumptionForm.vue"),
        },
        {
          path: "waste-consumption-list",
          name: "waste-consumption-list",
          component: () => import("../pages/WasteConsumptionList.vue"),
        },
        {
          path: "water-consumption-create",
          name: "water-consumption-create",
          component: () => import("../pages/WaterConsumptionForm.vue"),
        },
        {
          path: "water-consumption-list",
          name: "water-consumption-list",
          component: () => import("../pages/WaterConsumptionList.vue"),
        },
        {
          path: "safety-observation-input",
          name: "safety-observation-input",
          component: () => import("../pages/SafetyObservationInput.vue"),
        },
        {
          path: "safety-observatio/:id/update",
          name: "safety-observatio-update-form",
          component: () => import("../pages/SafetyObservatioUpdateForm.vue"),
        },
        {
          path: "admin-safety-observatio/:id/update",
          name: "admin-safety-observatio-update-form",
          component: () => import("../pages/AdminSafetyObservatioUpdateForm.vue"),
        },
        // unit
        {
          path: "unit-input",
          name: "unit-input",
          component: () => import("../pages/UnitInput.vue"),
        },
        // Training
        {
          path: "trainings",
          name: "training-data-list",
          component: () => import("../pages/TrainingNeedAnalysisList.vue"),
        },
        {
          path: "training-create",
          name: "training-form",
          component: () => import("../pages/TrainingForm.vue"),
        },
        {
          path: "assign-training",
          name: "assign-training-form",
          component: () => import("../pages/AssignTrainingForm.vue"),
        },
        {
          path: "assign-multiple-training",
          name: "assign-multiple-training-form",
          component: () => import("../pages/AssignMultipleTrainingForm.vue"),
        },
        {
          path: "training/:id/update",
          name: "training-update-form",
          component: () => import("../pages/TrainingUpdateForm.vue"),
        },
        // Training Attendence
        {
          path: "training-attendences",
          name: "training-attendences-data-list",
          component: () => import("../pages/TrainingAttendencesDataList.vue"),
        },
        {
          path: "training-attendences-create",
          name: "training-attendences-form",
          component: () => import("../pages/TrainingAttendencesForm.vue"),
        },
        {
          path: "training-attendences-multiple",
          name: "training-attendences-multiple-form",
          component: () => import("../pages/TrainingAttendencesMultiple.vue"),
        },
        {
          path: "training-attendences/:id/update",
          name: "training-attendences-update-form",
          component: () => import("../pages/TrainingAttendencesUpdateForm.vue"),
        },
        {
          path: "question-and-answer",
          name: "question-and-answer",
          component: () => import("../pages/QuestionAnswer.vue"),
        },
        {
          path: "question-and-answer-list",
          name: "question-and-answer-list",
          component: () => import("../pages/QuestionAnswerList.vue"),
        },
        {
          path: "user-submit-answer",
          name: "user-submit-answer",
          component: () => import("../pages/UserSubmitAnswer.vue"),
        },
        {
          path: "user-results",
          name: "user-results",
          component: () => import("../pages/UserSubmitAnswerList.vue"),
        },
        // EmployeeInfo
        {
          path: "employee-info",
          name: "employee-info-list",
          component: () => import("../pages/EmployeeInfoDataList.vue"),
        },
        {
          path: "employee-info-create",
          name: "employee-info-form",
          component: () => import("../pages/EmployeeInfoForm.vue"),
        },
        {
          path: "employee-info/:id/update",
          name: "employee-info-update-form",
          component: () => import("../pages/EmployeeInfoUpdateForm.vue"),
        },
        // Department
        {
          path: "departments",
          name: "department-info-list",
          component: () => import("../pages/DepartmentDataList.vue"),
        },
        {
          path: "departments-create",
          name: "department-form",
          component: () => import("../pages/DepartmentForm.vue"),
        },
        {
          path: "departments/:id/update",
          name: "department-update-form",
          component: () => import("../pages/DepartmentUpdateForm.vue"),
        },
        // Designation
        {
          path: "Designation",
          name: "designation-info-list",
          component: () => import("../pages/DesignationDataList.vue"),
        },
        {
          path: "Designation-create",
          name: "designation-form",
          component: () => import("../pages/DesignationForm.vue"),
        },
        {
          path: "Designation/:id/update",
          name: "designation-update-form",
          component: () => import("../pages/DesignationUpdateForm.vue"),
        },
        // accSafety
        {
          path: "hiras",
          name: "hira-data-list",
          component: () => import("../pages/HiraDataList.vue"),
        },
        {
          path: "hira-input",
          name: "hira-data-input",
          component: () => import("../pages/HiraInput.vue"),
        },
        {
          path: "hira-lites-list/:id",
          name: "hira-lites-list",
          component: () => import("../pages/HiraLitesList.vue"),
        },
        {
          path: "accel-safety-words",
          name: "accel-safety-words",
          component: () => import("../pages/AccelSafetyWordList.vue"),
        },
        {
          path: "accel-safety-words-create",
          name: "accel-safety-words-create",
          component: () => import("../pages/AccelSafetyWordForm.vue"),
        },
        {
          path: "accel-safety-words/:id",
          name: "accel-safety-words-view",
          component: () => import("../pages/AccelSafetyWordView.vue"),
        },
        {
          path: "hira-risk-assesment-from",
          name: "hira-risk-assesment-from",
          component: () => import("../pages/HiraRiskAssessmentForm.vue"),
        },
        {
          path: "hira-risk-assesment-list",
          name: "hira-risk-assesment-list",
          component: () => import("../pages/RiskAssessmentList.vue"),
        },
        // Hira
        {
          path: "hse",
          name: "hse-data-list",
          component: () => import("../pages/HseDataList.vue"),
        },
          // sub hse start
          {
            path: "hse-control-visitors",
            name: "hse-control-visitors",
            component: () => import("../pages/HseControlVisitors.vue"),
          },
          {
            path: "control-visitors-data",
            name: "control-visitors-data",
            component: () => import("../pages/HseControlVisitorsData.vue"),
          },
          {
            path: "visitor-log",
            name: "visitor-log",
            component: () => import("../pages/HseVisitorLogData.vue"),
          },
          {
            path: "visitor-entry",
            name: "visitor-entry",
            component: () => import("../pages/HseVisitorsEntry.vue"),
          },
          {
            path: "hse-vehicle-safety",
            name: "hse-vehicle-safety",
            component: () => import("../pages/HseVehicleSafety.vue"),
          },
          {
            path: "hse-vehicle-safety-doc",
            name: "hse-vehicle-safety-doc",
            component: () => import("../pages/HseVehicleSafetyDoc.vue"),
          },
          {
            path: "hse-vehicle-safety-checklist",
            name: "hse-vehicle-safety-checklist",
            component: () => import("../pages/HseVehicleSafetyChecklist.vue"),
          },
          {
            path: "hse-vehicle-safety-list",
            name: "hse-vehicle-safety-list",
            component: () => import("../pages/HseVehicleSafetyChecklistList.vue"),
          },
          // SafetyCommittee
          {
            path: "hse-safety-committee",
            name: "hse-safety-committee",
            component: () => import("../pages/HseSafetyCommittee.vue"),
          },
          {
            path: "hse-safety-committee-doc",
            name: "hse-safety-committee-doc",
            component: () => import("../pages/HseSafetyCommitteeDoc.vue"),
          },
          {
            path: "hse-safety-committee-create",
            name: "hse-safety-committee-create",
            component: () => import("../pages/HseSafetyCommitteeCreate.vue"),
          },
          {
            path: "hse-safety-committee-edit/:id",
            name: "hse-safety-committee-edit",
            component: () => import("../pages/HseSafetyCommitteeCreate.vue"),
          },
          {
            path: "hse-safety-committee-list",
            name: "hse-safety-committee-list",
            component: () => import("../pages/HseSafetyCommitteeList.vue"),
          },
          // SafetyPowerTools
          {
            path: "hse-safety-power-tools",
            name: "hse-safety-power-tools",
            component: () => import("../pages/HseSafetyPower.vue"),
          },
          {
            path: "hse-safety-power-tools-doc",
            name: "hse-safety-power-tools-doc",
            component: () => import("../pages/HseSafetyPowerDoc.vue"),
          },
          {
            path: "hse-safety-power-tools-create",
            name: "hse-safety-power-tools-create",
            component: () => import("../pages/HseSafetyPowerToolsCreate.vue"),
          },
          {
            path: "hse-safety-power-tools-edit/:id",
            name: "hse-safety-power-tools-edit",
            component: () => import("../pages/HseSafetyPowerToolsCreate.vue"),
          },
          {
            path: "hse-safety-power-tools-list",
            name: "hse-safety-power-tools-list",
            component: () => import("../pages/HseSafetyPowerToolsList.vue"),
          },
          // Sight and Hearing Protection
          {
            path: "hse-sight-hearin-protection",
            name: "hse-sight-hearin-protection",
            component: () => import("../pages/HseSightHearinProtection.vue"),
          },
          {
            path: "hse-sight-hearin-protection-doc",
            name: "hse-sight-hearin-protection-doc",
            component: () => import("../pages/HseSightHearinProtectionDoc.vue"),
          },
          {
            path: "hse-noise-intensity-measurement-list",
            name: "hse-noise-intensity-measurement-list",
            component: () => import("../pages/HseNoiseIntensityMeasurementList.vue"),
          },
          {
            path: "hse-noise-intensity-measurement-create",
            name: "hse-noise-intensity-measurement-create",
            component: () => import("../pages/HseNoiseIntensityMeasurementCreate.vue"),
          },
          {
            path: "hse-light-intensity-measurement-list",
            name: "hse-light-intensity-measurement-list",
            component: () => import("../pages/HseLightIntensityMeasurementList.vue"),
          },
          {
            path: "hse-light-intensity-measurement-create",
            name: "hse-light-intensity-measurement-create",
            component: () => import("../pages/HseLightIntensityMeasurementCreate.vue"),
          },
          // Work at Height
          
          {
            path: "hse-work-height",
            name: "hse-work-height",
            component: () => import("../pages/HseWorkHeight.vue"),
          },
          {
            path: "hse-work-height-doc",
            name: "hse-work-height-doc",
            component: () => import("../pages/HseWorkHeightDoc.vue"),
          },
          {
            path: "hse-ladder-self-inspection-checklist",
            name: "hse-ladder-self-inspection-checklist",
            component: () => import("../pages/HseLadderSelfInspectionChecklist.vue"),
          },

          // ok ok ok 
          {
            path: "hse-ladder-self-inspection-list",
            name: "hse-ladder-self-inspection-list",
            component: () => import("../pages/HseLadderSelfInspectionList.vue"),
          },
          
          //SafeCraneOperation
          {
            path: "hse-safe-crane-operation",
            name: "hse-safe-crane-operation",
            component: () => import("../pages/HseSafeCraneOperation.vue"),
          },
          {
            path: "hse-safe-crane-operation-doc",
            name: "hse-safe-crane-operation-doc",
            component: () => import("../pages/HseSafeCraneOperationDoc.vue"),
          },
          // Master List of Lifting Equipments
          {
            path: "hse-master-listLifting-equipments",
            name: "hse-master-listLifting-equipments",
            component: () => import("../pages/HseMasterListLiftingEquipments.vue"),
          },
          {
            path: "hse-master-listLifting-equipments-create",
            name: "hse-master-listLifting-equipments-create",
            component: () => import("../pages/HseMasterCreateLiftingEquipments.vue"),
          },
          // List of Lifting Loose Gears
          {
            path: "hse-lifting-loose-gears",
            name: "hse-lifting-loose-gears",
            component: () => import("../pages/HseLiftingLooseGearsList.vue"),
          },
          {
            path: "hse-lifting-loose-gears-create",
            name: "hse-lifting-loose-gears-create",
            component: () => import("../pages/HseLiftingLooseGearsCreate.vue"),
          },
          //MobileCraneSafetyProcedure
          {
            path: "hse-mobile-crane-safety-procedure",
            name: "hse-mobile-crane-safety-procedure",
            component: () => import("../pages/HseMobileCraneSafetyProcedure.vue"),
          },
          {
            path: "hse-mobile-crane-safety-procedure-doc",
            name: "hse-mobile-crane-safety-procedure-doc",
            component: () => import("../pages/HseMobileCraneSafetyProcedureDoc.vue"),
          },
          {
            path: "hse-timber-block-required-under-mobile-crane",
            name: "hse-timber-block-required-under-mobile-crane",
            component: () => import("../pages/HseTimberBlockRequiredUnderMobileCrane.vue"),
          },
          {
            path: "hse-mobile-crane-planning-risk-assessment",
            name: "hse-mobile-crane-planning-risk-assessment",
            component: () => import("../pages/HseMobileCranePlanningRiskAssessment.vue"),
          },
          //EntryConfinedSpace
          {
            path: "hse-confined-space",
            name: "hse-confined-space",
            component: () => import("../pages/HseEntryConfinedSpace.vue"),
          },
          {
            path: "hse-confined-space-doc",
            name: "hse-confined-space-doc",
            component: () => import("../pages/HseEntryConfinedSpaceDoc.vue"),
          },
          {
            path: "hse-confined-space-list",
            name: "hse-confined-space-list",
            component: () => import("../pages/HseConfinedSpace.vue"),
          },
          {
            path: "hse-confined-space-create",
            name: "hse-confined-space-create",
            component: () => import("../pages/HseConfinedSpaceCreate.vue"),
          },
          //PressureVessel
          {
            path: "hse-pressure-vessel",
            name: "hse-pressure-vessel",
            component: () => import("../pages/HsePressureVessel.vue"),
          },
          {
            path: "hse-pressure-vessel-doc",
            name: "hse-pressure-vessel-doc",
            component: () => import("../pages/HsePressureVesselDoc.vue"),
          },
          {
            path: "hse-list-pressure-vessels",
            name: "hse-list-pressure-vessels",
            component: () => import("../pages/HseListPressureVessels.vue"),
          },
          // dot 
          {
            path: "hse-list-pressure-vessels-create",
            name: "hse-list-pressure-vessels-create",
            component: () => import("../pages/HseCreatePressureVessels.vue"),
          },
          //CompressedGasCylinder
          {
            path: "hse-compressed-gas-cylinder",
            name: "hse-compressed-gas-cylinder",
            component: () => import("../pages/HseCompressedGasCylinder.vue"),
          },
          {
            path: "hse-compressed-gas-cylinder-doc",
            name: "hse-compressed-gas-cylinder-doc",
            component: () => import("../pages/HseCompressedGasCylinderDoc.vue"),
          },
          //ChemicalHandling
          {
            path: "hse-chemical-handling",
            name: "hse-chemical-handling",
            component: () => import("../pages/HseChemicalHandling.vue"),
          },
          {
            path: "hse-chemical-handling-doc",
            name: "hse-chemical-handling-doc",
            component: () => import("../pages/HseChemicalHandlingDoc.vue"),
          },
          {
            path: "hse-chemical-register-create",
            name: "hse-chemical-register-create",
            component: () => import("../pages/HseChemicalRegisterCreate.vue"),
          },
          {
            path: "hse-chemical-register",
            name: "hse-chemical-register",
            component: () => import("../pages/HseChemicalRegisterList.vue"),
          },
          //HotWorkProcedure
          {
            path: "hse-hot-work-procedure",
            name: "hse-hot-work-procedure",
            component: () => import("../pages/HseHotWorkProcedure.vue"),
          },
          {
            path: "hse-hot-work-procedure-doc",
            name: "hse-hot-work-procedure-doc",
            component: () => import("../pages/HseHotWorkProcedureDoc.vue"),
          },
          {
            path: "hse-hot-work-procedure-doc",
            name: "hse-hot-work-procedure-doc",
            component: () => import("../pages/HseHotWorkProcedureDoc.vue"),
          },
          //ManagementFireSafetySystem
          {
            path: "hse-management-fire-safety-system",
            name: "hse-management-fire-safety-system",
            component: () => import("../pages/HseManagementFireSafetySystem.vue"),
          },
          {
            path: "hse-management-fire-safety-system-doc",
            name: "hse-management-fire-safety-system-doc",
            component: () => import("../pages/HseManagementFireSafetySystemDoc.vue"),
          },
          //MaterialHandlingProcedure 
          {
            path: "hse-material-handling-procedure",
            name: "hse-material-handling-procedure",
            component: () => import("../pages/HseMaterialHandlingProcedure.vue"),
          },
          {
            path: "hse-material-handling-procedure-doc",
            name: "hse-material-handling-procedure-doc",
            component: () => import("../pages/HseMaterialHandlingProcedureDoc.vue"),
          },
          //house-keeping
          {
            path: "hse-house-keeping",
            name: "hse-house-keeping",
            component: () => import("../pages/HseHouseKeeping.vue"),
          },
          {
            path: "hse-house-keeping-doc",
            name: "hse-house-keeping-doc",
            component: () => import("../pages/HseHouseKeepingDoc.vue"),
          },
          //PermitWork
          {
            path: "hse-permit-work",
            name: "hse-permit-work",
            component: () => import("../pages/HsePermitWork.vue"),
          },
          {
            path: "hse-permit-work-doc",
            name: "hse-permit-work-doc",
            component: () => import("../pages/HsePermitWorkDoc.vue"),
          },
          {
            path: "hse-permit-work-form",
            name: "hse-permit-work-form",
            component: () => import("../pages/hsePermitWorkForm.vue"),
          },
          {
            path: "hse-permit-work-list",
            name: "hse-permit-work-list",
            component: () => import("../pages/hsePermitWorkList.vue"),
          },
          //ElectricalSafety
          {
            path: "hse-electrical-safety",
            name: "hse-electrical-safety",
            component: () => import("../pages/HseElectricalSafety.vue"),
          },
          {
            path: "hse-electrical-safety-doc",
            name: "hse-electrical-safety-doc",
            component: () => import("../pages/HseElectricalSafetyDoc.vue"),
          },
          //LOTO
          {
            path: "hse-loto",
            name: "hse-loto",
            component: () => import("../pages/HseLOTO.vue"),
          },
          {
            path: "hse-loto-doc",
            name: "hse-loto-doc",
            component: () => import("../pages/HseLOTODoc.vue"),
          },
          //ExcavationProcedure
          {
            path: "hse-excavation-procedure",
            name: "hse-excavation-procedure",
            component: () => import("../pages/HseExcavationProcedure.vue"),
          },
          {
            path: "hse-excavation-procedure-doc",
            name: "hse-excavation-procedure-doc",
            component: () => import("../pages/HseExcavationProcedureDoc.vue"),
          },
          {
            path: "hse-earthing-pit-condition",
            name: "hse-earthing-pit-condition",
            component: () => import("../pages/HseEarthingPitCondition.vue"),
          },
          {
            path: "hse-earthing-pit-condition-create",
            name: "hse-earthing-pit-condition-create",
            component: () => import("../pages/HseEarthingPitConditionCreate.vue"),
          },
          {
            path: "hse-safety-checklist-hv-list",
            name: "hse-safety-checklist-hv-list",
            component: () => import("../pages/HseSafetyChecklistHVList.vue"),
          },
          {
            path: "hse-safety-checklist-hv-create",
            name: "hse-safety-checklist-hv-create",
            component: () => import("../pages/HseSafetyChecklistHV.vue"),
          },
          {
            path: "hse-Safety-tt-list",
            name: "hse-Safety-tt-list",
            component: () => import("../pages/HseTransformerTestingList.vue"),
          },
          {
            path: "hse-Safety-tt-create",
            name: "hse-Safety-tt-create",
            component: () => import("../pages/HseTransformerTestingCreate.vue"),
          },
          //Personal Protective Equipment
          {
            path: "hse-personal-protective-equipment",
            name: "hse-personal-protective-equipment",
            component: () => import("../pages/HsePersonalProtectiveEquipment.vue"),
          },
          {
            path: "hse-personal-protective-equipment-doc",
            name: "hse-personal-protective-equipment-doc",
            component: () => import("../pages/HsePersonalProtectiveEquipmentDoc.vue"),
          },
          //Safety Signage Management
          {
            path: "hse-safety-signage-management",
            name: "hse-safety-signage-management",
            component: () => import("../pages/HseSafetySignageManagement.vue"),
          },
          {
            path: "hse-safety-signage-management-doc",
            name: "hse-safety-signage-management-doc",
            component: () => import("../pages/HseSafetySignageManagementDoc.vue"),
          },
          //FirstAid
          {
            path: "hse-first-aid",
            name: "hse-first-aid",
            component: () => import("../pages/HseFirstAid.vue"),
          },
          {
            path: "hse-first-aid-doc",
            name: "hse-first-aid-doc",
            component: () => import("../pages/HseFirstAidDoc.vue"),
          },
          
          //Job Safety Analysis
          {
            path: "hse-job-safety-analysis",
            name: "hse-job-safety-analysis",
            component: () => import("../pages/HseJobSafetyAnalysis.vue"),
          },
          {
            path: "hse-job-safety-analysis-doc",
            name: "hse-job-safety-analysis-doc",
            component: () => import("../pages/HseJobSafetyAnalysisDoc.vue"),
          },
          // sub hse end
          
          // Hse
          {
            path: "hse-jcb",
            name: "hse-jcb",
            component: () => import("../pages/HseJcb.vue"),
          },
          {
            path: "hse-jcb-checklists",
            name: "hse-jcb-checklists",
            component: () => import("../pages/HseJcbChecklists.vue"),
          },
          {
            path: "hse-jcb-checklists-create",
            name: "hse-jcb-checklists-create",
            component: () => import("../pages/HseJcbChecklistsCreate.vue"),
          },
          {
            path: "hse-excavator",
            name: "hse-excavator",
            component: () => import("../pages/HseExcavator.vue"),
          },
          {
            path: "hse-excavator-checklists",
            name: "hse-excavator-checklists",
            component: () => import("../pages/HseExcavatorChecklists.vue"),
          },
          {
            path: "hse-excavator-checklists-create",
            name: "hse-excavator-checklists-create",
            component: () => import("../pages/HseExcavatorChecklistsCreate.vue"),
          },
          {
            path: "hse-earth-compactors",
            name: "hse-earth-compactors",
            component: () => import("../pages/HseEarthCompactors.vue"),
          },
          {
            path: "hse-earth-compactors-checklists",
            name: "hse-earth-compactors-checklists",
            component: () => import("../pages/HseEarthCompactorsChecklists.vue"),
          },
          {
            path: "hse-earth-compactors-checklists-create",
            name: "hse-earth-compactors-checklists-create",
            component: () => import("../pages/HseEarthCompactorsChecklistsCreate.vue"),
          },
          {
            path: "hse-dumper",
            name: "hse-dumper",
            component: () => import("../pages/HseDumper.vue"),
          },
          {
            path: "hse-dumper-checklists",
            name: "hse-dumper-checklists",
            component: () => import("../pages/HseDumperChecklists.vue"),
          },
          {
            path: "hse-dumper-checklists-create",
            name: "hse-dumper-checklists-create",
            component: () => import("../pages/HseDumperChecklistsCreate.vue"),
          },
          {
            path: "hse-concrete-mixer",
            name: "hse-concrete-mixer",
            component: () => import("../pages/HseConcreteMixer.vue"),
          },
          {
            path: "hse-concrete-mixer-checklists",
            name: "hse-concrete-mixer-checklists",
            component: () => import("../pages/HseConcreteMixerChecklists.vue"),
          },
          {
            path: "hse-concrete-mixer-checklists-create",
            name: "hse-concrete-mixer-checklists-create",
            component: () => import("../pages/HseConcreteMixerChecklistsCreate.vue"),
          },
          {
            path: "hse-transit-mixer",
            name: "hse-transit-mixer",
            component: () => import("../pages/HseTransitMixer.vue"),
          },
          {
            path: "hse-transit-mixers-checklists",
            name: "hse-transit-mixers-checklists",
            component: () => import("../pages/HseTransitMixersChecklists.vue"),
          },
          {
            path: "hse-transit-mixers-checklists-create",
            name: "hse-transit-mixers-checklists-create",
            component: () => import("../pages/HseTransitMixersChecklistsCreate.vue"),
          },
          {
            path: "hse-concrete-pump",
            name: "hse-concrete-pump",
            component: () => import("../pages/HseConcretePump.vue"),
          },
          {
            path: "hse-concrete-pump-checklists",
            name: "hse-concrete-pump-checklists",
            component: () => import("../pages/HseConcretePumpChecklists.vue"),
          },
          {
            path: "hse-concrete-pump-checklists-create",
            name: "hse-concrete-pump-checklists-create",
            component: () => import("../pages/HseConcretePumpChecklistsCreate.vue"),
          },
          {
            path: "hse-boom-placer",
            name: "hse-boom-placer",
            component: () => import("../pages/HseBoomPlacer.vue"),
          }, 
          {
            path: "hse-boom-placer-checklists",
            name: "hse-boom-placer-checklists",
            component: () => import("../pages/HseBoomPlacerChecklists.vue"),
          },
          {
            path: "hse-boom-placer-checklists-create",
            name: "hse-boom-placer-checklists-create",
            component: () => import("../pages/HseBoomPlacerChecklistsCreate.vue"),
          },
          {
            path: "hse-electrical-vibrator",
            name: "hse-electrical-vibrator",
            component: () => import("../pages/HseElectricalVibrator.vue"),
          }, 
          {
            path: "hse-electrical-vibrator-checklists",
            name: "hse-electrical-vibrator-checklists",
            component: () => import("../pages/HseEelectricalVibratorChecklists.vue"),
          },
          {
            path: "hse-electrical-vibrator-checklists-create",
            name: "hse-electrical-vibrator-checklists-create",
            component: () => import("../pages/HseEelectricalVibratorChecklistsCreate.vue"),
          },
          {
            path: "hse-bar-cutting-machine",
            name: "hse-bar-cutting-machine",
            component: () => import("../pages/HsebarCuttingMachine.vue"),
          },
          {
            path: "hse-bar-cutting-machine-checklists",
            name: "hse-bar-cutting-machine-checklists",
            component: () => import("../pages/HseBarCuttingMachineChecklists.vue"),
          },
          {
            path: "hse-bar-cutting-machine-checklists-create",
            name: "hse-bar-cutting-machine-checklists-create",
            component: () => import("../pages/HseBarCuttingMachineChecklistsCreate.vue"),
          },
          {
            path: "hse-bar-bending-machine",
            name: "hse-bar-bending-machine",
            component: () => import("../pages/HseBarBendingMachine.vue"),
          },
          {
            path: "hse-bar-bending-machine-checklists",
            name: "hse-bar-bending-machine-checklists",
            component: () => import("../pages/HseBarBendingMachineChecklists.vue"),
          },
          {
            path: "hse-bar-bending-machine-checklists-create",
            name: "hse-bar-bending-machine-checklists-create",
            component: () => import("../pages/HseBarBendingMachineChecklistsCreate.vue"),
          },
          {
            path: "hse-breaker",
            name: "hse-breaker",
            component: () => import("../pages/HseBreaker.vue"),
          },
          {
            path: "hse-breaker-checklists",
            name: "hse-breaker-checklists",
            component: () => import("../pages/HseBreakerChecklists.vue"),
          },
          {
            path: "hse-breaker-checklists-create",
            name: "hse-breaker-checklists-create",
            component: () => import("../pages/HseBreakerChecklistsCreate.vue"),
          },
          {
            path: "hse-drill-machine",
            name: "hse-drill-machine",
            component: () => import("../pages/HseDrillMachine.vue"),
          },
          {
            path: "hse-drill-machine-checklists",
            name: "hse-drill-machine-checklists",
            component: () => import("../pages/HseDrillMachineChecklists.vue"),
          },
          {
            path: "hse-drill-machine-checklists-create",
            name: "hse-drill-machine-checklists-create",
            component: () => import("../pages/HseDrillMachineChecklistsCreate.vue"),
          },
          {
            path: "hse-hydra",
            name: "hse-hydra",
            component: () => import("../pages/HseHydra.vue"),
          },
          {
            path: "hse-hydra-checklists",
            name: "hse-hydra-checklists",
            component: () => import("../pages/HseHydraChecklists.vue"),
          },
          {
            path: "hse-hydra-checklists-create",
            name: "hse-hydra-checklists-create",
            component: () => import("../pages/HseHydraChecklistsCreate.vue"),
          },
          {
            path: "hse-mobile-crane",
            name: "hse-mobile-crane",
            component: () => import("../pages/HseMobileCrane.vue"),
          },
          {
            path: "hse-mobile-crane-checklists",
            name: "hse-mobile-crane-checklists",
            component: () => import("../pages/HseMobileCraneChecklists.vue"),
          },
          {
            path: "hse-mobile-crane-checklists-create",
            name: "hse-mobile-crane-checklists-create",
            component: () => import("../pages/HseMobileCraneChecklistsCreate.vue"),
          },
          {
            path: "hse-tower-crane",
            name: "hse-tower-crane",
            component: () => import("../pages/HseTowerCrane.vue"),
          },
          {
            path: "hse-tower-crane-checklists",
            name: "hse-tower-crane-checklists",
            component: () => import("../pages/HseTowerCraneChecklists.vue"),
          },
          {
            path: "hse-tower-crane-checklists-create",
            name: "hse-tower-crane-checklists-create",
            component: () => import("../pages/HseTowerCraneChecklistsCreate.vue"),
          },
          {
            path: "hse-diesel-generator",
            name: "hse-diesel-generator",
            component: () => import("../pages/HseDieselGenerator.vue"),
          },
          {
            path: "diesel-generator-checklists",
            name: "diesel-generator-checklists",
            component: () => import("../pages/HseDieselGeneratorChecklists.vue"),
          },
          {
            path: "diesel-generator-checklists-create",
            name: "diesel-generator-checklists-create",
            component: () => import("../pages/HseDieselGeneratorChecklistsCreate.vue"),
          },
          {
            path: "hse-distribution-panel",
            name: "hse-distribution-panel",
            component: () => import("../pages/HseDistributionPanel.vue"),
          },
          {
            path: "power-distribution-panel-checklists",
            name: "power-distribution-panel-checklists",
            component: () => import("../pages/HsePowerDistributionChecklists.vue"),
          },
          {
            path: "power-distribution-panel-checklists-create",
            name: "power-distribution-panel-checklists-create",
            component: () => import("../pages/HsePowerDistributionChecklistsCreate.vue"),
          },
          {
            path: "hse-gas-cutting-set",
            name: "hse-gas-cutting-set",
            component: () => import("../pages/HseGasCuttingSet.vue"),
          },
          {
            path: "gas-cutting-set-checklists",
            name: "gas-cutting-set-checklists",
            component: () => import("../pages/HseGasCuttingSetChecklists.vue"),
          },
          {
            path: "gas-cutting-set-checklists-create",
            name: "gas-cutting-set-checklists-create",
            component: () => import("../pages/HseGasCuttingSetChecklistsCreate.vue"),
          },
          {
            path: "hse-portable-grinder",
            name: "hse-portable-grinder",
            component: () => import("../pages/HsePortableGrinder.vue"),
          },
          {
            path: "portable-grinder-checklists",
            name: "portable-grinder-checklists",
            component: () => import("../pages/HsePortableGrinderChecklists.vue"),
          },
          {
            path: "portable-grinder-checklists-create",
            name: "portable-grinder-checklists-create",
            component: () => import("../pages/HsePortableGrinderChecklistsCreate.vue"),
          },
          {
            path: "hse-welding-machine",
            name: "hse-welding-machine",
            component: () => import("../pages/HseWeldingMachine.vue"),
          },
          {
            path: "welding-machine-checklists",
            name: "welding-machine-checklists",
            component: () => import("../pages/HseWeldingMachineChecklists.vue"),
          },
          {
            path: "welding-machine-checklists-create",
            name: "welding-machine-checklists-create",
            component: () => import("../pages/HseWeldingMachineChecklistsCreate.vue"),
          },
          {
            path: "hse-electrical-pump",
            name: "hse-electrical-pump",
            component: () => import("../pages/HseElectricalPump.vue"),
          },
          {
            path: "electrical-pump-checklists",
            name: "electrical-pump-checklists",
            component: () => import("../pages/HseelEctricalPumpChecklists.vue"),
          },
          {
            path: "electrical-pump-checklists-create",
            name: "electrical-pump-checklists-create",
            component: () => import("../pages/HseelEctricalPumpChecklistsCreate.vue"),
          },
          {
            path: "hse-winch-machine",
            name: "hse-winch-machine",
            component: () => import("../pages/HseWinchMachine.vue"),
          },
          {
            path: "winch-machine-checklists",
            name: "winch-machine-checklists",
            component: () => import("../pages/HseelWinchMachineChecklists.vue"),
          },
          {
            path: "winch-machine-checklists-create",
            name: "winch-machine-checklists-create",
            component: () => import("../pages/HseelWinchMachineChecklistsCreate.vue"),
          },
          {
            path: "hse-chain-pulley-block",
            name: "hse-chain-pulley-block",
            component: () => import("../pages/HseChainPulleyBlock.vue"),
          },
          {
            path: "chain-pulley-block-checklists",
            name: "chain-pulley-block-checklists",
            component: () => import("../pages/HseChainPulleyBlockChecklists.vue"),
          },
          {
            path: "chain-pulley-block-checklists-create",
            name: "chain-pulley-block-checklists-create",
            component: () => import("../pages/HseChainPulleyBlockChecklistsCreate.vue"),
          },
          {
            path: "hse-lifting-tools-tackles",
            name: "hse-lifting-tools-tackles",
            component: () => import("../pages/HseliftingToolsTackles.vue"),
          },
          {
            path: "lifting-tools-tackles-checklists",
            name: "lifting-tools-tackles-checklists",
            component: () => import("../pages/HseLiftingToolsTacklesChecklists.vue"),
          },
          {
            path: "lifting-tools-tackles-checklists-create",
            name: "lifting-tools-tackles-checklists-create",
            component: () => import("../pages/HseLiftingToolsTacklesChecklistsCreate.vue"),
          },
          {
            path: "hse-air-compressor",
            name: "hse-air-compressor",
            component: () => import("../pages/HseAirCompressor.vue"),
          },
          {
            path: "air-compressor-checklists",
            name: "air-compressor-checklists",
            component: () => import("../pages/HseAirCompressorChecklists.vue"),
          },
          {
            path: "air-compressor-checklists-create",
            name: "air-compressor-checklists-create",
            component: () => import("../pages/HseAirCompressorChecklistsCreate.vue"),
          },
          {
            path: "hse-sand-blasting-set",
            name: "hse-sand-blasting-set",
            component: () => import("../pages/HseSandBlastingSet.vue"),
          },
          {
            path: "sand-blasting-set-checklists",
            name: "sand-blasting-set-checklists",
            component: () => import("../pages/HseSandBlastingSetChecklists.vue"),
          },
          {
            path: "sand-blasting-set-checklists-create",
            name: "sand-blasting-set-checklists-create",
            component: () => import("../pages/HseSandBlastingSetChecklistsCreate.vue"),
          },
          {
            path: "hse-fire-extinguisher",
            name: "hse-fire-extinguisher",
            component: () => import("../pages/HseFireExtinguisher.vue"),
          },
          {
            path: "fire-extinguisher-checklists",
            name: "fire-extinguisher-checklists",
            component: () => import("../pages/HseFireExtinguisherChecklists.vue"),
          },
          {
            path: "fire-extinguisher-checklists-create",
            name: "fire-extinguisher-checklists-create",
            component: () => import("../pages/HseFireExtinguisherChecklistsCreate.vue"),
          },
          {
            path: "hse-bench-cutting-machine",
            name: "hse-bench-cutting-machine",
            component: () => import("../pages/HseBenchCuttingMachine.vue"),
          },
          {
            path: "bench-cutting-machine-checklists",
            name: "bench-cutting-machine-checklists",
            component: () => import("../pages/HseBenchCuttingMachineChecklists.vue"),
          },
          {
            path: "bench-cutting-machine-checklists-create",
            name: "bench-cutting-machine-checklists-create",
            component: () => import("../pages/HseBenchCuttingMachineChecklistsCreate.vue"),
          },
          {
            path: "hse-pedestal-grinder",
            name: "hse-pedestal-grinder",
            component: () => import("../pages/HsePedestalGrinder.vue"),
          },
          {
            path: "pedestal-grinder-checklists",
            name: "pedestal-grinder-checklists",
            component: () => import("../pages/HsePedestalGrinderChecklists.vue"),
          },
          {
            path: "pedestal-grinder-checklists-create",
            name: "pedestal-grinder-checklists-create",
            component: () => import("../pages/HsePedestalGrinderChecklistsCreate.vue"),
          },
          {
            path: "hse-circular-saw",
            name: "hse-circular-saw",
            component: () => import("../pages/HseCircularSaw.vue"),
          },
          {
            path: "circular-saw-checklists",
            name: "circular-saw-checklists",
            component: () => import("../pages/HseCircularSawChecklists.vue"),
          },
          {
            path: "circular-saw-checklists-create",
            name: "circular-saw-checklists-create",
            component: () => import("../pages/HseCircularSawChecklistsCreate.vue"),
          },
          {
            path: "hse-batching-plant",
            name: "hse-batching-plant",
            component: () => import("../pages/HseBatchingPlant.vue"),
          },
          {
            path: "batching-plant-checklists",
            name: "batching-plant-checklists",
            component: () => import("../pages/HseBatchingPlantChecklists.vue"),
          },
          {
            path: "batching-plant-checklists-create",
            name: "batching-plant-checklists-create",
            component: () => import("../pages/HseBatchingPlantChecklistsCreate.vue"),
          },
          {
            path: "hse-ambulance",
            name: "hse-ambulance",
            component: () => import("../pages/HseAmbulance.vue"),
          },
          {
            path: "ambulance-checklists",
            name: "ambulance-checklists",
            component: () => import("../pages/HseAmbulanceChecklists.vue"),
          },
          {
            path: "ambulance-checklists-create",
            name: "ambulance-checklists-create",
            component: () => import("../pages/HseAmbulanceChecklistsCreate.vue"),
          },
          {
            path: "hse-skidSteer-loader",
            name: "hse-skidSteer-loader",
            component: () => import("../pages/HseSkidSteerLoader.vue"),
          },
          {
            path: "skidSteer-loader-checklists",
            name: "skidSteer-loader-checklists",
            component: () => import("../pages/HseSkidSteerLoaderChecklists.vue"),
          },
          {
            path: "skidSteer-loader-checklists-create",
            name: "skidSteer-loader-checklists-create",
            component: () => import("../pages/HseSkidSteerLoaderChecklistsCreate.vue"),
          },
          {
            path: "hse-grader",
            name: "hse-grader",
            component: () => import("../pages/HseGrader.vue"),
          },
          {
            path: "grader-checklists",
            name: "grader-checklists",
            component: () => import("../pages/HseGraderChecklists.vue"),
          },
          {
            path: "grader-checklists-create",
            name: "grader-checklists-create",
            component: () => import("../pages/HseGraderChecklistsCreate.vue"),
          },
          {
            path: "hse-gantry-crane",
            name: "hse-gantry-crane",
            component: () => import("../pages/HseGantryCrane.vue"),
          },
          {
            path: "gantry-crane-checklists",
            name: "gantry-crane-checklists",
            component: () => import("../pages/HseGantryCraneChecklists.vue"),
          },
          {
            path: "gantry-crane-checklists-create",
            name: "gantry-crane-checklists-create",
            component: () => import("../pages/HseGantryCraneChecklistsCreate.vue"),
          },
          {
            path: "hse-eot-crane",
            name: "hse-eot-crane",
            component: () => import("../pages/HseEotCrane.vue"),
          },
          {
            path: "eot-crane-checklists",
            name: "eot-crane-checklists",
            component: () => import("../pages/HseEotCraneChecklists.vue"),
          },
          {
            path: "eot-crane-checklists-create",
            name: "eot-crane-checklists-create",
            component: () => import("../pages/HseEotCraneChecklistsCreate.vue"),
          },
          {
            path: "hse-trailer",
            name: "hse-trailer",
            component: () => import("../pages/HseTrailer.vue"),
          },
          {
            path: "trailer-checklists",
            name: "trailer-checklists",
            component: () => import("../pages/HseTrailerChecklists.vue"),
          },
          {
            path: "trailer-checklists-create",
            name: "trailer-checklists-create",
            component: () => import("../pages/HseTrailerChecklistsCreate.vue"),
          },
          {
            path: "hse-four-wheeler",
            name: "hse-four-wheeler",
            component: () => import("../pages/HseFourWheeler.vue"),
          },
          {
            path: "four-wheeler-checklists",
            name: "four-wheeler-checklists",
            component: () => import("../pages/HseFourWheelerChecklists.vue"),
          },
          {
            path: "four-wheeler-checklists-create",
            name: "four-wheeler-checklists-create",
            component: () => import("../pages/HseFourWheelerChecklistsCreate.vue"),
          },
          {
            path: "hse-bus",
            name: "hse-bus",
            component: () => import("../pages/HseBus.vue"),
          },
          {
            path: "bus-checklists",
            name: "bus-checklists",
            component: () => import("../pages/HseBusChecklists.vue"),
          },
          {
            path: "bus-checklists-create",
            name: "bus-checklists-create",
            component: () => import("../pages/HseBusChecklistsCreate.vue"),
          },
          {
            path: "hse-diesel-tanker",
            name: "hse-diesel-tanker",
            component: () => import("../pages/HseDieselTanker.vue"),
          },
          {
            path: "diesel-tanker-checklists",
            name: "diesel-tanker-checklists",
            component: () => import("../pages/HseDieselTankerChecklists.vue"),
          },
          {
            path: "diesel-tanker-checklists-create",
            name: "diesel-tanker-checklists-create",
            component: () => import("../pages/HseDieselTankerChecklistsCreate.vue"),
          },
          {
            path: "hse-water-tanker",
            name: "hse-water-tanker",
            component: () => import("../pages/HseWaterTanker.vue"),
          },
          {
            path: "water-tanker-checklists",
            name: "water-tanker-checklists",
            component: () => import("../pages/HseWaterTankerChecklists.vue"),
          },
          {
            path: "water-tanker-checklists-create",
            name: "water-tanker-checklists-create",
            component: () => import("../pages/HseWaterTankerChecklistsCreate.vue"),
          },
          {
            path: "hse-bike",
            name: "hse-bike",
            component: () => import("../pages/HseBike.vue"),
          },
          {
            path: "bike-checklists",
            name: "bike-checklists",
            component: () => import("../pages/HseBikeChecklists.vue"),
          },
          {
            path: "bike-checklists-create",
            name: "bike-checklists-create",
            component: () => import("../pages/HseBikeChecklistsCreate.vue"),
          },
          {
            path: "hse-power-vehicle-registration",
            name: "hse-power-vehicle-registration",
            component: () => import("../pages/HsePowerVehicleRegistration.vue"),
          },
          {
            path: "hse-power-vehicle-registration-create",
            name: "hse-power-vehicle-registration-create",
            component: () => import("../pages/HsePowerVehicleRegistrationCreate.vue"),
          },
          {
            path: "hse-power-vehicle-registration-edit/:id",
            name: "hse-power-vehicle-registration-edit",
            component: () => import("../pages/HsePowerVehicleRegistrationCreate.vue"),
          },
          {
            path: "hse-power-vehicle-registration-list",
            name: "hse-power-vehicle-registration-list",
            component: () => import("../pages/HsePowerVehicleRegistrationList.vue"),
          },
          {
            path: "hse-visitors-entry-create",
            name: "hse-visitors-entry-create",
            component: () => import("../pages/HseVisitorsEntryCreate.vue"),
          },
          {
            path: "hse-visitors-entry-edit/:id",
            name: "hse-visitors-entry-edit",
            component: () => import("../pages/HseVisitorsEntryCreate.vue"),
          },
          {
            path: "hse-visitors-entry-list",
            name: "hse-visitors-entry-list",
            component: () => import("../pages/HseVisitorsEntryList.vue"),
          },


        // Isgec 
        {
          path: "isgec",
          name: "isgec-data-list",
          component: () => import("../pages/IsgecDataList.vue"),
        },
        {
          path: "isgec-backhoe-loader",
          name: "isgec-backhoe-loader",
          component: () => import("../pages/IsgecBackhoeLoaderList.vue"),
        },
        {
          path: "users-layout-1",
          name: "users-layout-1",
          component: () => import("../pages/UsersLayout1.vue"),
        },

        {
          path: "users-layout-2",
          name: "users-layout-2",
          component: () => import("../pages/UsersLayout2.vue"),
        },
        {
          path: "users-layout-3",
          name: "users-layout-3",
          component: () => import("../pages/UsersLayout3.vue"),
        },
        {
          path: "profile-overview-1",
          name: "profile-overview-1",
          component: () => import("../pages/ProfileOverview1.vue"),
        },
        {
          path: "profile-overview-2",
          name: "profile-overview-2",
          component: () => import("../pages/ProfileOverview2.vue"),
        },
        {
          path: "profile-overview-3",
          name: "profile-overview-3",
          component: () => import("../pages/ProfileOverview3.vue"),
        },
        {
          path: "wizard-layout-1",
          name: "wizard-layout-1",
          component: () => import("../pages/WizardLayout1.vue"),
        },
        {
          path: "wizard-layout-2",
          name: "wizard-layout-2",
          component: () => import("../pages/WizardLayout2.vue"),
        },
        {
          path: "wizard-layout-3",
          name: "wizard-layout-3",
          component: () => import("../pages/WizardLayout3.vue"),
        },
        {
          path: "blog-layout-1",
          name: "blog-layout-1",
          component: () => import("../pages/BlogLayout1.vue"),
        },
        {
          path: "blog-layout-2",
          name: "blog-layout-2",
          component: () => import("../pages/BlogLayout2.vue"),
        },
        {
          path: "blog-layout-3",
          name: "blog-layout-3",
          component: () => import("../pages/BlogLayout3.vue"),
        },
        {
          path: "pricing-layout-1",
          name: "pricing-layout-1",
          component: () => import("../pages/PricingLayout1.vue"),
        },
        {
          path: "pricing-layout-2",
          name: "pricing-layout-2",
          component: () => import("../pages/PricingLayout2.vue"),
        },
        {
          path: "invoice-layout-1",
          name: "invoice-layout-1",
          component: () => import("../pages/InvoiceLayout1.vue"),
        },
        {
          path: "invoice-layout-2",
          name: "invoice-layout-2",
          component: () => import("../pages/InvoiceLayout2.vue"),
        },
        {
          path: "faq-layout-1",
          name: "faq-layout-1",
          component: () => import("../pages/FaqLayout1.vue"),
        },
        {
          path: "faq-layout-2",
          name: "faq-layout-2",
          component: () => import("../pages/FaqLayout2.vue"),
        },
        {
          path: "faq-layout-3",
          name: "faq-layout-3",
          component: () => import("../pages/FaqLayout3.vue"),
        },
        {
          path: "update-profile",
          name: "update-profile",
          component: () => import("../pages/UpdateProfile.vue"),
        },
        {
          path: "change-password",
          name: "change-password",
          component: () => import("../pages/ChangePassword.vue"),
        },
        {
          path: "regular-table",
          name: "regular-table",
          component: () => import("../pages/RegularTable.vue"),
        },
        {
          path: "tabulator",
          name: "tabulator",
          component: () => import("../pages/Tabulator.vue"),
        },
        {
          path: "modal",
          name: "modal",
          component: () => import("../pages/Modal.vue"),
        },
        {
          path: "slide-over",
          name: "slide-over",
          component: () => import("../pages/Slideover.vue"),
        },
        {
          path: "notification",
          name: "notification",
          component: () => import("../pages/Notification.vue"),
        },
        {
          path: "tab",
          name: "tab",
          component: () => import("../pages/Tab.vue"),
        },
        {
          path: "accordion",
          name: "accordion",
          component: () => import("../pages/Accordion.vue"),
        },
        {
          path: "button",
          name: "button",
          component: () => import("../pages/Button.vue"),
        },
        {
          path: "alert",
          name: "alert",
          component: () => import("../pages/Alert.vue"),
        },
        {
          path: "progress-bar",
          name: "progress-bar",
          component: () => import("../pages/ProgressBar.vue"),
        },
        {
          path: "tooltip",
          name: "tooltip",
          component: () => import("../pages/Tooltip.vue"),
        },
        {
          path: "dropdown",
          name: "dropdown",
          component: () => import("../pages/Dropdown.vue"),
        },
        {
          path: "typography",
          name: "typography",
          component: () => import("../pages/Typography.vue"),
        },
        {
          path: "icon",
          name: "icon",
          component: () => import("../pages/Icon.vue"),
        },
        {
          path: "loading-icon",
          name: "loading-icon",
          component: () => import("../pages/LoadingIcon.vue"),
        },
        {
          path: "regular-form",
          name: "regular-form",
          component: () => import("../pages/RegularForm.vue"),
        },
        {
          path: "datepicker",
          name: "datepicker",
          component: () => import("../pages/Datepicker.vue"),
        },
        {
          path: "tom-select",
          name: "tom-select",
          component: () => import("../pages/TomSelect.vue"),
        },
        {
          path: "file-upload",
          name: "file-upload",
          component: () => import("../pages/FileUpload.vue"),
        },
        {
          path: "wysiwyg-editor",
          name: "wysiwyg-editor",
          component: () => import("../pages/WysiwgEditor.vue"),
        },
        {
          path: "validation",
          name: "validation",
          component: () => import("../pages/Validation.vue"),
        },
        {
          path: "chart",
          name: "chart",
          component: () => import("../pages/Chart.vue"),
        },
        {
          path: "slider",
          name: "slider",
          component: () => import("../pages/Slider.vue"),
        },
        {
          path: "image-zoom",
          name: "image-zoom",
          component: () => import("../pages/ImageZoom.vue"),
        },
        {
          path: "calculators",
          name: "calculators-list",
          component: () => import("../pages/CalculatorsList.vue"),
        },
        {
          path: "calculator-on-indian-standards",
          name: "calculator-on-indian-standards",
          component: () => import("../pages/CalculatorsBasedOnIndianStandards.vue"),
        },
        {
          path: "fire-extinguisher-placement-calculator",
          name: "fire-extinguisher-placement-calculator",
          component: () => import("../pages/CalculatorFireExtinguisherPlacement.vue"),
        },
        {
          path: "swl_of_wire_rope_calculator",
          name: "swl_of_wire_rope_calculator",
          component: () => import("../pages/CalculatorSWLOfWireRope.vue"),
        },
        {
          path: "stack_height_calculator",
          name: "stack_height_calculator",
          component: () => import("../pages/CalculatorStackHeight.vue"),
        },
        {
          path: "ip-ratings-checker-calculator",
          name: "ip-ratings-checker-calculator",
          component: () => import("../pages/CalculatorIPRatingChecker.vue"),
        },
        {
          path: "excavation-slope-calculator",
          name: "excavation-slope-calculator",
          component: () => import("../pages/CalculatorExcavationSlope.vue"),
        },
        {
          path: "fall-clearance-calculator",
          name: "fall-clearance-calculator",
          component: () => import("../pages/CalculatorFallClearance.vue"),
        },
        {
          path: "ladder-length-calculator",
          name: "ladder-length-calculator",
          component: () => import("../pages/CalculatorLadderLength.vue"),
        },
        {
          path: "fire-load-calculator",
          name: "fire-load-calculator",
          component: () => import("../pages/CalculatorFireLoad.vue"),
        },
        {
          path: "bulldog-grips-calculator",
          name: "bulldog-grips-calculator",
          component: () => import("../pages/CalculatorBulldogGrips.vue"),
        },
        {
          path: "lost-time-injury-frequency-rate",
          name: "lost-time-injury-frequency-rate",
          component: () => import("../pages/CalculatorLTIFrequencyRate.vue"),
        },
        {
          path: "severity-rate-calculator",
          name: "severity-rate-calculator",
          component: () => import("../pages/CalculatorSeverityRate.vue"),
        },
        {
          path: "incidence-rate-calculator",
          name: "incidence-rate-calculator",
          component: () => import("../pages/CalculatorIncidenceRate.vue"),
        },
        {
          path: "ambient-noise-level-calculator",
          name: "ambient-noise-level-calculator",
          component: () => import("../pages/CalculatorAmbientNoiseLevel.vue"),
        },
        {
          path: "generalized-anxiety-disorder-assessment",
          name: "generalized-anxiety-disorder-assessment",
          component: () => import("../pages/CalculatorAnxietyDisorderAssessment.vue"),
        },
        {
          path: "daily-drinking-water-intake-calculator",
          name: "daily-drinking-water-intake-calculator",
          component: () => import("../pages/CalculatorDailyDrinkingWaterIntake.vue"),
        },
        {
          path: "calculator-on-osha-standards",
          name: "calculator-on-osha-standards",
          component: () => import("../pages/CalculatorsBasedOnOSHA.vue"),
        },
        {
          path: "osha-total-recordable-incident-rate-trir-calculator",
          name: "osha-total-recordable-incident-rate-trir-calculator",
          component: () => import("../pages/CalculatorOSHATotalRecordableIncidentRate.vue"),
        },
        {
          path: "osha-dart-rate-calculator",
          name: "osha-dart-rate-calculator",
          component: () => import("../pages/CalculatorOSHADartRate.vue"),
        },
        {
          path: "nema-ratings-and-ip-equivalency-calculator",
          name: "nema-ratings-and-ip-equivalency-calculator",
          component: () => import("../pages/CalculatorNEMARatingsAndIPRatings.vue"),
        },

        // Higg FEM
        {
          path: "site-info-permit",
          name: "site-info-permit",
          component: () => import("../pages/HiggFEMSiteInfoPermit.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../pages/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../pages/Register.vue"),
    },
    {
      path: "/reset-password-email",
      name: "reset-password-email",
      component: () => import("../pages/ResetPasswordEmail.vue"),
    },
    {
      path: "/email-notifications",
      name: "email-notifications",
      component: () => import("../pages/EmailNotification.vue"),
    },
    {
      path: "/error-page",
      name: "error-page",
      component: () => import("../pages/ErrorPage.vue"),
    },
  ],
});
// route auth 
router.beforeEach((to, from, next) => {
  const token = getToken(); 
  if (
    to.path !== "/" &&
    to.path !== "/login" &&
    to.path !== "/register" &&
    to.path !== "/reset-password-email" &&
    to.path !== "/error-page"
  ) {
    if (!token) {
      return next({ name: "login" });
    }
  }
  next();
});
export default router;
