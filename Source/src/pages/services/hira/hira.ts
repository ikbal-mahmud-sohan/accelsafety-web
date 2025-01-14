import Toastify from 'toastify-js';

export default class HiraService {
     FailedPopUp(){
        const failedEl = document
            .querySelectorAll("#failed-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            failedEl.classList.remove("hidden");
            Toastify({
            node: failedEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     SuccessPopUp(){
 
        const successEl = document
            .querySelectorAll("#success-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            successEl.classList.remove("hidden");
            Toastify({
            node: successEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     FailedTypePopUp(){
        const failedEl = document
            .querySelectorAll("#failed-type-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            failedEl.classList.remove("hidden");
            Toastify({
            node: failedEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     SuccessTypePopUp(){
     
        const successEl = document
            .querySelectorAll("#success-type-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            successEl.classList.remove("hidden");
            Toastify({
            node: successEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     FailedInjuryTypePopUp(){
        const failedEl = document
            .querySelectorAll("#failed-injury-type-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            failedEl.classList.remove("hidden");
            Toastify({
            node: failedEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     SuccessInjuryTypePopUp(){
     
        const successEl = document
            .querySelectorAll("#success-injury-type-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            successEl.classList.remove("hidden");
            Toastify({
            node: successEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     FailedOccupationsPopUp(){
        const failedEl = document
            .querySelectorAll("#failed-occupations-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            failedEl.classList.remove("hidden");
            Toastify({
            node: failedEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     SuccessTypeOfActivityePopUp(){
     
        const successEl = document
            .querySelectorAll("#success-type-of-activity-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            successEl.classList.remove("hidden");
            Toastify({
            node: successEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     FailedTypeOfActivityPopUp(){
        const failedEl = document
            .querySelectorAll("#failed-type-of-activity-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            failedEl.classList.remove("hidden");
            Toastify({
            node: failedEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     SuccessOccupationsPopUp(){
     
        const successEl = document
            .querySelectorAll("#success-occupations-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            successEl.classList.remove("hidden");
            Toastify({
            node: successEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     FailedEventPopUp(){
        const failedEl = document
            .querySelectorAll("#failed-event-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            failedEl.classList.remove("hidden");
            Toastify({
            node: failedEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     SuccessEventPopUp(){
     
        const successEl = document
            .querySelectorAll("#success-event-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            successEl.classList.remove("hidden");
            Toastify({
            node: successEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     FailedCausePopUp(){
        const failedEl = document
            .querySelectorAll("#failed-cause-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            failedEl.classList.remove("hidden");
            Toastify({
            node: failedEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     SuccessCausePopUp(){
     
        const successEl = document
            .querySelectorAll("#success-cause-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            successEl.classList.remove("hidden");
            Toastify({
            node: successEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     FailedImpactPopUp(){
        const failedEl = document
            .querySelectorAll("#failed-impact-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            failedEl.classList.remove("hidden");
            Toastify({
            node: failedEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     SuccessImpactPopUp(){
     
        const successEl = document
            .querySelectorAll("#success-impact-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            successEl.classList.remove("hidden");
            Toastify({
            node: successEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     FailedEngineeringPopUp(){
        const failedEl = document
            .querySelectorAll("#failed-engineering-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            failedEl.classList.remove("hidden");
            Toastify({
            node: failedEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     SuccessEngineeringPopUp(){
     
        const successEl = document
            .querySelectorAll("#success-engineering-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            successEl.classList.remove("hidden");
            Toastify({
            node: successEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     FailedAdministrativePopUp(){
        const failedEl = document
            .querySelectorAll("#failed-administrative-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            failedEl.classList.remove("hidden");
            Toastify({
            node: failedEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     SuccessAdministrativePopUp(){
     
        const successEl = document
            .querySelectorAll("#success-administrative-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            successEl.classList.remove("hidden");
            Toastify({
            node: successEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     FailedPPEPopUp(){
        const failedEl = document
            .querySelectorAll("#failed-PPE-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            failedEl.classList.remove("hidden");
            Toastify({
            node: failedEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
     SuccessPPEPopUp(){
     
        const successEl = document
            .querySelectorAll("#success-PPE-notification-content")[0]
            .cloneNode(true) as HTMLElement;
            successEl.classList.remove("hidden");
            Toastify({
            node: successEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            }).showToast();
    }
    

}