import { reactive, watch } from 'vue';
function getInitialState() {
    const savedState = localStorage.getItem('isAdminLoggedIn');
    return savedState !== null ? JSON.parse(savedState) : false;
}

export const store = reactive({
    isAdminLoggedIn: getInitialState()
});
watch(() => store.isAdminLoggedIn, (newValue) => {
    localStorage.setItem('isAdminLoggedIn', JSON.stringify(newValue));
});
