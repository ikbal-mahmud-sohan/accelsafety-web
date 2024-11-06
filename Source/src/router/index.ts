import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/themes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "/",
          name: "dashboard-overview-1",
          component: () => import("../pages/DashboardOverview1.vue"),
        },
        {
          path: "dashboard-overview-2",
          name: "dashboard-overview-2",
          component: () => import("../pages/DashboardOverview2.vue"),
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
          path: "accident-investigation",
          name: "accident-investigation-form",
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
          path: "training-attendences/:id/update",
          name: "training-attendences-update-form",
          component: () => import("../pages/TrainingAttendencesUpdateForm.vue"),
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
          //Standard Operating Procedure
          // {
          //   path: "hse-standard-operating-procedure",
          //   name: "hse-standard-operating-procedure",
          //   component: () => import("../pages/HseStandardOperatingProcedure.vue"),
          // },
          // {
          //   path: "hse-standard-operating-procedure-doc",
          //   name: "hse-standard-operating-procedure-doc",
          //   component: () => import("../pages/HseStandardOperatingProcedureDoc.vue"),
          // },
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
      path: "/error-page",
      name: "error-page",
      component: () => import("../pages/ErrorPage.vue"),
    },
  ],
});

export default router;
