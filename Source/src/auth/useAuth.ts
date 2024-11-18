import axios from 'axios';
import config from "@/config";
import { ref, reactive, toRefs } from 'vue';

const state = reactive({
    authenticateed: false
})


export default function useAuth(){
    
    const csrftoken = async()=> {
        await axios.get(config.baseURL+'/sanctum/csrf-cookie')
        
    }
    return {csrftoken}

}
